export default ({
  styles,
  js,
  renderedAppString,
  preloadedState,
  helmet
} = {}) => `<!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"><![endif]-->
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
