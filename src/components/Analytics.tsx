import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Privacy-friendly, cookie-free client analytics dispatcher.
 * Activated strictly when VITE_ANALYTICS_ENABLED === 'true'.
 * Respects Do Not Track (DNT) and collects zero personally identifiable information (PII).
 */
export const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const isEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';
    if (!isEnabled) return;

    // Respect Do Not Track
    if (navigator.doNotTrack === '1' || (window as any).doNotTrack === '1') {
      return;
    }

    try {
      // Dispatch anonymous pageview event
      const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT || '/api/telemetry';
      if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
        const payload = JSON.stringify({
          path: location.pathname + location.hash,
          referrer: document.referrer || null,
          ts: Date.now(),
        });
        navigator.sendBeacon(endpoint, payload);
      }
    } catch {
      // Safe non-blocking telemetry catch
    }
  }, [location]);

  return null;
};
