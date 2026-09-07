(function(){
  if(typeof window==='undefined') return;

  const defaultBase = window.location && window.location.origin ? window.location.origin : '';
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
