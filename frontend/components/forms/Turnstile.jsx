'use client';

import { useEffect, useId, useRef } from 'react';
import { siteConfig } from '../../lib/config';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise = null;

function loadScript() {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Loads only on routes that contain a form, and only when a site key is
 * configured. With no key the component renders nothing and the server
 * falls back to the honeypot and dwell-time checks.
 */
export function Turnstile({ onToken }) {
  const id = useId().replace(/:/g, '');
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!siteConfig.turnstileSiteKey || !containerRef.current) return undefined;

    let cancelled = false;

    loadScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetRef.current = turnstile.render(containerRef.current, {
          sitekey: siteConfig.turnstileSiteKey,
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
          theme: 'light',
          appearance: 'interaction-only',
        });
      })
      .catch(() => {
        // A challenge that cannot load must not block a legitimate
        // submission; the server still applies its other two checks.
        onToken('');
      });

    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
      }
    };
  }, [onToken]);

  if (!siteConfig.turnstileSiteKey) return null;

  return <div ref={containerRef} id={`turnstile-${id}`} className="min-h-2" />;
}
