import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const indexPath = path.join(projectRoot, 'index.html');
const outputPath = path.join(projectRoot, 'assets', 'media', 'asset-manifest.json');

const html = fs.readFileSync(indexPath, 'utf8');

const pattern = /https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)\/(?:preview|view\?usp=share_link)|https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)|https:\/\/youtu\.be\/([A-Za-z0-9_-]+)/g;

const assets = new Map();

for (const match of html.matchAll(pattern)) {
  const [url, driveId, ytEmbedId, ytShortId] = match;
  const id = driveId || ytEmbedId || ytShortId;
  const type = driveId ? 'drive' : 'yt';
  const key = `${type}:${id}`;

  if (!assets.has(key)) {
    assets.set(key, {
      key,
      type,
      id,
      sourceUrls: [],
      localPath: '',
      status: 'pending'
    });
  }

  const asset = assets.get(key);
  if (!asset.sourceUrls.includes(url)) {
    asset.sourceUrls.push(url);
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  counts: {
    total: assets.size,
    drive: [...assets.values()].filter((a) => a.type === 'drive').length,
    yt: [...assets.values()].filter((a) => a.type === 'yt').length
  },
  assets: [...assets.values()].sort((a, b) => a.key.localeCompare(b.key))
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`Wrote ${manifest.counts.total} assets to ${path.relative(projectRoot, outputPath)}`);
