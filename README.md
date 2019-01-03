<h1>universsr</h1>

<p>
<a href="https://github.com/borisding/universsr"><img src="https://img.shields.io/github/release/borisding/universsr.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/universsr/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/universsr"><img src="https://travis-ci.org/borisding/universsr.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/universsr"><img src="https://david-dm.org/borisding/universsr/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/universsr?type=dev"><img src="https://david-dm.org/borisding/universsr/dev-status.svg" alt="Dev Dependencies"></a>
</p>

**universsr** - A project starter kit to kick off your next universal React + Redux application, powered by Node.js Express web framework as backend.

> ✨ The name - "universsr" is combination of _universal_ and _server-side rendering (SSR)_ acronym.

## Table of Contents

- [Features](#features)
- [Requirement](#requirement)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Aliases for Modules](#aliases-for-modules)
- [NPM Scripts](#npm-scripts)
- [Project Configuration, Environment Variables and Utilities](#project-configuration-environment-variables-and-utilities)
- [Routes and Lazy Loading Components](#routes-and-lazy-loading-components)
- [CSS, SCSS and CSS Modules](#css-scss-and-css-modules)
- [Babel, Webpack and ESM Loader](#babel-webpack-and-esm-loader)
- [Express Middlewares and Logger](#express-middlewares-and-logger)
- [Session and Redux State Management](#session-and-redux-state-management)
- [Nodemon, HMR and React Hot Reloading](#nodemon-hmr-and-react-hot-reloading)
- [Lint Checks and Formatting](#lint-checks-and-formatting)
- [Testing](#testing)
- [Deployment](#deployment)
- [Changelog](#changelog)
- [License](#license)

## Features

- Server-rendered `react` (v16) + `react-redux` (v6) for binding.
- `Express` framework for backend work.
- Predictable state management and server-side's initial state with `redux` library.
- Modular Redux by implementing `re-ducks` modular approach.
- Redux DevTools Extension support for better Redux debugging experience.
- Static route configuration with `react-router-config` for React Router.
- Sass as extension of CSS and PostCSS for transforming styles with JS plugins.
- Automatic mapping of CSS modules via `babel-plugin-react-css-modules`.
- Webpack’s Hot Module Replacement (HMR) and `react-hot-loader` for both client & server.
- Async components with `react-universal-component` for simultaneous SSR and code splitting.
- Enforce convention and avoid errors with code linter and formatter. (`eslint`, `prettier`, `stylelint`)
- Implement security good practices with Express `helmet` and `hpp` middlewares.
- Combination of Babel and `webpack` enables writing next generation JavaScript and code optimization.
- Using `webpack-bundle-analyzer` to visualize size of webpack output files.
- Delightful testing with `jest` framework for React components.
- Progressive Web App (PWA) with webpack's `offline-plugin`.
- SEO ready with `react-helmet` component to manage document head.
- Build API with Node `http-proxy` integration.

**[Back to top](#table-of-contents)**

## Requirement

Before you proceed, please make sure your machine has met the following requirements:

| Dependency |  Version  |
| ---------- | :-------: |
| Node       | >= v8.3.0 |
| NPM        | >= v5.0.0 |

> **React v16.4.0 or later** is required as this starter is using react-redux v6 for React binding.

**[Back to top](#table-of-contents)**

## Quick Start

i) Installation

Clone the git repository into your new project folder and install required dependencies by running the command below:

```bash
# cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/universsr.git my-project

# install project dependencies
cd my-project && npm install
```

> Alternatively, you may also use [`universsr-installer`](https://github.com/borisding/universsr-installer) that utilizes GitHub repository for project installation.

ii) Running app

For **development**:

```bash
npm run dev
```

For **production**:

Copy `.env.development` to `./config` folder as `.env` for production usage:

```bash
cp config/.env.development config/.env
```

Change environment variables in `.env` to serve your app. Avoid using the same port for both development and production.

```bash
npm run build # or,
npm run build:analyze # to analyze built bundles

npm start
```

For **test**:

```bash
npm test
```

**[Back to top](#table-of-contents)**

## Project Structure

Below is overview of project folder structure in this starter along with the short descriptions, respectively:

<details><summary>CLICK ME</summary>
<p>

```
|--
    |-- .babelrc                        # default babel configuration object
    |-- package.json                    # lists required dependencies, scripts, config, etc
    |-- api.js                          # api entry to expose api server
    |-- app.js                          # app entry to expose app server
    |-- env.js                          # .env file loader with `dotenv` and `dotenv-expand`
    |-- esm.js                          # ESM loader and module alias hook
        ...
    |-- bin                             # contains node server files of app and api
    |-- config                          # contains configuration and env variable files
    |-- node_modules                    # contains installed dependencies of the project
    |-- public                          # contains production ready built assets (icons/images, etc)
    |-- resources                       # contains assets, jest, webpack related
    |   |-- assets                      # contains icons, images, etc
    |   |-- jest                        # contains mocks, setup files for jest framework
    |   |-- webpack                     # contains webpack configurations for both client/server
    |-- src                             # contains all source files of project, both api & app
        |-- api                         # contains all api source files
        |   |-- routers                 # contains respective Express routes for API
        |   |-- index.js                # Express entry for API
        |-- app                         # contains all app source files
        |   |-- client.js               # webpack's client entry and app rendering
        |   |-- html.js                 # html layout in template string for react helmet
        |   |-- index.js                # Express entry for app
        |   |-- offline.js              # offline plugin registration and event handlers
        |   |-- routes.js               # static React routes configuration
        |   |-- server.js               # server renderer for app string & initial state
        |   |-- serverRenderer.js       # built server render for production
        |   |-- common                  # contains reusable React components & styles
        |   |   |-- components          # contains reusable React components for common usage
        |   |   |-- styles              # contains reusable CSS/SCSS for the app
        |   |-- layout                  # contains root React component for page
        |   |   | ...
        |   |   |-- Layout.js           # Root component for react-router-config
        |   |-- pages                   # contains page components based on features
        |   |   |-- Home                # `Home` page related (index.js/styles/tests, etc)
        |   |   |-- NotFound            # `NotFound` page component (index.js/styles/tests, etc)
        |   |   |-- Todos               # `Todos` demo page related (index.js/styles/tests, etc)
        |   |   |-- index.js            # respective exported page components from entry
        |   |   |-- lazy.js             # lazy load page container for code-splitting
        |   |-- redux                   # contains all redux related
        |   |   |-- ducks               # contains reducers, actions, types, etc based on modules
        |   |   |   | ...
        |   |   |   |-- index.js        # redux root reducer for app
        |   |   |-- middlewares         # contains redux middlewares
        |   |   |-- configureStore.js   # configuring Redux store for the app
        |-- logger                      # contains winston logger for both api & app
        |-- middlewares                 # contains Express middlewares for both api & app
        |-- utils                       # utilities used for both client & server
    |-- storage                         # contains fixtures, logs, session files, etc
```

</p>
</details>
<br>

**[Back to top](#table-of-contents)**

## Aliases for Modules

- There are some aliases in this starter can be used to `import` or `require` targeted modules instead of using lengthy relative paths.
- Here is a list of available aliases and description:

<details><summary>CLICK ME</summary>
<p>

| Alias          | Description                                          |
| -------------- | ---------------------------------------------------- |
| `@root`        | The project's root directory                         |
| `@bin`         | The project's `bin` directory                        |
| `@public`      | The project's built `public` directory in production |
| `@resources`   | The project's `resources` directory                  |
| `@assets`      | The `assets` subdirectory within `resources`         |
| `@storage`     | The project's `storage` directory                    |
| `@config`      | The project's `config` directory                     |
| `@utils`       | The `utils` subdirectory within `src`                |
| `@api`         | The `api` subdirectory within `src`                  |
| `@app`         | The `app` subdirectory within `src`                  |
| `@common`      | The `common` subdirectory within `app`               |
| `@layout`      | The `layout` subdirectory within `app`               |
| `@pages`       | The `pages` subdirectory within `app`                |
| `@redux`       | The `redux` subdirectory within `app`                |
| `@logger`      | The `logger` subdirectory within `src`               |
| `@middlewares` | The `middlewares` subdirectory within `src`          |

Those aliases can found under `_moduleAliases` property in `package.json`. Aliases are used for both webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) and `module-alias` package to simplify require/import paths in project. Moreover, it makes project restructuring easier.

</p>
</details>
<br>

**[Back to top](#table-of-contents)**

## NPM Scripts

- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

<details><summary>CLICK ME</summary>
<p>

| Script Name        | Description                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `clean`            | Remove `public` folder and respective built files.                                                                                   |
| `webpack`          | Running webpack build process.                                                                                                       |
| `build`            | Remove previous built files and build production ready files to be served.                                                           |
| `build:analyze`    | Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files.                        |
| `dev:app`          | Start running app server in development environment (React changes are monitored by `webpack-hot-server-middleware` on server-side). |
| `dev:api`          | Start running api server in development environment (started with `nodemon` for monitoring api changes).                             |
| `dev`              | Clean existing built files before running BOTH app and api servers in development environment.                                       |
| `start:app`        | Start running app server in production environment.                                                                                  |
| `start:api`        | Start running api server in production environment.                                                                                  |
| `start`            | Start running BOTH app and api servers in production environment, in parallel.                                                       |
| `test`             | Perform lint checks and then running tests.                                                                                          |
| `test:watch`       | Running tests with watch mode turned on.                                                                                             |
| `test:coverage`    | Running tests with coverage report output.                                                                                           |
| `lint`             | Perform source code lint checks for JS, React and styles based on the ESLint config.                                                 |
| `lint:style`       | Perform lint checks for Sass style.                                                                                                  |
| `lint:js`          | Perform lint checks for JS and React.                                                                                                |
| `heroku-postbuild` | Heroku-specific key for building to serve production app on Heroku platform                                                          |

</p>
</details>
<br>

**[Back to top](#table-of-contents)**

## Project Configuration, Environment Variables and Utilities

**Configuration**

- There are couple of things exposed in `./config/index.js` for project usage:

```js
import { helmet, isDev, isNode, syspath } from '@config';

// React Helmet related config
<Helmet {...helmet} />;

// checking for development environment
if (isDev) {
  // do something only for development mode
}

// this is on server side (Node)
if (isNode) {
  // do something only for server-side
}

// expose project core directories, eg: absolute path of `src`
console.log(syspath.src);
```

- Feel free to add more configuration and used upon project needs.

**Environment Variables**

- `dotenv` and `dotenv-expand` packages are used in conjunction with `webpack.DefinePlugin` plugin for managing environment variables. The entire logic can be found in `./env.js` file. The .env file is loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    |    In Source Control    |
| ------------------ | ----------- | :---------------------: |
| `.env.test`        | test        |           Yes           |
| `.env.development` | development |           Yes           |
| `.env`             | production  | No (Need to create new) |

- Defined custom environment variables can be accessed via `process.env.[VARIABLE_NAME]`, for in instance:

```js
process.env.PORT; // this will give us PORT value
```

- Only those variables we defined in `.env*` file will get stringified for webpack.DefinePlugin for client build process.

**Utilities**

- This starter also offers `print.js` and `service.js` utils that are placed in `./src/utils` directory for the usage of both client & server side.

- `print.js` is a simple util for console logging message with color, based on the log types. eg:

- `print.[error|info|warn|success](message, code)`, example:

```js
import { print } from '@utils';

// on client side (the browser)
print.error('This is error on client side.');

// on server side (the node)
// which will print error message
// and exit the process with provided error code
print.error('This is error on server side and exit with error code', -1);
```

- `service.js` is a class wrapper for [`axios`](https://github.com/axios/axios) library, which is responsible for universal http client, example:

```js
...
import { ServiceClass, service } from '@utils';

// http request based on the http verbs
service.get(url, config);
service.post(url, config);
service.put(url, config);
service.delete(url, config);

// create new service instance
const newService = ServiceClass.create({/* provide axios config here */});

// service request/response interceptors
newService.interceptRequest(resolve, reject);
newService.interceptResponse(resolve, reject);
```

**[Back to top](#table-of-contents)**

## Routes and Lazy Loading Components

**Routes**

- React routes can be found and defined in `.src/app/routes.js`, which is static route configuration helper provided by [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) package to work for React Router, eg:

```js
// in `routes.js`

...
{
    path: '/todos', // the path to todos page
    exact: true, // match path exactly
    menu: 'Todos', // custom `menu` key for navigation menu
    component: pages.Todos, // exposed Todos page component
    loadData: todosActions.prefetchTodos // imported todos fetch action when ssr
}
...
```

- `loadData` property in route is action function, (could be in array for multiple actions) which will be used for fetching initial data on server-side when particular route is matched and fulfilled.

```js
// in `server.js`
...

return dispatch(loadData(match, req));
...
```

- `match` and `req` will be passed to invoked action creator. We may access and use that based on our needs.

- For API, we define modular routes by using `express.Router` class and keep it as individual file in `./src/api/routers` directory. Please refer to `todos.js` as example.

**Lazy Loading**

- `./pages/lazy.js` is util for loading page component on demand via [`react-universal-component`](https://github.com/faceyspacey/react-universal-component):

```js
...
// import the lazy util
import lazy from '@pages/lazy';

// we load `Todos` page component via `lazy` by passing a callback.
// Also, defined a chunk name for it via magic comment
export default lazy(() => import(/* webpackChunkName: 'todos' */ './Todos'));


// additional options can be passed as second argument
// to override the default options, eg: the `minDelay`
export default lazy(() => import(/* ... */ ), {
  minDelay: 2000
});
...
```

**[Back to top](#table-of-contents)**

## CSS, SCSS and CSS Modules

There are two main types of config for styles to work in this starter. Both are using [PostCSS](https://github.com/postcss/postcss) for post-processing CSS via JS plugins. (Note: PostCSS config can be found in `package.json` with `postcss` property.)

**Global CSS/SCSS**

- By default, the config of global styles rule `getGlobalStylesRule` in `./resources/webpack/common.js` recognizes `global.css` or `global.scss` file, which supposed to use CSS `@import` for external CSS stylesheets. (eg: [Bootstrap](https://getbootstrap.com/) or [Bulma](https://bulma.io/) CSS).

- Once we have global stylesheet ready, we can include it in the root component. The following is an example of using Bulma CSS framework for global usage:

a) Install Bulma package

```js
npm install bulma
```

b) Include `bulma.sass` file in `global.scss`

```css
@import '~bulma/bulma.sass';
```

> `~` above refers to the `node_modules` of current project.

c) Include `global.scss` in `src/app/layout/Layout.js`:

```js
// in `Layout.js`

...
import '@common/styles/global.scss';
...
```

d) Lastly, apply Bulma styles in React component. For instance, the message component:

```js
<article className="message">
  <div className="message-header">
    <p>Hello!</p>
    <button className="delete" aria-label="delete" />
  </div>
  <div className="message-body">Thanks for using universsr starter kit.</div>
</article>
```

> You may consider to use [Bloomer](https://bloomer.js.org/) - a set of React components for Bulma to craft your UI components.

> ⚠️ If you got `@import is non-standard behaviour` warning message in `global.scss` when using `@import` CSS file, please read on the [discussion](https://github.com/sass/node-sass/issues/2362) here (TL;DR).

**CSS Modules**

- This starter also enables [CSS Modules](https://github.com/css-modules/css-modules) implementation apart from allowing to use global CSS as mentioned. It utilizes [`babel-plugin-react-css-modules`](https://github.com/gajus/babel-plugin-react-css-modules) to transform `styleName` to `className` using compile time.

- This allows us to distinguish the usage in between global CSS and CSS Modules, as well as better performance via babel plugin. Please check out [more details here](https://github.com/gajus/babel-plugin-react-css-modules) on how it works and the differences.

- CSS Modules rule can be found in `./resources/webpack/common.js` under `getCssModulesRule`.

- It must be using this file naming convention: `[name].module.[css|scss|sass]`

a) Define your CSS selector

```css
.my-selector {
  /* your CSS properties here */
}
```

b) Assign CSS selector to `styleName` attribute in React component

```js
// assumed you have already imported stylesheet in component

...
<div styleName="my-selector">Just an example</div>
...
```

- You may check out the current TODO demo in this starter on the usage.

**[Back to top](#table-of-contents)**

## Babel, Webpack and ESM Loader

- This stater uses Babel 7 to transpile ES2015 and beyond syntax. Also, webpack 4 is used for module bundling workflow. All webpack configuration can be found in `./resources/webpack`.

> Please note that stage presets (@babel/preset-stage-0, etc) [have been removed](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets) in Babel 7. Be sure new babel plugins are only installed based on your needs, if any.

- There are two different bundles for universal app where one for client and another for server:

Client entry:

```js
...
entry: [
    ...
    './app/client.js'
],
...
```

- The app `client.js` is bundled to render DOM on the client side.

Server entry:

```js
entry: [
    ...
    './app/server.js'
],
```

- The main responsibility of `server.js` is built for server rendering React element to HTML string and sending it down to the initial request. Besides, the Redux's initial state will be done in this server renderer as well (which will be sent down and assigned to `__UNIVERSSR_PRELOADED_STATE__` global variable for client side hydration).

- The server renderer (which is also Express middleware) will be used in conjunction with `webpack-hot-server-middleware` for ensuring the bundle is with the latest compilation without restarting the server over and over again.

- We are not transpiling all server-side code since Node.js has already [supported](https://node.green/) most of the ES2015 syntax. `esm` package is used for `import`/`export` and CJS interop in Node.js code. This keeps syntax consistent and also spares room for future ES Module transition.

**[Back to top](#table-of-contents)**

## Express Middlewares and Logger

**Middlewares**

- Several custom Express middlewares are provided and located in `./src/middlewares`. Middlewares can be shared between app and api. The usage and description are as follows:

> How to use Express middleware, please check out [Using Middleware](https://expressjs.com/en/guide/using-middleware.html) documentation.

a) `errorHandler.js` - A custom middleware for handling thrown exception errors in both development and production environments.

```js
// mount the middleware last
app.use(errorHandler());

// JSON format will be returned when `req.xhr` is detected
// or, `json` property with `true` value is passed as option
app.use(errorHandler({ json: true }));
```

b) `httpLogger.js` - A small custom logger middleware which utilizes `morgan` and `winston` for http request logging.

```js
// logs all http requests in development
// skip any status code lesser than 400 in production
app.use(httpLogger());
```

c) `proxy.js` - A wrapper of [`node-http-proxy`](https://github.com/nodejitsu/node-http-proxy) for the app.

```js
// mount the `proxy.proxyWeb` at the API path as middleware function
// any requests made to `/api/v1` will be proxied
app.use('/api/v1', proxy.proxyWeb);
```

**Logger**

- Logger util can be found in `./src/logger`, which exposes winston logger instance for logging purporses, eg:

```js
import logger from '@logger';

// logging info message
logger.info('Hi! I am info message.');
```

- log files are stored in `./src/storage/logs`.

**[Back to top](#table-of-contents)**

## Session and Redux State Management

**Session Management**

- This starter comes with default file storage (`session-file-store`) for session management. Please refer to `./src/api/index.js`.

- Feel free to use different storage for session management. For instance, storing sessions with Redis:

```js
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis'; // redis client we use for

...
const RedisStore = connectRedis(session);
// please check ioredis docs for more details
const client = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: 'auth',    // password, if any
});

app.use(session({
    store: new RedisStore({ client }),
    secret: 'your-very-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }
}));
...
```

**Redux State Management**

- All things related to Redux can be found in `./src/app/redux`, which adheres [`re-ducks`](https://github.com/alexnm/re-ducks) modular approach, which is good fit for large applications. Be sure to go through with the documentation.

- Redux's middleware registration and store creation can be found in `./src/app/redux/configureStore.js`. The app's root reducer is produced in `./src/app/redux/ducks/index.js` via the `combineReducers` helper function.

- Besides, this starter also comes with [`redux-thunk`](https://github.com/reduxjs/redux-thunk) as default package for handling asynchronous dispatch. Please check out `Todos` demo page on the todos' redux state management and async action dispatches.

- For better Redux debugging experience, you may want to install [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension). It's turned on for development mode in this starter.

**Redux Middlewares**

- By default, this starter comes with a custom middleware - `./src/app/redux/middlewares/serviceAlert.js`.

- `serviceAlert.js` is used in conjunction with [`react-s-alert`](https://github.com/juliancwirko/react-s-alert) package for flashing info/warning/success alert messages in application, based on the dispatched action types. Please take a look at `./src/app/redux/configureStore.js` on the usage.

- Any new Redux middlewares should be placed in `./src/app/redux/middlewares`.

**[Back to top](#table-of-contents)**

## Nodemon, HMR and React Hot Reloading

- When developing Node application, we usually need to restart server whenever changes are made to files. This starter uses [Nodemon](https://github.com/remy/nodemon) to auto-restart API server by watching over the file changes made in the detected directory.

- For React app, `webpack-dev-middleware` - the express-style middleware and `webpack-hot-middleware` are used to work with webpack in order to achieve hot module replacement in development environment. Most of the time, we have state in components that need to be retained, so `react-hot-loader` is also used to assure state is carried over when module get updated without losing it.

```js
// in `client.js`
...
if (module.hot) {
  module.hot.accept('./routes', () => {
    render(routes);
  });
}
...
```

- Since HMR is assuring the latest bundle on client side, we also adopt `webpack-hot-server-middleware` to assure bundle changes also get reflected on the fly for server-side, without requiring a server restart.

- Besides JavaScript, this starter also uses [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) + [`css-hot-loader`](https://github.com/shepherdwind/css-hot-loader) to achieve HMR for changes made in CSS files/chunks, without going through full page reloading.

**[Back to top](#table-of-contents)**

## Lint Checks and Formatting

- This starter uses [ESLint](https://eslint.org/) for JavaScript and React components lint checks, as well as using [stylelint](https://stylelint.io/) to enforce conventions in SCSS based on configured rules. Both ESLint and Stylelint configs can be found in `package.json`.

- There are several ESLint rules have already been defined under `eslintConfig` property. Feel free to add or remove any rules based on your project's context. For styles, you may define rules under `stylelint` property, which is extending `stylelint-config-sass-guidelines`.

- Besides, [Prettier](https://prettier.io/) is also used for opinionated code styles and formatting.

**[Back to top](#table-of-contents)**

## Testing

- This starter comes with [Jest](https://jestjs.io/) JavaScript testing framework. The following testing utilities are useful and you may want to use it most of the time:

  - [React Testing Library](https://github.com/kentcdodds/react-testing-library)
  - [Enzyme](https://github.com/airbnb/enzyme)

- We keep each `tests` folders along with its own page to align with feature-first project structure. Jest will look up respective `tests` directories which has test files end in either `.spec.jsx?` or `.test.jsx?` for execution. (Please check out `jest` section in `package.json` for configuration.)

- Please read on [NPM scripts](#npm-scripts) section to learn more about running test scripts.

**[Back to top](#table-of-contents)**

## Deployment

To deploy app to production on [Heroku](https://www.heroku.com/), you just remove or comment out `PORT` variable from `.env` file (remember to remove `.env` from `.gitignore`). For deployment steps, please check out [this guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs) and the [build behavior](https://devcenter.heroku.com/articles/nodejs-support#build-behavior) on Heroku.

**[Back to top](#table-of-contents)**

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/borisding/universsr/releases). For new project, always using the latest version. This project adheres to [Semantic Versioning](http://semver.org/).

**[Back to top](#table-of-contents)**

## License

[MIT](https://raw.githubusercontent.com/borisding/universsr/master/LICENSE)
