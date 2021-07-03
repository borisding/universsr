export default function html({
  helmet,
  styles,
  scripts,
  rendered,
  serverRenderedData
} = {}) {
  return `<!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      ${helmet.meta.toString()}
      ${helmet.title.toString()}
      ${helmet.link.toString()}
      ${styles}
    </head>
    <body>
      <div id="root">${rendered}</div>
      <script>window.__UNIVERSSR_PRELOADED_DATA__ = ${serverRenderedData}</script>
      ${scripts}
    </body>
  </html>`;
}
