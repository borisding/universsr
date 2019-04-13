export default ({
  styles,
  js,
  renderedAppString,
  preloadedState,
  helmet
} = {}) => `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
        ${helmet.link.toString()}
        ${styles}
      </head>
      <body>
        <div id="root">${renderedAppString}</div>
        <script>window.__UNIVERSSR_PRELOADED_STATE__ = ${preloadedState}</script>
        ${js}
      </body>
    </html>`;
