## universsr [![Build Status](https://travis-ci.org/borisding/universsr.svg?branch=master)](https://travis-ci.org/borisding/universsr)

* Universal React + Redux, Express application boilerplate.

> WARNING: work still in progress, further changes may be applied

## Feature Highlights

* Universal React 16 + Redux, with Express server
* Sass. React CSS Modules automatic mapping of CSS modules
* React Router 4 + React Router Config
* HMR + Hot Reloading for both client & server
* React Universal Component for SSR, code splitting
* ESLint, Prettier and Stylelint for linting, formatting
* Progressive Web App (PWA), SEO ready
* Security - Express Helmet, HPP middlewares
* Babel 7, Webpack 3, ES6/ES7

## Quick Start

i) Installation

* Node version: >=8.3.0

```
git clone https://github.com/borisding/universsr.git my-project

cd my-project && npm install
```

> Alternatively, you may also use [`universsr-installer`](https://github.com/borisding/universsr-installer) that utilizes GitHub repository for installation.

ii) Running app,

* Copy example environment variables to `config`:

```
cp config/.env.example config/.env
```

> You may change environment variables to serve your app. Avoid using the same port for both development and production.

* For **development**:

```
npm run dev
```

* For **production**:

```
# run `start` script if built files are ready in `public`
npm start

# else, run `build` script before starting
npm run build && npm start
```

* Please check _package.json_ file for other available scripts.

## License

MIT
