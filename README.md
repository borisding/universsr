<h1>universsr</h1>

<p>
<a href="https://github.com/borisding/universsr"><img src="https://img.shields.io/github/release/borisding/universsr.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/universsr/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/universsr"><img src="https://travis-ci.org/borisding/universsr.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/universsr"><img src="https://david-dm.org/borisding/universsr/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/universsr?type=dev"><img src="https://david-dm.org/borisding/universsr/dev-status.svg" alt="Dev Dependencies"></a>
</p>

**universsr** - An opinionated project starter kit to kick off your next universal React + Redux application, powered by Node.js Express web framework as backend.

> ✨ The name - "universsr" is combination of _universal_ and _server-side rendering (SSR)_ acronym.

## Features

- Server-rendered [`react`](https://github.com/facebook/react) + [`react-redux`](https://github.com/reduxjs/react-redux) for binding.
- [`Express`](https://github.com/expressjs/express) framework for backend work.
- ECMAScript modules with [`esm`](https://github.com/standard-things/esm) module loader.
- Combination of [`babel`](https://github.com/babel/babel) and [`webpack`](https://github.com/webpack) enables writing next generation JavaScript and code optimization.
- Predictable state management and server-side's initial state with [`redux`](https://github.com/reduxjs/redux) library, in modular pattern.
- [React Frontload](https://github.com/davnicwil/react-frontload) async data loading for React components.
- [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) support for better Redux debugging experience.
- Static route configuration with [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) for React Router.
- Sass as extension of CSS and [`PostCSS`](https://github.com/postcss/postcss) for transforming styles with JS plugins.
- Supports [CSS modules](https://github.com/css-modules/css-modules) out of the box.
- Webpack’s Hot Module Replacement (HMR) and [`react-hot-loader`](https://github.com/gaearon/react-hot-loader) for both client & server.
- Async components with [`react-universal-component`](https://github.com/faceyspacey/react-universal-component) for simultaneous SSR and code splitting.
- Enforce convention and avoid errors with code linter and formatter. ([`eslint`](https://github.com/eslint/eslint), [`prettier`](https://github.com/prettier/prettier), [`stylelint`](https://github.com/stylelint/stylelint))
- Implement security good practices with Express [`helmet`](https://github.com/helmetjs/helmet) and [`hpp`](https://github.com/analog-nico/hpp) middlewares.
- Using [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) to visualize size of webpack output files.
- Delightful testing with [`jest`](https://github.com/facebook/jest) framework for React components.
- Progressive Web App (PWA) with webpack's [`offline-plugin`](https://github.com/NekR/offline-plugin).
- SEO ready with [`react-helmet`](https://github.com/nfl/react-helmet) component to manage document head.
- Build API with Node [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware) integration.

## Requirement

Before you proceed, please make sure your machine has met the following requirements:

| Dependency |   Version   |
| ---------- | :---------: |
| Node       | >= v10.13.0 |
| NPM        |  >= v6.4.1  |

> **React v16.8.3 or later** is required as this starter is using react-redux v7 for React binding.

## Quick Start

i) Installation

```bash
# cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/universsr.git my-project

# install project dependencies
cd my-project && npm install
```

ii) Running app

For **development**:

```bash
npm run dev
```

For **production**:

Copy `.env.development` to `./config/dotenv` folder as `.env` for production usage:

```bash
cp config/dotenv/.env.development config/dotenv/.env
```

Change environment variables in `.env` to serve your app.

```bash
npm run build # or,
npm run build:analyze # to analyze built bundles

npm start
```

For **test**:

```bash
npm test
```

## Project Structure

Below is overview of project folder structure in this starter along with the short descriptions, respectively:

<details><summary>CLICK ME</summary>
<p>

```
|--
    |-- api                             # contains all api source files
    |   |-- routes                      # contains respective Express routes for API
    |   |-- index.js                    # Express entry for API
    |-- app                             # contains all app source files
    |   |-- App.js                      # webpack's client entry and app rendering
    |   |-- html.js                     # html layout in template string
    |   |-- index.js                    # Express entry for app
    |   |-- registerOffline.js          # offline plugin registration for service worker
    |   |-- serverRenderer.js           # server renderer for app string & initial state
    |   |-- components                  # contains reusable React components for common usage
    |   |-- layout                      # contains root React component for pages
    |   |   | ...
    |   |   |   |-- Layout.js           # Root component for react-router-config
    |   |-- pages                       # contains page components based on features
    |   |   |-- Home                    # `Home` page related
    |   |   |-- NotFound                # `NotFound` page component
    |   |   |-- Todos                   # SSR todos list example
    |   |   |-- lazyLoad.js             # lazy load page component and code-splitting on SSR
    |   |-- redux                       # contains all redux related
    |   |   |-- todos                   # contains redux files for todos demo
    |   |   |   | ...
    |   |   |-- index.js                # redux root reducer for app
    |   |   |-- configureStore.js       # configuring Redux store for the app
    |   |-- routes                      # contains react route's configuration
    |   |-- theme                       # contains app general theme files, such as variables
    |   |-- utils                       # utilities used for the app
    |-- assets                          # contains icons, images, mocks etc
    |-- config                          # contains configuration and env variable files
    |-- logger                          # contains winston logger for both api & app
    |-- logs                            # contains the generated log files
    |-- middleware                      # contains Express respective middlewares for both api & app
    |-- node_modules                    # contains installed dependencies of the project
    |-- public                          # contains production ready built assets, such as icons
    |-- webpack                         # contains webpack configurations for both client/server
    |-- api.js                          # api entry to expose api server
    |-- app.js                          # app entry to expose app server
    |-- babel.config.js                 # default babel configuration object
    |-- env.loader.js                   # .env file loader with `dotenv` and `dotenv-expand`
    |-- esm.import.js                   # ES module loader
    |-- package.json                    # lists required dependencies, scripts, etc
        ...                             # other tooling config files (ESLint/Prettier/PostCSS/Stylelint/Jest)
    |-- webpack.config.babel.js         # webpack entry files for both client/server
```

</p>
</details>
<br>

## NPM Scripts

- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

<details><summary>CLICK ME</summary>
<p>

| Script Name     | Description                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `clean`         | Remove `public` folder and respective built files.                                                                     |
| `webpack`       | Running webpack build process.                                                                                         |
| `build`         | Remove previous built files and build production ready files to be served.                                             |
| `build:analyze` | Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files.          |
| `dev:app`       | Start running app server in development environment (server renderer is monitored by `webpack-hot-server-middleware`). |
| `dev:api`       | Start running api server in development environment (started with `nodemon` for monitoring api changes).               |
| `dev`           | Clean existing built files before running BOTH app and api servers in development environment.                         |
| `start:app`     | Start running app server in production environment.                                                                    |
| `start:api`     | Start running api server in production environment.                                                                    |
| `start`         | Start running BOTH app and api servers in production environment, in parallel.                                         |
| `test`          | Perform tests execution.                                                                                               |
| `test:update`   | Running tests with snapshots get updated on.                                                                           |
| `test:watch`    | Running tests with watch mode turned on.                                                                               |
| `test:coverage` | Running tests with coverage report output.                                                                             |
| `lint`          | Perform source code lint checks for JS, React and styles based on the ESLint and stylelint config.                     |
| `lint:style`    | Perform lint checks for Sass style.                                                                                    |
| `lint:js`       | Perform lint checks for JS and React.                                                                                  |

</p>
</details>
<br>

**Environment Variables**

`dotenv` and `dotenv-expand` packages are used in conjunction with `webpack.DefinePlugin` plugin for managing environment variables. The entire logic can be found in `./env.loader.js` file. The .env file is loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    |    In Source Control    |
| ------------------ | ----------- | :---------------------: |
| `.env.test`        | test        |           Yes           |
| `.env.development` | development |           Yes           |
| `.env`             | production  | No (Need to create new) |

Defined custom environment variables can be accessed via `process.env.[VARIABLE_NAME]`, for in instance:

```js
process.env.PORT; // this will give us PORT value
```

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/borisding/universsr/releases). For new project, always using the latest version. This project adheres to [Semantic Versioning](http://semver.org/).

## License

[MIT](https://raw.githubusercontent.com/borisding/universsr/master/LICENSE)
