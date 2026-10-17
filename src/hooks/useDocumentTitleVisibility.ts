import { useEffect } from 'react';

/**
 * Changes document.title when the browser tab is hidden and restores it when visible.
 */
export function useDocumentTitleVisibility(idleTitle = '⚡ (1) Signal received // Navadeep') {
  useEffect(() => {
    let originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        originalTitle = document.title;
        document.title = idleTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [idleTitle]);
}
