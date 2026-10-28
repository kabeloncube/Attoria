(function () {
  const endpoint = '/api/proxy/albion-pvp';
  let activeKillboardMode = 'world';
  let feedController = null;

  function selectedRegion() {
    return document.getElementById('world-feed-region')?.value || 'europe';
  }

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
    const response = await fetch(`${endpoint}/players/${encodeURIComponent(playerId)}/${kind}?region=${encodeURIComponent(selectedRegion())}`);
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
      const searchResponse = await fetch(`${endpoint}/search?q=${encodeURIComponent(query)}&region=${encodeURIComponent(selectedRegion())}`);
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


  function eventPlayer(event, key) {
    const player = event[key] || event[key.toLowerCase()] || {};
    if (typeof player === 'string') return { name: player, guild: '', alliance: '' };
    return {
      name: player.Name || player.name || 'Unknown player',
      guild: player.GuildName || player.guildName || '',
      alliance: player.AllianceName || player.allianceName || ''
    };
  }

  function getWeaponType(player) {
    const equipment = player?.Equipment || player?.equipment || {};
    const mainHand = equipment.MainHand || equipment.mainHand || equipment.Mainhand || equipment.mainhand || {};
    return mainHand.Type || mainHand.type || '';
  }

  function renderWeaponBadge(itemType) {
    if (!itemType) return '';
    const cleanType = escapeHtml(itemType);
    const url = `https://render.albiononline.com/v1/item/${encodeURIComponent(itemType)}.png?size=32`;
    return `<img class="world-kill-weapon-icon" src="${url}" alt="${cleanType}" title="${cleanType}" loading="lazy" />`;
  }

  function renderWorldEvent(event) {
    const killer = eventPlayer(event, 'Killer');
    const victim = eventPlayer(event, 'Victim');
    const killerWeapon = getWeaponType(event.Killer || event.killer);
    const victimWeapon = getWeaponType(event.Victim || event.victim);
    const fame = event.TotalVictimKillFame || event.totalVictimKillFame || event.KillFame || event.killFame || 0;
    const location = event.Location || event.location || event.KillArea || event.killArea || 'Location unavailable';
    const participants = event.NumberOfParticipants || event.numberOfParticipants;
    const rawTime = event.TimeStamp || event.EventTime || event.timestamp;
    const date = rawTime ? new Date(rawTime) : null;
    const time = date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Time unavailable';
    const eventId = event.EventId || event.eventId || '';
    const killUrl = /^\d+$/.test(String(eventId)) ? `https://albiononline.com/killboard/kill/${encodeURIComponent(eventId)}` : '';
    const guildLine = [killer.guild, killer.alliance].filter(Boolean).join(' · ') || 'Guild unavailable';
    const victimGuild = [victim.guild, victim.alliance].filter(Boolean).join(' · ');

    return `<article class="world-kill-card">
      <div class="world-kill-time">${escapeHtml(time)}${eventId ? ` <span>· #${escapeHtml(eventId)}</span>` : ''}</div>
      <div class="world-kill-match">
        <div class="world-kill-side">
          <span class="world-kill-label">Killer</span>
          <div class="world-kill-player">
            <strong>${escapeHtml(killer.name)}</strong>${renderWeaponBadge(killerWeapon)}
          </div>
          <small>${escapeHtml(guildLine)}</small>
        </div>
        <span class="world-kill-versus">⚔</span>
        <div class="world-kill-side world-kill-victim">
          <span class="world-kill-label">Victim</span>
          <div class="world-kill-player world-kill-player-victim">
            ${renderWeaponBadge(victimWeapon)}<strong>${escapeHtml(victim.name)}</strong>
          </div>
          <small>${escapeHtml(victimGuild || 'Guild unavailable')}</small>
        </div>
      </div>
      <div class="world-kill-meta"><span>${escapeHtml(location)}</span><span>${formatFame(fame)} fame</span><span>${participants ? `${escapeHtml(participants)} participants` : 'Participants unavailable'}</span>${killUrl ? `<a href="${killUrl}" target="_blank" rel="noopener noreferrer">View kill</a>` : ''}</div>
    </article>`;
  }

  async function loadWorldFeed() {
    const feed = document.getElementById('world-kill-feed');
    const status = document.getElementById('world-feed-status');
    const refresh = document.getElementById('world-feed-refresh');
    if (!feed || activeKillboardMode !== 'world') return;

    if (feedController) feedController.abort();
    feedController = new AbortController();
    const controller = feedController;
    const region = selectedRegion();
    if (status) status.textContent = `Loading recent events · ${regionLabel(region)}…`;
    if (refresh) refresh.disabled = true;
    if (!feed.dataset.hasEvents) feed.innerHTML = '<div class="live-empty">Loading recent Albion kill events…</div>';

    try {
      const response = await fetch(`${endpoint}/events?region=${encodeURIComponent(region)}&limit=20&offset=0`, { signal: controller.signal });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not load kill events');
      if (controller.signal.aborted) return;
      const events = Array.isArray(payload) ? payload : (payload.events || []);
      feed.innerHTML = events.length ? events.map(renderWorldEvent).join('') : '<div class="live-empty">No recent kill events were returned for this server.</div>';
      feed.dataset.hasEvents = events.length ? 'true' : '';
      if (status) status.textContent = `Updated ${new Date().toLocaleTimeString()} · ${regionLabel(region)} · refreshes every minute`;
    } catch (error) {
      if (error.name === 'AbortError') return;
      if (status) status.textContent = `Could not reach the ${regionLabel(region)} kill feed`;
      feed.innerHTML = `<div class="live-empty live-error">${escapeHtml(error.message)}. Use Refresh to try again.</div>`;
      feed.dataset.hasEvents = '';
    } finally {
      if (controller === feedController && refresh) refresh.disabled = false;
    }
  }

  function regionLabel(region) {
    return ({ americas: 'Americas', europe: 'Europe', asia: 'Asia' })[region] || region;
  }

  window.loadWorldFeed = loadWorldFeed;
  window.setKillboardMode = function (mode) {
    activeKillboardMode = mode;
    const feed = document.getElementById('world-kill-feed');
    const status = document.getElementById('world-feed-status');
    if (mode === 'world') {
      loadWorldFeed();
    } else {
      if (feed) feed.innerHTML = '<div class="live-empty">The live feed is currently connected for World events. This selected mode is not connected yet.</div>';
      if (status) status.textContent = 'World feed only';
    }
  };

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

    const searchButton = document.querySelector('#tab-search .search-btn');
    if (searchButton) searchButton.onclick = doLiveSearch;

    const refreshButton = document.getElementById('world-feed-refresh');
    if (refreshButton) refreshButton.onclick = loadWorldFeed;
    const regionSelect = document.getElementById('world-feed-region');
    if (regionSelect) {
      try {
        const savedRegion = localStorage.getItem('attoria-albion-region');
        if (['americas', 'europe', 'asia'].includes(savedRegion)) regionSelect.value = savedRegion;
      } catch (_) {}
      regionSelect.onchange = function () {
        try { localStorage.setItem('attoria-albion-region', regionSelect.value); } catch (_) {}
        loadWorldFeed();
      };
    }
  }

  window.doSearch = doLiveSearch;
  bindPageInteractions();
  loadWorldFeed();
  window.setInterval(() => {
    const killboardsOpen = document.getElementById('tab-killboards')?.classList.contains('active');
    if (document.visibilityState === 'visible' && killboardsOpen && activeKillboardMode === 'world') loadWorldFeed();
  }, 60000);
})();
