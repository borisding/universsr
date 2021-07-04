export default function html({
  helmet,
  styles,
  scripts,
  rendered,
  renderedData
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
      <script>window.__UNIVERSSR_RENDERED_DATA__ = ${renderedData}</script>
      ${scripts}
    </body>
  </html>`;
}
