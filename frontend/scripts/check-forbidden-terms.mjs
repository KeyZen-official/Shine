#!/usr/bin/env node
/**
 * Repository scan that fails the build on content the brief forbids.
 *
 * Prose alone does not enforce a prohibition — somebody adds a "student
 * loan" section six months later and nobody notices. This runs in CI and
 * turns each rule into a build failure.
 *
 * Four rules:
 *   1. No lending vocabulary outside the single allow-listed disclaimer.
 *   2. No placeholder vocabulary (lorem ipsum, coming soon, sample names).
 *   3. No reference to the site this project took its brief from.
 *   4. The brand is two words. The closed-up "ShineConsultant" is wrong.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

const SCAN_DIRS = [
  'frontend/app',
  'frontend/components',
  'frontend/lib',
  'frontend/shared',
  'backend/src',
];

const EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.css', '.json', '.md']);

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'uploads', 'coverage']);

/**
 * Files outside SCAN_DIRS that still carry customer-visible text: package
 * metadata and the env templates a deployer copies from.
 */
const EXTRA_FILES = [
  'backend/package.json',
  'backend/.env.example',
  'frontend/package.json',
  'frontend/.env.example',
  'README.md',
];

/**
 * The one permitted sentence about lending, and it exists to deny it.
 * A line is exempt only if it contains this exact text.
 */
const ALLOWED_DISCLAIMER =
  'We do not provide, arrange or broker financial lending services of any kind.';

/** Lines that deny lending rather than offer it are also permitted. */
const DENIAL_MARKERS = [
  'do not provide',
  'does not provide',
  'do not collect',
  'do not ask for',
  'do not sell financial products',
  'no lending',
  'not a lender',
  'no loan',
  'no financial',
  'receive no commission from any lender',
  // Source comments that describe this very rule.
  'permitted to mention',
  'forbidden',
  'prohibited',
  'must never',
  'never used',
];

const RULES = [
  {
    name: 'lending vocabulary',
    // \b around each term so "download" does not match "loan" and
    // "collateral damage" is still caught deliberately.
    pattern: /\b(loans?|loaning|EMI|collateral|lender|lending)\b/gi,
    allow: (line) => {
      const lower = line.toLowerCase();
      if (line.includes(ALLOWED_DISCLAIMER)) return true;
      return DENIAL_MARKERS.some((marker) => lower.includes(marker));
    },
  },
  {
    name: 'placeholder vocabulary',
    pattern: /\b(lorem ipsum|dolor sit amet|coming soon|acme corp|example university name|your company here|TBD)\b/gi,
  },
  {
    name: 'reference-site mention',
    pattern: /studybridge4u|studybridge/gi,
  },
  {
    /**
     * The company writes its name as two words. An earlier pass renamed
     * the display form across the source but missed package.json and the
     * env templates, because the rename globbed source extensions only —
     * hence this rule, and hence EXTRA_FILES below.
     *
     * Deliberately case-sensitive: the lowercase `shineconsultant` is a
     * legitimate identifier (npm package name, database name, JWT issuer,
     * domain) and must keep working.
     */
    name: 'brand written as one word',
    pattern: /ShineConsultant/g,
  },
];

async function* walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.env.example') continue;
    const full = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
      continue;
    }

    if (EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

/** Every file to scan, as absolute paths, deduplicated. */
async function collectFiles() {
  const files = new Set();

  for (const relative of SCAN_DIRS) {
    const absolute = path.join(ROOT, relative);
    try {
      await stat(absolute);
    } catch {
      continue;
    }
    for await (const file of walk(absolute)) files.add(file);
  }

  for (const relative of EXTRA_FILES) {
    const absolute = path.join(ROOT, relative);
    try {
      await stat(absolute);
      files.add(absolute);
    } catch {
      // Not every checkout has every file; a missing one is not a failure.
    }
  }

  // This file necessarily contains the terms it searches for.
  files.delete(path.resolve(import.meta.filename));
  return [...files];
}

async function main() {
  const violations = [];
  const files = await collectFiles();
  const scanned = files.length;

  for (const file of files) {
    const contents = await readFile(file, 'utf8');
    const lines = contents.split(/\r?\n/);

    for (const rule of RULES) {
      lines.forEach((line, index) => {
        rule.pattern.lastIndex = 0;
        const matches = line.match(rule.pattern);
        if (!matches) return;
        if (rule.allow?.(line)) return;

        violations.push({
          rule: rule.name,
          file: path.relative(ROOT, file),
          line: index + 1,
          match: [...new Set(matches)].join(', '),
          text: line.trim().slice(0, 140),
        });
      });
    }
  }

  if (violations.length === 0) {
    console.log(`✓ Content scan passed. ${scanned} files checked, no violations.`);
    console.log(
      '  Rules: lending vocabulary, placeholder vocabulary, reference-site mentions, brand spelling.',
    );
    return;
  }

  console.error(`✗ Content scan failed with ${violations.length} violation(s):\n`);
  for (const violation of violations) {
    console.error(`  [${violation.rule}] ${violation.file}:${violation.line}`);
    console.error(`    matched: ${violation.match}`);
    console.error(`    line:    ${violation.text}\n`);
  }
  console.error(
    'Shine Consultant does not offer financial lending services. If a match above is a legitimate\n' +
      'denial of lending, phrase it so it reads as a denial, or extend ALLOWED_DISCLAIMER.',
  );
  process.exit(1);
}

main().catch((error) => {
  console.error('Content scan could not run:', error.message);
  process.exit(1);
});
