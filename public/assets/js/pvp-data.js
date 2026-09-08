(function () {
  const endpoint = '/api/proxy/albion-pvp';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatFame(value) {
    const fame = Number(value || 0);
    if (fame >= 1e9) return `${(fame / 1e9).toFixed(1)}B`;
    if (fame >= 1e6) return `${(fame / 1e6).toFixed(1)}M`;
    if (fame >= 1e3) return `${(fame / 1e3).toFixed(1)}K`;
    return fame.toLocaleString();
  }

  function formatEventTime(event) {
    const rawTime = event.EventTime || event.eventTime || event.timestamp;
    if (!rawTime) return 'Time unavailable';
    const date = new Date(rawTime);
    return Number.isNaN(date.getTime()) ? String(rawTime) : date.toLocaleString();
  }

  function getEvents(payload, key) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.[key])) return payload[key];
    if (Array.isArray(payload?.events)) return payload.events;
    return [];
  }

  function getPlayerResults(payload) {
    if (Array.isArray(payload)) return payload;
    return payload?.players || [];
  }

  function getPlayerId(player) {
    return player.Id || player.id || player.PlayerId || player.playerId;
  }

  function getPlayerName(player) {
    return player.Name || player.name || 'Unknown player';
  }

  function getEventPlayer(event, role) {
    const value = event[role] || event[role.toLowerCase()];
    if (typeof value === 'string') return value;
    return value?.Name || value?.name || 'Unknown player';
  }

  function renderHistory(events, historyType, playerName) {
    const historyList = document.getElementById('search-history-list');
    if (!historyList) return;
    if (!events.length) {
      historyList.innerHTML = `<div class="live-empty">No ${historyType} found for ${escapeHtml(playerName)}.</div>`;
      return;
    }

    historyList.innerHTML = events.map((event) => {
      const killer = getEventPlayer(event, 'Killer');
      const victim = getEventPlayer(event, 'Victim');
      const fame = event.TotalVictimKillFame || event.totalVictimKillFame || event.KillFame || event.killFame || 0;
      const location = event.Location || event.location || event.KillArea || event.killArea || 'Unknown location';
      const isKill = event.historyType ? event.historyType === 'kills' : historyType === 'kills';
      return `<div class="live-history-entry ${isKill ? 'live-kill' : 'live-death'}">
        <div class="live-history-result">${isKill ? 'KILL' : 'DEATH'}</div>
        <div class="live-history-main">
          <strong>${escapeHtml(isKill ? victim : killer)}</strong>
          <span>${escapeHtml(location)}</span>
        </div>
        <div class="live-history-fame">${formatFame(fame)} fame</div>
        <time>${escapeHtml(formatEventTime(event))}</time>
      </div>`;
    }).join('');
  }

  function updateProfile(player, kills, deaths) {
    const profileCard = document.getElementById('profile-card');
    if (!profileCard) return;
    profileCard.querySelector('.profile-name').textContent = getPlayerName(player);
    profileCard.querySelector('.profile-guild').textContent = player.GuildName || player.guildName || 'Guild unavailable';
    const statValues = profileCard.querySelectorAll('.ps-val');
    const killFame = player.KillFame || player.killFame || 0;
    const deathFame = player.DeathFame || player.deathFame || 0;
    const values = [kills.length, deaths.length, deaths.length ? (kills.length / deaths.length).toFixed(2) : '∞', '—', formatFame(killFame), formatFame(deathFame), '—'];
    values.forEach((value, index) => {
      if (statValues[index]) statValues[index].textContent = value;
    });
  }

  async function fetchHistory(playerId, kind) {
    const response = await fetch(`${endpoint}/players/${encodeURIComponent(playerId)}/${kind}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Could not load ${kind}`);
    return getEvents(payload, kind);
  }

  async function doLiveSearch() {
    const input = document.getElementById('search-input');
    const historyList = document.getElementById('search-history-list');
    const query = input?.value.trim();
    if (!query) return;

    if (historyList) historyList.innerHTML = '<div class="live-empty">Searching official Albion data...</div>';

    try {
      const searchResponse = await fetch(`${endpoint}/search?q=${encodeURIComponent(query)}`);
      const searchPayload = await searchResponse.json();
      if (!searchResponse.ok) throw new Error(searchPayload.error || 'Player search failed');

      const players = getPlayerResults(searchPayload);
      const player = players[0];
      const playerId = player && getPlayerId(player);
      if (!player || !playerId) throw new Error('No matching player was found');

      const [kills, deaths] = await Promise.all([
        fetchHistory(playerId, 'kills'),
        fetchHistory(playerId, 'deaths')
      ]);
      updateProfile(player, kills, deaths);
      renderHistory([...kills.map((event) => ({ ...event, historyType: 'kills' })), ...deaths.map((event) => ({ ...event, historyType: 'deaths' }))], 'history', getPlayerName(player));
    } catch (error) {
      if (historyList) historyList.innerHTML = `<div class="live-empty live-error">${escapeHtml(error.message)}</div>`;
    }
  }

  function bindPageInteractions() {
    const tabIds = ['killboards', 'search', 'guild', 'battles', 'meta', 'stats'];
    document.querySelectorAll('.mtab').forEach((button, index) => {
      button.onclick = () => window.switchTab(tabIds[index], button);
    });

    document.querySelectorAll('#kb-subtabs .stab').forEach((button, index) => {
      const ids = ['world', 'depths', 'mists', 'hellgate', 'corrupted', 'crystal'];
      button.onclick = () => window.switchKB(ids[index], button);
    });

    document.querySelectorAll('#tab-search .sub-tabs .stab').forEach((button, index) => {
      const ids = ['kills', 'deaths', 'history'];
      button.onclick = () => window.switchSearchView(ids[index], button);
    });

    document.querySelectorAll('#tab-guild .sub-tabs .stab').forEach((button, index) => {
      const ids = ['kills', 'deaths'];
      button.onclick = () => window.switchGuildView(ids[index], button);
    });

    document.querySelectorAll('#tab-meta .sub-tabs .stab').forEach((button, index) => {
      const ids = ['kills', 'usage'];
      button.onclick = () => window.switchMeta(ids[index], button);
    });

    const searchButton = document.querySelector('.search-btn');
    if (searchButton) searchButton.onclick = doLiveSearch;
  }

  window.doSearch = doLiveSearch;
  bindPageInteractions();
})();
