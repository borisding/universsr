<h2 align="center">**universsr**</h2>
<div align="center">
[![Build Status][release]][release-url]
[![Build Status][builds]][builds-url]
[![dependencies Status][deps]][deps-url]
[![devDependencies Status][deps-dev]][deps-dev-url]
[![MIT licensed][licenses]][licenses-url]
</div>

[release]: https://img.shields.io/github/release/borisding/universsr.svg
[release-url]: https://github.com/borisding/universsr
[builds]: https://travis-ci.org/borisding/universsr.svg?branch=master
[builds-url]: https://travis-ci.org/borisding/universsr
[deps]: https://david-dm.org/borisding/universsr/status.svg
[deps-url]: https://david-dm.org/borisding/universsr
[deps-dev]: https://david-dm.org/borisding/universsr/dev-status.svg
[deps-dev-url]: https://david-dm.org/borisding/universsr?type=dev
[licenses]: https://img.shields.io/badge/license-MIT-blue.svg
[licenses-url]: https://raw.githubusercontent.com/borisding/universsr/master/LICENSE

## Introduction

In short, **universsr** is a server-rendered React app starter for universal JavaScript web development.
It is also using Redux library for application state management and the back-end is powered by Node.js Express web framework.

> The name - "universsr" is combination of _universal_ and _SSR_ acronym.

P/S: If you're still new with the concept of Server-Side Rendering (SSR) front-end framework, then [this](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4) and [this](https://cdb.reacttraining.com/universal-javascript-4761051b7ae9) are worth reading.

## Feature Highlights

- [x] Server-rendered React 16 and powered by Express framework.
- [x] Predictable state management and server-side's initial state with Redux library.
- [x] Static route configuration with React Router Config.
- [x] Sass as extension of CSS and PostCSS for transforming styles with JS plugins.
- [x] Automatic mapping of CSS modules via React CSS Modules babel plugin.
- [x] Webpack’s Hot Module Replacement (HMR) and React Hot Reloading for both client & server.
- [x] React Universal Component for simultaneous SSR and code splitting.
- [x] Enforce convention and avoid errors with code linter and formatter. (ESLint, Prettier, Stylelint)
- [x] Enforce security good practices with Express Helmet and HPP middlewares.
- [x] Combination of Babel and webpack enables writing next generation JavaScript and code optimization.
- [x] Webpack bundle analyzer to visualize size of webpack output files.
- [x] Jest and Enzyme testing utilities for React components.
- [x] Progressive Web App (PWA) with webpack's offline plugin and SEO ready.
- [x] Build API with node http proxy integration.

## Quick Start

i) Installation

Before you proceed, please make sure your machine has met the following requirements:

| Dependency |  Version  |
| ---------- | :-------: |
| Node       | >= v8.0.0 |
| NPM        | >= v5.0.0 |

Then, clone the git repository into your new project folder and install required dependencies by running the command below:

```
## cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/universsr.git my-project

## install project dependencies
cd my-project && npm install
```

> Alternatively, you may also use [`universsr-installer`](https://github.com/borisding/universsr-installer) that utilizes GitHub repository for project installation.

ii) Configuration

Copy example environment variables to `config`:

```
cp resources/config/.env.example resources/config/.env
```

> You may change environment variables to serve your app. Avoid using the same port for both development and production.

When environment values are changed, we can run the following script to load new changes into `process.env`:

```
npm run config
```

After script is executed, it will also create `config-properties.json` for universal configuration usage in application, which is exported in config's `index.js`

iii) Running app

- For **development**:

```
npm run dev
```

- For **production**:

```
npm run build # or,
npm run build:analyze # to analyze built bundles

npm start
```

- Both scripts will run config script as mentioned above.
- Please check `package.json` file for other available scripts.

## Deployment

Deploying to production on [Heroku](https://www.heroku.com/):

1.  Remove or comment out `PORT` variable from `.env` file (remember to remove `.env` from `.gitignore`)
2.  Login with your credentials via command: `heroku login`
3.  Create your app: `heroku create <your app name>`
4.  Commit local changes and push to Heroku: `git push heroku master`
5.  To visit deployed app: `heroku open`

> Node.js now installs `devDependencies` [by default](https://devcenter.heroku.com/changelog-items/1376) on Heroku.

## License

MIT
