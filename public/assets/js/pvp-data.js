(function () {
  const endpoint = '/api/proxy/albion-pvp';
  let activeKillboardMode = 'world';
  let feedController = null;
  let battleOffset = 0;
  let battleRequestInProgress = false;
  const expandedEventIds = new Set();
  let playerProfileOpen = false;
  const playerHistoryCache = new Map();

  function refreshIsPaused() {
    return playerProfileOpen;
  }

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

  // ═════════════════════════════════════════════════════════════════
  //  ITEM / EQUIPMENT HELPERS (live kill-event build panels)
  // ═════════════════════════════════════════════════════════════════

  function itemDisplayName(type) {
    const known = {
      'T5_2H_CLAYMORE': 'Claymore', 'T5_2H_BOW': 'Warbow', 'T5_2H_NATURESTAFF': 'Great Nature Staff',
      'T5_2H_DUALSWORD': 'Dual Swords', 'T5_2H_COMBATSTAFF_MORGANA': 'Black Monk Stave', 'T5_MAIN_FIRESTAFF': 'Fire Staff',
      'T5_2H_FIRESTAFF': 'Great Fire Staff', 'T5_MAIN_CROSSBOW': 'Crossbow', 'T5_2H_HALBERD': 'Halberd',
      'T5_MAIN_DAGGER': 'Daggers', 'T5_MAIN_MACE': 'Mace', 'T5_MAIN_SWORD': 'Sword & Shield',
      'T5_ARMOR_LEATHER_SET1': 'Mercenary Jacket', 'T5_ARMOR_CLOTH_SET2': 'Cleric Robe', 'T5_ARMOR_PLATE_SET2': 'Knight Armor',
      'T5_ARMOR_LEATHER_SET3': 'Stalker Jacket', 'T5_ARMOR_CLOTH_SET3': 'Mage Robe', 'T5_ARMOR_LEATHER_UNDEAD': 'Graveguard Armor',
      'T5_ARMOR_PLATE_SET1': 'Soldier Armor', 'T5_ARMOR_LEATHER_HELL': 'Hellion Jacket',
      'T5_SHOES_PLATE_SET1': 'Soldier Boots', 'T5_SHOES_PLATE_SET3': 'Guardian Boots', 'T5_SHOES_LEATHER_SET3': 'Stalker Shoes',
      'T5_HEAD_PLATE_SET3': 'Guardian Helmet', 'T5_HEAD_CLOTH_SET1': 'Scholar Cowl', 'T5_HEAD_LEATHER_SET2': 'Hunter Hood',
      'T5_HEAD_LEATHER_SET1': 'Mercenary Hood', 'T5_HEAD_LEATHER_SET3': 'Stalker Cap'
    };
    if (known[type]) return known[type];
    return String(type)
      .replace(/^T\d+_/i, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const EQUIP_SLOTS = ['MainHand', 'OffHand', 'Head', 'Chest', 'Feet', 'Cape', 'Bag', 'Mount'];

  function getEquipSlot(player, slot) {
    if (!player || typeof player !== 'object') return null;
    const equip = player.Equipment || player.equipment || {};
    return equip[slot] || equip[slot.toLowerCase()] || null;
  }

  function qualityLabel(quality) {
    const q = Number(quality);
    if (!Number.isFinite(q) || q < 1) return '';
    const labels = { 1: 'Normal', 2: 'Good', 3: 'Outstanding', 4: 'Excellent', 5: 'Masterpiece' };
    return labels[q] || `Quality ${q}`;
  }

  function qualityColorClass(quality) {
    const q = Number(quality);
    const map = { 1: 'mist', 2: 'success', 3: 'teal', 4: 'purple', 5: 'ember' };
    return map[q] || 'silver';
  }

  function itemImage(item, size) {
    const type = item && (item.Type || item.type || item.ItemType || item.itemType);
    if (!type) return '';
    const q = item.Quality != null ? item.Quality : (item.QualityLevel != null ? item.QualityLevel : '');
    const url = `https://render.albiononline.com/v1/item/${encodeURIComponent(String(type))}.png?size=${size}${q ? `&q=${q}` : ''}`;
    const alt = escapeHtml(itemDisplayName(type));
    return `<img src="${url}" alt="${alt} icon" title="${alt}" width="${size}" height="${size}" loading="lazy" onerror="this.remove()" class="ev-item-icon" />`;
  }

  function renderItemLine(item, size, showCount) {
    if (!item || !(item.Type || item.type || item.ItemType || item.itemType)) return '';
    const type = item.Type || item.type || item.ItemType || item.itemType;
    const name = escapeHtml(item.DisplayName || item.displayName || itemDisplayName(type));
    const count = showCount && item.Count ? ` ×${escapeHtml(item.Count)}` : '';
    const q = item.Quality != null ? item.Quality : (item.QualityLevel != null ? item.QualityLevel : '');
    const qLabel = qualityLabel(q);
    const badge = qLabel ? `<span class="ev-quality ev-quality-${qualityColorClass(q)}">${escapeHtml(qLabel)}</span>` : '';
    return `<div class="ev-item">${itemImage(item, size)}<span class="ev-item-name">${name}${count}</span>${badge}</div>`;
  }

  function renderEquipment(player, label) {
    if (!player || typeof player !== 'object') return '';
    const slots = EQUIP_SLOTS.map((slot) => {
      const item = getEquipSlot(player, slot);
      if (!item || !(item.Type || item.type || item.ItemType || item.itemType)) return '';
      const slotName = escapeHtml(slot.replace(/([A-Z])/g, ' $1').trim());
      return `<div class="ev-slot"><span class="ev-slot-label">${slotName}</span>${renderItemLine(item, 48, false)}</div>`;
    }).filter(Boolean).join('');
    if (!slots) return '';
    return `<div class="ev-section"><h3 class="ev-section-title">${escapeHtml(label)}</h3><div class="ev-slots">${slots}</div></div>`;
  }

  function renderInventory(player, label) {
    if (!player || typeof player !== 'object') return '';
    const inventory = player.Inventory || player.inventory || [];
    if (!Array.isArray(inventory) || !inventory.length) return '';
    const items = inventory.map((item) => renderItemLine(item, 40, true)).filter(Boolean).join('');
    if (!items) return '';
    return `<div class="ev-section"><h3 class="ev-section-title">${escapeHtml(label)}</h3><div class="ev-items">${items}</div></div>`;
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

  function getPlayerGuild(player) {
    if (!player || typeof player !== 'object') return '';
    return player.GuildName || player.guild || player.Guild || '';
  }
  function getPlayerAlliance(player) {
    if (!player || typeof player !== 'object') return '';
    return player.AllianceName || player.alliance || player.Alliance || '';
  }
  function getPlayerKillFame(player) {
    if (!player || typeof player !== 'object') return 0;
    return Number(player.KillFame ?? player.killFame ?? player.totalKillFame ?? 0) || 0;
  }
  function getPlayerDeathFame(player) {
    if (!player || typeof player !== 'object') return 0;
    return Number(player.DeathFame ?? player.deathFame ?? player.totalDeathFame ?? 0) || 0;
  }
  function getPlayerAverageIP(player) {
    if (!player || typeof player !== 'object') return 0;
    return Number(player.AverageItemPower ?? player.averageItemPower ?? player.AvgIP ?? player.avgIp ?? 0) || 0;
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

  function renderWorldEvent(event, index) {
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
    const uid = eventId || index;
    const killUrl = /^\d+$/.test(String(eventId)) ? `https://albiononline.com/killboard/kill/${encodeURIComponent(eventId)}` : '';
    const guildLine = [killer.guild, killer.alliance].filter(Boolean).join(' · ') || 'Guild unavailable';
    const victimGuild = [victim.guild, victim.alliance].filter(Boolean).join(' · ');
    const eventKey = String(uid);
    const expandId = `ev-expand-${escapeHtml(eventKey)}`;
    const isExpanded = expandedEventIds.has(eventKey);

    const killerRaw = event.Killer || event.killer || {};
    const victimRaw = event.Victim || event.victim || {};
    const killerId = getPlayerId(killerRaw) || '';
    const victimId = getPlayerId(victimRaw) || '';
    const killerDataAttrs = `data-player-id="${escapeHtml(killerId)}" data-player-name="${escapeHtml(killer.name)}" data-player-guild="${escapeHtml(getPlayerGuild(killerRaw))}" data-player-alliance="${escapeHtml(getPlayerAlliance(killerRaw))}" data-player-killfame="${getPlayerKillFame(killerRaw)}" data-player-deathfame="${getPlayerDeathFame(killerRaw)}" data-player-ip="${getPlayerAverageIP(killerRaw)}"`;
    const victimDataAttrs = `data-player-id="${escapeHtml(victimId)}" data-player-name="${escapeHtml(victim.name)}" data-player-guild="${escapeHtml(getPlayerGuild(victimRaw))}" data-player-alliance="${escapeHtml(getPlayerAlliance(victimRaw))}" data-player-killfame="${getPlayerKillFame(victimRaw)}" data-player-deathfame="${getPlayerDeathFame(victimRaw)}" data-player-ip="${getPlayerAverageIP(victimRaw)}"`;
    const expanded = `${renderEquipment(killerRaw, 'Killer Build')}${renderEquipment(victimRaw, 'Victim Build')}${renderInventory(victimRaw, 'Victim Inventory / Dropped Items')}` || '<p class="ev-empty">No build or inventory data was provided for this event.</p>';

    return `<article class="world-kill-card">
      <div class="world-kill-time">${escapeHtml(time)}${eventId ? ` <span>· #${escapeHtml(eventId)}</span>` : ''}</div>
      <div class="world-kill-match">
        <div class="world-kill-side">
          <span class="world-kill-label">Killer</span>
          <div class="world-kill-player">
            <button type="button" class="ev-player-link" ${killerDataAttrs} aria-label="Open profile for ${escapeHtml(killer.name)}"><strong>${escapeHtml(killer.name)}</strong></button>${renderWeaponBadge(killerWeapon)}
          </div>
          <small>${escapeHtml(guildLine)}</small>
        </div>
        <span class="world-kill-versus">⚔</span>
        <div class="world-kill-side world-kill-victim">
          <span class="world-kill-label">Victim</span>
          <div class="world-kill-player world-kill-player-victim">
            ${renderWeaponBadge(victimWeapon)}<button type="button" class="ev-player-link" ${victimDataAttrs} aria-label="Open profile for ${escapeHtml(victim.name)}"><strong>${escapeHtml(victim.name)}</strong></button>
          </div>
          <small>${escapeHtml(victimGuild || 'Guild unavailable')}</small>
        </div>
      </div>
      <div class="world-kill-meta"><span>${escapeHtml(location)}</span><span>${formatFame(fame)} fame</span><span>${participants ? `${escapeHtml(participants)} participants` : 'Participants unavailable'}</span>${killUrl ? `<a href="${killUrl}" target="_blank" rel="noopener noreferrer">View kill</a>` : ''}</div>
      <button type="button" class="ev-expand-btn" data-event-key="${escapeHtml(eventKey)}" aria-expanded="${isExpanded}" aria-controls="${expandId}" aria-label="Show killer and victim equipment and inventory for this event">Show build &amp; inventory</button>
      <div class="ev-expanded" id="${expandId}"${isExpanded ? '' : ' hidden'}>${expanded}</div>
    </article>`;
  }

  function ensureProfileModal() {
    if (document.getElementById('ev-profile-modal')) return;
    const modal = document.createElement('div');
    modal.className = 'ev-profile-modal';
    modal.id = 'ev-profile-modal';
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'true');
    modal.role = 'dialog';
    modal.setAttribute('aria-label', 'Player profile');
    modal.innerHTML = '<div class="ev-profile-backdrop"></div><div class="ev-profile-panel"><button type="button" class="ev-profile-close" aria-label="Close profile">✕</button><div class="ev-profile-header"><div class="ev-profile-avatar">⚔</div><div class="ev-profile-meta"><h2 class="ev-profile-name" id="ev-profile-name">—</h2><div class="ev-profile-guild" id="ev-profile-guild"></div></div></div><div class="ev-profile-stats" id="ev-profile-stats"></div><div class="ev-profile-tabs"><button type="button" class="ev-profile-tab active" data-kind="kills">Kills</button><button type="button" class="ev-profile-tab" data-kind="deaths">Deaths</button></div><div class="ev-profile-loading" id="ev-profile-loading">Loading history…</div><div class="ev-profile-error" id="ev-profile-error" hidden>Could not load history. Use Refresh to try again.</div><div class="ev-profile-empty" id="ev-profile-empty" hidden>No history available.</div><div class="ev-profile-history" id="ev-profile-history"></div></div>';
    document.body.appendChild(modal);
  }

  async function openPlayerProfile(btn) {
    ensureProfileModal();
    const modal = document.getElementById('ev-profile-modal');
    const nameEl = document.getElementById('ev-profile-name');
    const guildEl = document.getElementById('ev-profile-guild');
    const statsEl = document.getElementById('ev-profile-stats');
    const historyEl = document.getElementById('ev-profile-history');
    const loadingEl = document.getElementById('ev-profile-loading');
    const errorEl = document.getElementById('ev-profile-error');
    const emptyEl = document.getElementById('ev-profile-empty');
    const playerId = (btn.dataset.playerId || '').trim();
    const name = escapeHtml(btn.dataset.playerName || 'Unknown player');
    const guild = escapeHtml(btn.dataset.playerGuild || '');
    const alliance = escapeHtml(btn.dataset.playerAlliance || '');
    const killFame = Number(btn.dataset.playerKillfame || 0) || 0;
    const avgIP = Number(btn.dataset.playerIp || 0) || 0;
    nameEl.textContent = name;
    guildEl.textContent = guild ? `${guild}${alliance ? ` · ${alliance}` : ''}` : 'Guild unavailable';
    const avgIPString = String(avgIP).slice(0, 4);
    statsEl.innerHTML = `<div class="ev-stat"><span class="ev-stat-val">${formatFame(killFame)}</span><span class="ev-stat-label">Kill Fame</span></div><div class="ev-stat"><span class="ev-stat-val" style="color:var(--teal)">${avgIPString}</span><span class="ev-stat-label">Avg Item Power</span></div>`;
    historyEl.innerHTML = '';
    loadingEl.hidden = false;
    errorEl.hidden = true;
    emptyEl.hidden = true;
    modal.dataset.playerId = playerId;
    modal.dataset.currentKind = 'kills';
    modal.querySelectorAll('.ev-profile-tab').forEach((t) => {
      t.classList.toggle('active', t.getAttribute('data-kind') === 'kills');
    });
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    playerProfileOpen = true;
    if (playerId) {
      await fetchPlayerHistory(playerId, 'kills', selectedRegion());
    } else {
      loadingEl.hidden = true;
      errorEl.hidden = false;
    }
  }

  function closePlayerProfile() {
    playerProfileOpen = false;
    const modal = document.getElementById('ev-profile-modal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.dataset.playerId = '';
    modal.dataset.currentKind = '';
    document.getElementById('ev-profile-history').innerHTML = '';
  }

  async function fetchPlayerHistory(playerId, kind, region) {
    const cacheKey = `${playerId}:${kind}`;
    if (playerHistoryCache.has(cacheKey)) {
      renderHistoryList(playerHistoryCache.get(cacheKey), kind);
      return;
    }
    const modal = document.getElementById('ev-profile-modal');
    const loadingEl = document.getElementById('ev-profile-loading');
    const errorEl = document.getElementById('ev-profile-error');
    try {
      const response = await fetch(`${endpoint}/players/${encodeURIComponent(playerId)}/${encodeURIComponent(kind)}?region=${encodeURIComponent(region)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not load history');
      const events = Array.isArray(payload) ? payload : (payload.events || []);
      const limited = events.slice(0, 10);
      playerHistoryCache.set(cacheKey, limited);
      if (modal.dataset.currentKind !== kind) return;
      renderHistoryList(limited, kind);
    } catch (error) {
      if (modal.dataset.currentKind !== kind) return;
      loadingEl.hidden = true;
      errorEl.hidden = false;
    } finally {
      if (modal.dataset.currentKind === kind) loadingEl.hidden = true;
    }
  }

  function renderHistoryList(events, kind) {
    const list = document.getElementById('ev-profile-history');
    const emptyEl = document.getElementById('ev-profile-empty');
    const errorEl = document.getElementById('ev-profile-error');
    errorEl.hidden = true;
    if (!events || !events.length) {
      list.innerHTML = '';
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    list.innerHTML = events.map((event, index) => renderHistoryItem(event, index, kind)).join('');
  }

  function renderHistoryItem(event, index, kind) {
    const killerName = escapeHtml(getEventPlayer(event, 'Killer'));
    const victimName = escapeHtml(getEventPlayer(event, 'Victim'));
    const weaponType = event.Weapon || event.weapon || '';
    const weaponName = escapeHtml(weaponType ? itemDisplayName(weaponType) : '—');
    const fame = formatFame(event.KillFame || event.TotalVictimKillFame || event.fame || 0);
    const isKill = kind === 'kills';
    const other = isKill ? victimName : killerName;
    const action = isKill ? 'Killed' : 'Killed by';
    const icon = weaponType ? itemImage({ Type: weaponType }, 24) : '';
    return `<div class="ev-history-item" style="animation-delay:${index * 0.03}s"><div class="ev-history-action">${escapeHtml(action)} <strong>${other}</strong></div><div class="ev-history-weapon">${icon}${weaponName}</div><div class="ev-history-fame">${fame} fame</div></div>`;
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
      const currentEventIds = new Set(events.map((event, index) => String(event.EventId || event.eventId || index)));
      for (const eventId of expandedEventIds) {
        if (!currentEventIds.has(eventId)) expandedEventIds.delete(eventId);
      }
      feed.innerHTML = events.length ? events.map((event, i) => renderWorldEvent(event, i)).join('') : '<div class="live-empty">No recent kill events were returned for this server.</div>';
      feed.dataset.hasEvents = events.length ? 'true' : '';
      if (status) status.textContent = `Updated ${new Date().toLocaleTimeString()} · ${regionLabel(region)} · refreshes every 3 minutes`;
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

  function formatBattleDuration(start, end) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime < startTime) return '';
    const seconds = Math.round((endTime - startTime) / 1000);
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  }

  function renderBattle(battle, index) {
    const start = battle.startTime ? new Date(battle.startTime) : null;
    const time = start && !Number.isNaN(start.getTime()) ? start.toLocaleString() : 'Time unavailable';
    const duration = formatBattleDuration(battle.startTime, battle.endTime);
    const players = battle.players && typeof battle.players === 'object' ? Object.values(battle.players) : [];
    const guilds = battle.guilds && typeof battle.guilds === 'object'
      ? Object.values(battle.guilds).sort((a, b) => Number(b.kills || 0) - Number(a.kills || 0))
      : [];
    const guildSummary = guilds.slice(0, 6).map((guild) => `
      <div class="battle-guild">
        <span>${escapeHtml(guild.name || 'Unknown guild')}${guild.alliance ? ` <small>· ${escapeHtml(guild.alliance)}</small>` : ''}</span>
        <span><strong>${Number(guild.kills || 0)}</strong> K / <strong>${Number(guild.deaths || 0)}</strong> D</span>
      </div>`).join('');
    const moreGuilds = guilds.length > 6 ? `<div class="battle-more-guilds">+${guilds.length - 6} more guilds</div>` : '';
    const battleId = escapeHtml(battle.id ?? battle.Id ?? '—');
    const fame = Number(battle.totalFame || 0);
    return `<article class="battle-card" style="animation-delay:${index * 0.03}s">
      <div class="battle-header">
        <div class="battle-icon">⚔</div>
        <div>
          <div class="battle-title">Battle #${battleId}</div>
          <div class="battle-meta">${escapeHtml(time)}${duration ? ` · ${escapeHtml(duration)}` : ''}${battle.clusterName ? ` · ${escapeHtml(battle.clusterName)}` : ''}</div>
        </div>
        <a class="battle-detail-link" href="https://albiononline.com/killboard/battles/${encodeURIComponent(String(battle.id ?? battle.Id ?? ''))}" target="_blank" rel="noopener noreferrer">View</a>
      </div>
      <div class="battle-stats">
        <div class="bstat"><span class="bstat-val green">${Number(battle.totalKills || 0).toLocaleString()}</span><span class="bstat-label">Kills</span></div>
        <div class="bstat"><span class="bstat-val">${Number(fame).toLocaleString()}</span><span class="bstat-label">Fame</span></div>
        <div class="bstat"><span class="bstat-val">${players.length.toLocaleString()}</span><span class="bstat-label">Players</span></div>
        <div class="bstat"><span class="bstat-val">${guilds.length.toLocaleString()}</span><span class="bstat-label">Guilds</span></div>
      </div>
      ${guildSummary ? `<div class="battle-guilds"><div class="battle-guilds-title">Guild performance</div>${guildSummary}${moreGuilds}</div>` : ''}
    </article>`;
  }

  async function loadBattlesFeed({ append = false, silent = false } = {}) {
    const feed = document.getElementById('battles-feed');
    const status = document.getElementById('battles-feed-status');
    const refresh = document.getElementById('battles-feed-refresh');
    const more = document.getElementById('battles-feed-more');
    const region = document.getElementById('battles-feed-region')?.value || selectedRegion();
    if (!feed || battleRequestInProgress) return;

    if (!append) battleOffset = 0;
    const offset = append ? battleOffset : 0;
    battleRequestInProgress = true;
    if (refresh) refresh.disabled = true;
    if (more) more.disabled = true;
    if (!append && !silent) feed.innerHTML = '<div class="live-empty">Loading recent battles…</div>';
    if (status && !silent) status.textContent = `Loading recent battles · ${regionLabel(region)}…`;

    try {
      const response = await fetch(`${endpoint}/battles?region=${encodeURIComponent(region)}&limit=20&offset=${offset}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not load battles');
      const battles = Array.isArray(payload) ? payload : (payload.battles || []);
      const markup = battles.map((battle, index) => renderBattle(battle, index)).join('');
      if (append) feed.insertAdjacentHTML('beforeend', markup);
      else feed.innerHTML = markup || '<div class="live-empty">No recent battles were returned for this server.</div>';
      battleOffset = offset + battles.length;
      if (more) more.hidden = battles.length < 20;
      if (status) status.textContent = `Updated ${new Date().toLocaleTimeString()} · ${regionLabel(region)} · all fight sizes`;
    } catch (error) {
      if (!append) feed.innerHTML = `<div class="live-empty live-error">${escapeHtml(error.message)}. Use Refresh to try again.</div>`;
      else if (status) status.textContent = `${escapeHtml(error.message)}. Try loading more again.`;
      if (!append && status) status.textContent = `Could not load ${regionLabel(region)} battles`;
    } finally {
      battleRequestInProgress = false;
      if (refresh) refresh.disabled = false;
      if (more) more.disabled = false;
    }
  }

  window.loadBattlesFeed = loadBattlesFeed;

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
      const ids = ['world', 'depths', 'battles', 'hellgate', 'corrupted', 'crystal'];
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

    const feed = document.getElementById('world-kill-feed');
    if (feed) {
      feed.addEventListener('click', async (event) => {
        const expandButton = event.target.closest('.ev-expand-btn');
        if (expandButton) {
          const panel = expandButton.getAttribute('aria-controls') ? document.getElementById(expandButton.getAttribute('aria-controls')) : null;
          if (panel) {
            const isExpanded = expandButton.getAttribute('aria-expanded') === 'true';
            const shouldExpand = !isExpanded;
            expandButton.setAttribute('aria-expanded', String(shouldExpand));
            panel.hidden = !shouldExpand;
            const eventKey = expandButton.dataset.eventKey;
            if (eventKey) {
              if (shouldExpand) expandedEventIds.add(eventKey);
              else expandedEventIds.delete(eventKey);
            }
          }
          return;
        }
        const playerButton = event.target.closest('.ev-player-link');
        if (playerButton) {
          await openPlayerProfile(playerButton);
        }
      });
    }

    ensureProfileModal();
    const modal = document.getElementById('ev-profile-modal');
    if (modal) {
      const closeBtn = modal.querySelector('.ev-profile-close');
      const backdrop = modal.querySelector('.ev-profile-backdrop');
      const closeProfile = () => { closePlayerProfile(); };
      if (closeBtn) closeBtn.onclick = closeProfile;
      if (backdrop) backdrop.onclick = closeProfile;
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeProfile();
      });
      modal.addEventListener('click', (event) => {
        const tab = event.target.closest('.ev-profile-tab[data-kind]');
        if (!tab) return;
        if (tab.getAttribute('data-kind') === (modal.dataset.currentKind || '')) return;
        modal.querySelectorAll('.ev-profile-tab').forEach((t) => {
          t.classList.toggle('active', t === tab);
        });
        modal.dataset.currentKind = tab.getAttribute('data-kind');
        const historyEl = document.getElementById('ev-profile-history');
        const loadingEl = document.getElementById('ev-profile-loading');
        const errorEl = document.getElementById('ev-profile-error');
        const emptyEl = document.getElementById('ev-profile-empty');
        historyEl.innerHTML = '';
        loadingEl.hidden = false;
        errorEl.hidden = true;
        emptyEl.hidden = true;
        const playerId = (modal.dataset.playerId || '').trim();
        const region = selectedRegion();
        if (playerId) fetchPlayerHistory(playerId, modal.dataset.currentKind, region);
        else { loadingEl.hidden = true; errorEl.hidden = false; }
      });
    }
  }

  window.doSearch = doLiveSearch;
  bindPageInteractions();
  loadWorldFeed();
  window.setInterval(() => {
    const killboardsOpen = document.getElementById('tab-killboards')?.classList.contains('active');
    if (document.visibilityState === 'visible' && killboardsOpen && activeKillboardMode === 'world' && !refreshIsPaused()) loadWorldFeed();
  }, 180000);
})();
