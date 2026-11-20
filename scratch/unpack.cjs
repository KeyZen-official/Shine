const fs = require('fs');
const readline = require('readline');

async function extractStep(stepIndex, outFile) {
  const fileStream = fs.createReadStream('C:/Users/RENTKAR/.gemini/antigravity/brain/7c42734f-5b35-4c44-9091-ffa5361a5a52/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let currentIndex = 0;
  for await (const line of rl) {
    if (currentIndex === stepIndex) {
      const obj = JSON.parse(line);
      let content = obj.tool_calls[0].args.Content;
      if (content.startsWith('"') && content.endsWith('"')) {
        content = JSON.parse(content);
      }
      fs.writeFileSync(outFile, content);
      console.log(`Extracted step ${stepIndex} to ${outFile} (${content.length} bytes)`);
      return;
    }
    currentIndex++;
  }
}

async function main() {
  await extractStep(548, 'scratch/student-feedback-full.jsx');
  await extractStep(397, 'scratch/stagger-testimonials-full.jsx');
}

main().catch(console.error);
