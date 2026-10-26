(function(){
  if(typeof window==='undefined') return;

  // The static frontend is served by Cloudflare Pages while the API runs on
  // Render. A page may override this before this file loads when needed.
  const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  const defaultBase = window.ATTORIA_API_BASE || (isLocalhost ? window.location.origin : 'https://attoria.onrender.com');
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
