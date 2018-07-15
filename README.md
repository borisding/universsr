## universsr [![Build Status](https://travis-ci.org/borisding/universsr.svg?branch=master)](https://travis-ci.org/borisding/universsr)

- Universal React + Redux, Express application starter boilerplate.

## Feature Highlights

- Universal React 16 + Redux, with Express server
- Sass. React CSS Modules automatic mapping of CSS modules
- React Router 4 + React Router Config
- HMR + Hot Reloading for both client & server
- React Universal Component for SSR, code splitting
- ESLint, Prettier and Stylelint for linting, formatting
- Progressive Web App (PWA), SEO ready
- Security - Express Helmet, HPP middlewares
- Babel 7, Webpack 4, ES6/ES7

## Quick Start

i) Installation

- Node version: >= v6.0.0

```
git clone https://github.com/borisding/universsr.git my-project

cd my-project && npm install
```

> Alternatively, you may also use [`universsr-installer`](https://github.com/borisding/universsr-installer) that utilizes GitHub repository for installation.

ii) Configuration

- Copy example environment variables to `config`:

```
cp resources/config/.env.example resources/config/.env
```

> You may change environment variables to serve your app. Avoid using the same port for both development and production.

When environment values are changed, we can run the following script to load new changes into `process.env`:

```
npm run config
```

After script is executed, it will also create `config.properties.json` for universal configuration usage in application, which is exported in config's `index.js`

iii) Running app

- For **development**:

```
npm run dev
```

- For **production**:

```
npm run build && npm start
```

- Both scripts will run config script as mentioned above.
- Please check _package.json_ file for other available scripts.

## License

MIT
