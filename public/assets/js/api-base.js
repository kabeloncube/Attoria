(function(){
  if(typeof window==='undefined') return;

  // The static frontend is served by Cloudflare Pages while the API runs on
  // Render. A page may override this before this file loads when needed.
  const defaultBase = window.ATTORIA_API_BASE || 'https://attoria-1.onrender.com';
  window.API_BASE = window.API_BASE || defaultBase;

  const origFetch = window.fetch.bind(window);
  window.fetch = function(input, init){
    try{
      if (input && typeof input === 'object' && input.url) {
        const req = input;
        if (typeof req.url === 'string' && req.url.startsWith('/')) {
          const newUrl = (window.API_BASE || '').replace(/\/+$/, '') + req.url;
          input = new Request(newUrl, req);
        }
        return origFetch(input, init);
      }
      if (typeof input === 'string' && input.startsWith('/')) {
        input = (window.API_BASE || '').replace(/\/+$/, '') + input;
      }
      return origFetch(input, init);
    } catch (e) {
      return origFetch(input, init);
    }
  };
})();
