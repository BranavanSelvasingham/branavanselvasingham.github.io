/*
  Local asset mapping for incremental migration off Google Drive / YouTube embeds.

  Key format:
  - drive:<FILE_ID>  (from https://drive.google.com/file/d/<FILE_ID>/...)
  - yt:<VIDEO_ID>    (from https://www.youtube.com/embed/<VIDEO_ID> or https://youtu.be/<VIDEO_ID>)

  Value format:
  - Relative local path from site root, e.g. "assets/media/archive/so101-loop.mp4"
  - Or any URL you want to override to.

  Example:
  window.__LOCAL_ASSET_MAP__ = {
    "drive:113MgYt6fiGd2oN8vY0KuPUVoG6AxuL3a": "assets/media/active/shape-of-mu.mp4",
    "yt:jtcGHd4MaBc": "assets/media/zafin/microsoft-banking-podcast.mp4"
  };
*/

window.__LOCAL_ASSET_MAP__ = {
};
