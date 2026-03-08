# Asset Migration Plan

This folder is for migrating media off Google Drive / YouTube links into local site assets.

## What is already set up

- `local-asset-map.js`
  - Central map used at runtime to remap external URLs to local files.
  - Edit this file as you migrate each asset.
- `asset-manifest.json`
  - Generated list of unique external media IDs currently referenced in `index.html`.
  - Includes source URLs and migration status fields.

## Key format for `local-asset-map.js`

- `drive:<FILE_ID>` for Google Drive file links.
- `yt:<VIDEO_ID>` for YouTube embeds and short URLs.

## Suggested migration workflow

1. Export or download one asset from Drive/YouTube.
2. Save it in a local path under `assets/media/`.
3. Add a mapping entry in `local-asset-map.js`.
4. Refresh the site and verify the mapped asset loads.
5. Mark that asset as migrated in `asset-manifest.json` if you want to track progress.

## Regenerate manifest

Run:

```bash
node scripts/generate-asset-manifest.mjs
```

This rescans `index.html` and rebuilds `asset-manifest.json`.
