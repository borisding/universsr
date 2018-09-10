<h1>universsr</h1>

<p>
<a href="https://github.com/borisding/universsr"><img src="https://img.shields.io/github/release/borisding/universsr.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/universsr/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/universsr"><img src="https://travis-ci.org/borisding/universsr.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/universsr"><img src="https://david-dm.org/borisding/universsr/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/universsr?type=dev"><img src="https://david-dm.org/borisding/universsr/dev-status.svg" alt="Dev Dependencies"></a>
</p>

In short, **universsr** is a server-rendered React app starter boilerplate for universal JavaScript web development.
It is also using Redux library for application state management and the back-end is powered by Node.js Express web framework.

> The name - "universsr" is combination of _universal_ and _SSR_ acronym.

P/S: If you're still new with the concept of Server-Side Rendering (SSR) front-end framework, then [this article](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4) is worth reading.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Aliases for Modules](#aliases-for-modules)
- [NPM Scripts](#npm-scripts)
- [Project Configuration and Utilities](#project-configuration-and-utilities)
- [App and API Routes](#app-and-api-routes)
- [CSS, SCSS and CSS Modules](#css-scss-and-css-modules)
- [Babel, Webpack and ESM Loader](#babel-webpack-and-esm-loader)
- [Express and Redux Middlewares](#express-and-redux-middlewares)
- [State Management with Redux](#state-management-with-redux)
- [Nodemon, HMR and React Hot Reloading](#nodemon-hmr-and-react-hot-reloading)
- [Lint Checks and Formatting](#lint-checks-and-formatting)
- [Unit Testing](#unit-testing)
- [Deployment](#deployment)
- [Changelog](#changelog)
- [License](#license)

## Features

- Server-rendered `react` 16 and powered by `express` framework.
- Predictable state management and server-side's initial state with `redux` library.
- Static route configuration with `react-router-config` for React Router.
- Sass as extension of CSS and PostCSS for transforming styles with JS plugins.
- Automatic mapping of CSS modules via `babel-plugin-react-css-modules`.
- Webpack’s Hot Module Replacement (HMR) and `react-hot-loader` for both client & server.
- Using `react-universal-component` for simultaneous SSR and code splitting.
- Enforce convention and avoid errors with code linter and formatter. (`eslint`, `prettier`, `stylelint`)
- Implement security good practices with Express `helmet` and `hpp` middlewares.
- Combination of Babel and `webpack` enables writing next generation JavaScript and code optimization.
- Using `webpack-bundle-analyzer` to visualize size of webpack output files.
- Delightful testing with `jest` framework and `enzyme` testing utilities for React components.
- Progressive Web App (PWA) with webpack's `offline-plugin` and SEO ready.
- Build API with Node `http-proxy` integration.

**[Back to top](#table-of-contents)**

## Getting Started

i) Installation

Before you proceed, please make sure your machine has met the following requirements:

| Dependency |  Version  |
| ---------- | :-------: |
| Node       | >= v8.0.0 |
| NPM        | >= v5.0.0 |

Then, clone the git repository into your new project folder and install required dependencies by running the command below:

```bash
# cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/universsr.git my-project

# install project dependencies
cd my-project && npm install
```

> Alternatively, you may also use [`universsr-installer`](https://github.com/borisding/universsr-installer) that utilizes GitHub repository for project installation.

ii) App configuration

Copy example environment variables to `config`:

```bash
cp resources/config/.env.example resources/config/.env
```

> You may change environment variables to serve your app. Avoid using the same port for both development and production.

When environment values are changed, we can run the following script to load new changes into `process.env`:

```bash
npm run config
```

After script is executed, it will also create `config-properties.json` for universal configuration usage in application.

iii) Running app

- For **development**:

```bash
npm run dev
```

- For **production**:

```bash
npm run build # or,
npm run build:analyze # to analyze built bundles

npm start
```

- For **testing**:

```bash
# run config script when `config-properties.json` is not available
npm run config

npm test
```

**[Back to top](#table-of-contents)**

## Directory Structure

- Below is a tree view of project folder structure in this starter along with the short descriptions, respectively:

```
|--
    |-- .babelrc                   # default babel configuration object
    |-- .eslintrc                  # eslint configuration object
    |-- .stylelintrc               # stylelint configuration object
    |-- api.js                     # api entry
    |-- app.js                     # app entry
    |-- esm.js                     # ESM loader and module alias hook
        ...
    |-- bin                        # node server files of app and api
    |-- build                      # parent directory of scripts/webpack
    |   |-- scripts                # build scripts for tooling purposes
    |   |-- webpack                # webpack config for both client & server
    |-- public                     # production built assets (icons/images/views, etc)
    |-- resources                  # parent directory of resources (config/views/logs, etc)
    |   |-- assets                 # parent directory of all assets
    |   |   |-- manifest.json      # manifest JSON file for web app
    |   |   |-- icons              # source files of icon
    |   |   |-- images             # source files of image
    |   |-- config                 # app level configuration (.env/syspath, etc)
    |   |-- fixtures               # fixture data for development
    |   |-- logs                   # log files of the app
    |   |-- mocks                  # file & style mocks for jest
    |   |-- views                  # source files of view template
    |-- src                        # parent directory of both api & app source code
        |-- api                    # parent directory of api source code
        |   |-- routers            # respective Express routes for API
        |-- app                    # parent directory of app source code
        |   |-- container.js       # app container as webpack's client entry
        |   |-- index.js           # app server index entry file
        |   |-- offline.js         # offline plugin registration
        |   |-- renderer-built.js  # built from `renderer.js` source for production
        |   |-- renderer.js        # server renderer for app string & initial state
        |   |-- root.js            # root reducer creation for the app
        |   |-- routes.js          # static React routes configuration
        |   |-- store.js           # redux middleware registration & store factory
        |   |-- common             # reusable React components & styles
        |   |   |-- components     # reusable React components for common usage
        |   |   |-- styles         # reusable CSS/SCSS for the app
        |   |-- pages              # page components based on "modules"
        |       |-- base           # base components for page layout (root component/styles/tests, etc)
        |       |-- home           # `Home` page related (components/reducers/styles/tests, etc)
        |       |-- todos          # `Todos` demo page related (components/reducers/styles/tests, etc)
        |-- middlewares            # all middlewares used for the app
        |   |-- express            # middlewares for Express framework
        |   |-- redux              # middlewares for Redux library
        |-- utils                  # utilities used for both client & server
```

- This project structure is organized by having feature-first approach in mind. Thus, for any new features (the page), try to keep it as feature-based folder in `./src/app/pages`. Things in common such as common styles or components can be kept in `./src/app/common` directory.

**[Back to top](#table-of-contents)**

## Aliases for Modules

- There are some aliases in this starter can be used to `import` or `require` targeted modules instead of using relative paths.
- Here is a list of available aliases and description:

| Alias          | Description                                  |
| -------------- | -------------------------------------------- |
| `@root`        | The project's root directory                 |
| `@bin`         | The project's `bin` directory                |
| `@build`       | The project's `build` directory              |
| `@public`      | The project's built `public` directory in production|
| `@resources`   | The project's `resources` directory          |
| `@assets`      | The `assets` subdirectory within `resources` |
| `@config`      | The `config` subdirectory within `resources` |
| `@middlewares` | The `middlewares` subdirectory within `src`  |
| `@utils`       | The `utils` subdirectory within `src`        |
| `@api`         | The `api` subdirectory within `src`          |
| `@app`         | The `app` subdirectory within `src`          |
| `@common`      | The `common` subdirectory within `app`       |
| `@pages`       | The `pages` subdirectory within `app`        |

- Changes can be made under `_moduleAliases` property in `package.json`. The aliases are used for both webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) and `module-alias` package.

**[Back to top](#table-of-contents)**

## NPM Scripts

- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

| Script Name     | Description                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `config`        | Loads `.env` environment variables into `process.env`. Also, generate `config-properties.json` file for universal usage.                |
| `clean`         | Remove `public` folder and built files.                                                                                                 |
| `build`         | Clean previous built files and build production ready files to be served. This will run `config` script as well.                        |
| `build:analyze` | Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files.                           |
| `postinstall`   | Run after packages installed - which triggers `build` script in our context. Useful for production deployment, eg: deployment on heroku |
| `dev:app`       | Start running app server in development environment (React changes are monitored by `webpack-hot-server-middleware` on server-side).    |
| `dev:api`       | Start running api server in development environment (started with `nodemon` for monitoring api changes).                                |
| `dev`           | Clean existing built files before running BOTH app and api servers in development environment.                                          |
| `start:app`     | Start running app server in production environment.                                                                                     |
| `start:api`     | Start running api server in production environment.                                                                                     |
| `start`         | Start running BOTH app and api servers in production environment.                                                                       |
| `lint`          | Perform source code lint checks for JS, React and styles based on the ESLint config.                                                    |
| `lint:style`    | Perform lint checks for Sass style.                                                                                                     |
| `lint:js`       | Perform lint checks for JS and React.                                                                                                   |
| `precommit`     | Git hooks via pre commit - which triggers lint checks.                                                                                  |
| `test`          | Perform lint checks and then running tests.                                                                                             |
| `test:watch`    | Running test with watch mode turned on.                                                                                                 |
| `test:coverage` | Running test with coverage report output.                                                                                               |

**[Back to top](#table-of-contents)**

## Project Configuration and Utilities

**Configuration**

- Project configuration should be placed in `./resources/config` directory. By default, this starter comes with an example `.env.example` required for the app usage. Please rename the file to `.env` to serve your actual app configuration.

- This starter relies on `dotenv` package to load environment variables from `.env` into Node's `process.env`. You should always define new environment variables in `.env`.

- When there are changes in `.env` file, we can run `config` script to load changes into `process.env`. The NPM script will also generate `config-properties.json` based on the defined environment variables. We should not amend directly any of the config properties, which supposed be synced with `.env`

- To use the config properties, we can import the config's `index.js`, which is cosisted of "exported" environment variables, system paths, etc. This is handy and to make sure everything is centralized for the usage of both server and client side.

```js
import config from "@config";
```

> You should never commit `.env` file to version control. Please [check out](https://www.npmjs.com/package/dotenv#faq) the FAQ section on `dotenv` page for more details.

**Utilities**

- This starter provides `print.js` and `service.js` utils that are placed in `./src/utils` directory for the usage of both client & server side.

- `print.js` is a simple util for console logging message with color, based on the log types. eg:

- `print.[error|info|warn|success](message, code)`, example:

```js
import { print } from "@utils";

// on client side (the browser)
print.error("This is error on client side.");

// on server side (the node)
// which will print error message
// and exit the process with provided error code
print.error("This is error on server side and exit with error code", -1);
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

## App and API Routes

- React routes can be found and defined in `.src/app/routes.js`, which is static route configuration helper provided by [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) package to work for React Router.

- You will find out [`react-universal-component`](https://github.com/faceyspacey/react-universal-component) is also being used in page routes for code splitting purpose. For instance, the `todos` demo as use case in this starter.

```js
// in `routes.js`

...
{
    path: '/todos',
    exact: true,
    menu: 'Todos',
    loadData: prefetchTodos,
    component: universal(import('./pages/todos'), options)
},
...
```

- `loadData` property in route is action function, (could be in array for multiple actions) which will be used for preloading initial data on server-side when particular route is matched and fulfilled. `menu` is just another property to serve menu's label or name.

```js
// in `renderer.js`

...
const branch = matchRoutes(routes, url);
const promises = branch.map(({ route, match }) => {
    const { loadData } = route;
    const { dispatch } = store;

    if (match && match.isExact && loadData) {
    return Array.isArray(loadData)
        ? Promise.all(loadData.map(action => dispatch(action(match))))
        : dispatch(loadData(match));
    }

    return Promise.resolve(null);
});

return Promise.all(promises);
...
```

- For API, we define modular routes by using `express.Router` class and keep it as individual file in `./src/api/routers` directory. Please refer to `todos.js` as example.

**[Back to top](#table-of-contents)**

## CSS, SCSS and CSS Modules

- There are two main types of config for styles to work in this starter. Both are using [PostCSS](https://github.com/postcss/postcss) for post-processing CSS via JS plugins:

**Global CSS/SCSS**

- By default, the config of global styles rule `globalStylesRule` in `./build/webpack/common.js` recognizes `global.css` or `global.scss` file, which supposed to use CSS `@import` for external CSS stylesheets. (eg: [Bootstrap](https://getbootstrap.com/) or [Bulma](https://bulma.io/) CSS).

- Once we have global stylesheet ready, we can import it in the root component, which is `Layout` component in our context. The following is an example of using Bulma CSS framework for global usage:

a) Install Bulma package

```js
npm install bulma
```

b) `@import` Bulma CSS in `global.css`

```css
@import "~bulma/css/bulma.css";
```

> `~` above refers to the `node_modules` of current project.

c) Import `global.css` in `Layout` root component

```js
...
import '@common/styles/global.css';
...
```

d) Lastly, apply Bulma styles in React component. For instance, the message component

```js
<article className="message">
  <div className="message-header">
    <p>Hello!</p>
    <button className="delete" aria-label="delete" />
  </div>
  <div className="message-body">
    Thanks for using universsr starter boilerplate.
  </div>
</article>
```

> If you are using Bulma, can consider [Bloomer](https://bloomer.js.org/) - a set of React components for Bulma.

> If you got `@import is non-standard behaviour` warning message in `global.scss` when using `@import` in SCSS file, please read on the [discussion](https://github.com/sass/node-sass/issues/2362) here (TL;DR).

**CSS Modules**

- This starter also enables [CSS Modules](https://github.com/css-modules/css-modules) implementation apart from allowing to use global CSS as mentioned. It utilizes `babel-plugin-react-css-modules` instead of `react-css-modules` hook to transform `styleName` to `className` using compile time.

- This allows us to distinguish the usage in between global CSS and CSS Modules, as well as better performance via babel plugin. Please check out [more details here](https://github.com/gajus/babel-plugin-react-css-modules) on how it works and the differences.

- The config of CSS Modules rule `cssModulesRule` can be found in `./build/webpack/common.js`.

- It's straightforward to apply CSS Modules:

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

- This stater is using Babel 7 to transpile ES2015 and beyond syntax. Also, webpack 4 is used for module bundling workflow. All webpack configuration can be found in `./build/webpack`.

> Please note that stage presets (@babel/preset-stage-0, etc) [have been removed](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets) in Babel 7. Be sure new babel plugins are only installed based on your needs, if any.

- It is not uncommon to have two different bundles for universal app where one for client and another for server:

Client entry:

```js
...
entry: [
    ...
    './app/container.js'
],
...
```

- The app `container.js` is bundled to render DOM on the client side.

Server entry:

```js
entry: [
    ...
    './app/renderer.js'
],
```

- The main responsibility of `renderer.js` is built for server rendering React element to HTML string and sending it down to the initial request. Besides, the Redux's initial state will be done in this server renderer as well (which will be sent down and assigned to `__UNIVERSSR_PRELOADED_STATE__` global variable for client side hydration).

- The server renderer (which is also Express middleware) will be used in conjunction with `webpack-hot-server-middleware` for ensuring the bundle is with the latest compilation without restarting the server over and over again.

- We are not transpiling all server-side code since Node.js has already [supported](https://node.green/) most of the ES2015 syntax. `esm` package is used for `import` and `export` in those non-transpiled code. This keeps syntax consistent and also spares room for future ES Module transition in Node.

**[Back to top](#table-of-contents)**

## Express and Redux Middlewares

- There are two categories of middleware in this starter:

**Express Middlewares**

- Several custom Express middlewares are provided and located in `./src/middlewares/express` directory. Middlewares are being shared between app and api. The usage and description are as follows:

> How to use Express middleware, please check out [Using Middleware](https://expressjs.com/en/guide/using-middleware.html) documentation.

a) `csp.js` - A wrapper of Helmet's Content Security Policy [(CSP) middleware](https://helmetjs.github.io/docs/csp/).

```js
// mount by invoking `nonce` method to generate nonce token for csp
app.use(csp.nonce());

// then followed by `mount` method by passing `helmet` to it
app.use(csp.mount(helmet));
```

b) `csrf.js` - A wrapper of [`csurf` middleware](https://github.com/expressjs/csurf) for Cross-Site Request Forgery (CSRF) prevention.

```js
// mount csrf, default to using cookie for storing
app.use(csrf(/* can provide options here */));

// make `csrfToken` accessible in view templates
app.use(csrf.toLocal());
```

c) `error-handler.js` - A custom middleware for handling thrown exception errors in both development and production environments.

```js
// mount the middleware last
app.use(errorHandler());

// JSON format will be returned when `req.xhr` is detected
// or, `json` property with `true` value is passed as option
app.use(errorHandler({ json: true }));
```

d) `logger.js` - A small custom logger which utilizes `morgan` middleware for http request logging and `fs.createWriteStream` for writing exception logs, respectively.

```js
// logs all http requests in development
// skip any status code lesser than 400 in production
app.use(logger.http());

// logs thrown exception errors
// used in `error-handler.js` middleware
logger.exception(err);
```

e) `proxy.js` - A wrapper of [`node-http-proxy`](https://github.com/nodejitsu/node-http-proxy) for the app.

```js
// mount the `proxy.proxyWeb` at the API path as middleware function
// any requests made to `/api/v1` will be proxied
app.use("/api/v1", proxy.proxyWeb);
```

**Redux Middlewares**

- By default, this starter comes with a custom Redux middleware - `service-alert.js` which resides in `./src/middlewares/redux` directory.

- `service-alert.js` is used in conjunction with `react-s-alert` package for alerting info/warning/success messages in application, based on the dispatched action types.

- Apart from the middleware itself, it's also exporting 3 action creators (`errorActionCreator`/`infoActionCreator`/`successActionCreator`) for creating alert action to be dispatched based on the context.

- Example of using middleware:

```js
import { serviceAlert } from "@middlewares/redux";

// mount the redux's service alert middleware
const middlewares = [serviceAlert, nextMiddleware];
const store = createStore(applyMiddleware(...middlewares));
```

- Example of using action creator of `service-alert.js` in `fetch`:

```js
...
import { errorActionCreator } from '@middlewares/redux';

function myAsyncAction() {
    return dispatch => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            // data fetched and given in json format
            // process and dispatch for success action
        })
        .catch(err => {
            // we dispatch error action by passing `err` to `errorActionCreator`
            // this will alert the error message once
            // the error action is dispatched and
            // fulfilled in the service alert middleware
            dispatch(errorActionCreator(err));
        });
    };
}
...
```

**[Back to top](#table-of-contents)**

## State Management with Redux
- Since this starter adheres feature-first architecture, we keep the redux related, such as `actions.js`/`reducers.js`/`types.js` within feature directory that resides in `./src/app/pages`. You are free to tweak and move around those files within the folder. [`Re-ducks`](https://github.com/alexnm/re-ducks) modular approach may interest you.

- Besides, this starter also comes with [`redux-thunk`](https://github.com/reduxjs/redux-thunk) and [`redux-thunk-init`](https://github.com/borisding/redux-thunk-init) (optional)  packages for handling asynchronous dispatch. The latter is basically a wrapper of redux-thunk to handle initial dispatch before subsequent dispatches, upon your creativity.


- By default, we decide initial fetch - `isFetching` property in state based on the `INIT_FULFILLED` action and `meta` object, without using typical `BEGIN/SUCCESS/FAILURE` actions approach. If you are not comfortable with that, feel free to fallback by using typical triplet actions as mentioned without using the wrapper.

- Redux's middleware registration and store creation can be found in `./src/app/store.js`. The app's state object is produced in `./src/app/root.js` via the `combineReducers` helper function.

**[Back to top](#table-of-contents)**

## Nodemon, HMR and React Hot Reloading
- When developing Node application, we usually need to restart server whenever changes are made to files. This starter uses [Nodemon](https://github.com/remy/nodemon) to auto-restart API server by watching over the file changes made in the detected directory.

- For React app, `webpack-dev-middleware` - the express-style middleware and `webpack-hot-middleware` are used to work with webpack in order to achieve hot module replacement in development environment. Most of the time, we have state in components that need to be retained, so `react-hot-loader` is also used to assure state is carried over when module get updated without losing it.

```js
// in `container.js`
...
if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextAppRoutes = require('./routes').default;
    render(nextAppRoutes);
  });
}
...
```

- Since HMR is assuring the latest bundle on client side, we also adopt `webpack-hot-server-middleware` to assure bundle changes also get reflected on the fly for server-side, without requiring a server restart.

**[Back to top](#table-of-contents)**

## Lint Checks and Formatting

- As you may have expected, this starter is using [ESLint](https://eslint.org/) for JavaScript and React components lint checks, as well as using [stylelint](https://stylelint.io/) to enforce conventions in SCSS based on configured rules.

- There are several rules have already been defined in `.eslintrc`. Feel free to add or remove any rules based on your project's context. For styles, you may define rules in `.stylelintrc`, which is extending `stylelint-config-sass-guidelines`, by default.

- Besides, this starter is also using ESLint plugins to work with [Prettier](https://prettier.io/) for opinionated code styles and formatting.

**[Back to top](#table-of-contents)**

## Unit Testing

- This starter comes with [Jest](https://jestjs.io/) JavaScript testing framework and [Enzyme](http://airbnb.io/enzyme/) testing utility for React components.

- We keep each `tests` folders along with its own page to align with feature-first project structure. Jest will look up respective `tests` directories which has test files end in either `.spec.jsx?` or `.test.jsx?` for execution. (Please check out `jest` section in `package.json` for configuration.)

- Please read on [NPM scripts](#npm-scripts) section to learn more about running test scripts.

**[Back to top](#table-of-contents)**

## Deployment

The following are steps to deploy app to production on [Heroku](https://www.heroku.com/):

1.  Remove or comment out `PORT` variable from `.env` file (remember to remove `.env` from `.gitignore`)
2.  Login with your credentials via command: `heroku login`
3.  Create your app: `heroku create <your app name>`
4.  Commit local changes and push to Heroku: `git push heroku master`
5.  To visit deployed app: `heroku open`

> Node.js now installs `devDependencies` [by default](https://devcenter.heroku.com/changelog-items/1376) on Heroku.

**[Back to top](#table-of-contents)**

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/borisding/universsr/releases).

This project adheres to [Semantic Versioning](http://semver.org/).

**[Back to top](#table-of-contents)**

## License

[MIT](https://raw.githubusercontent.com/borisding/universsr/master/LICENSE)
