// Global config for Albion APIs used by the Albion page
// Usage example in client code: window.ALBION_APIS.albion_data_project.base
(function () {
  window.ALBION_APIS = window.ALBION_APIS || {};
  window.ALBION_APIS.official_gameinfo = {
    name: 'Official Albion GameInfo API',
    base: 'https://gameinfo.albiononline.com/api/gameinfo/',
    notes: 'Official game info endpoints (may change or be intermittently unavailable).'
  };

  window.ALBION_APIS.albion_data_project = {
    name: 'Albion Data Project (Market API)',
    base: 'https://www.albion-online-data.com/api/v2/',
    hosts: {
      west: 'https://west.albion-online-data.com',
      east: 'https://east.albion-online-data.com',
      europe: 'https://europe.albion-online-data.com'
    },
    notes: 'Community market data API (prices, history, charts). Rate limits: 180/min, 300/5min'
  };

  window.ALBION_APIS.render_api = {
    name: 'Albion Render API',
    base: 'https://render.albiononline.com/v1/',
    notes: 'Image/rendering endpoints for item/character previews.'
  };

  window.ALBION_APIS.data_dumps = {
    name: 'Albion Data Dumps',
    base: 'https://www.albion-online-data.com/api/',
    notes: 'Database dumps and exports (daily table dumps / formatted bin dumps).'
  };

  window.ALBION_APIS.albiondb = {
    name: 'AlbionDB API',
    base: 'https://albiondb.github.io/api/',
    notes: 'Community site API (item references).'
  };
})();
