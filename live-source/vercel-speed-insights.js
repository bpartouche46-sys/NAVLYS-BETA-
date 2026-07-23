/* NAVLYS — Vercel Speed Insights integration
   v1 · 2026-07-20 · Auto-loads Speed Insights for performance monitoring
   Include on each page: <script src="/vercel-speed-insights.js" defer></script> */

(function() {
  // Load Vercel Speed Insights from CDN
  // This script injects the Speed Insights tracking for vanilla HTML sites
  
  if (typeof window === 'undefined') return;
  
  // Create and inject the Speed Insights script
  var script = document.createElement('script');
  script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
  script.defer = true;
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '1.0.12';
  
  // Inject into document head
  if (document.head) {
    document.head.appendChild(script);
  } else {
    // Fallback: wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        document.head.appendChild(script);
      });
    } else {
      document.head.appendChild(script);
    }
  }
})();
