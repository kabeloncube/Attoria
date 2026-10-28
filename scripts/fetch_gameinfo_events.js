#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REGION = 'europe';
const BASE = {
  americas: 'https://gameinfo.albiononline.com/api/gameinfo',
  europe: 'https://gameinfo-ams.albiononline.com/api/gameinfo',
  asia: 'https://gameinfo-sgp.albiononline.com/api/gameinfo'
}[REGION];

const LIMIT = Number(process.env.LIMIT || 50);
const OFFSET = Number(process.env.OFFSET || 0);
const OUTPUT = path.resolve(process.env.OUTPUT || path.join(__dirname, '..', 'tmp', 'albion-gameinfo-events-europe.json'));

async function main() {
  const url = `${BASE}/events?limit=${LIMIT}&offset=${OFFSET}`;
  const response = await fetch(url, {
    headers: { accept: 'application/json' }
  });

  const rawText = await response.text();

  if (!response.ok) {
    console.error(`HTTP ${response.status} fetching ${url}`);
    console.error(rawText.slice(0, 1000));
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, rawText, 'utf8');

  console.log(`Saved raw JSON to ${OUTPUT}`);
  console.log(`Fetched ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
