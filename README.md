<h1>universsr</h1>

<p>
<a href="https://github.com/borisding/universsr"><img src="https://img.shields.io/github/release/borisding/universsr.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/universsr/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/universsr"><img src="https://travis-ci.org/borisding/universsr.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/universsr"><img src="https://david-dm.org/borisding/universsr/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/universsr?type=dev"><img src="https://david-dm.org/borisding/universsr/dev-status.svg" alt="Dev Dependencies"></a>
</p>

In short, **universsr** is a server-rendered React app starter boilerplate for universal JavaScript web development.
It also uses Redux library for application state management and the back-end is powered by Node.js Express web framework.

> ✨ The name - "universsr" is combination of _universal_ and _server-side rendering_ acronym.

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
- [Session, Redux State Management](#session-redux-state-management)
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
cp config/.env.example config/.env
```

> You may change environment variables to serve your app. Avoid using the same port for both development and production.

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
# run config script when `env-properties.json` is not available
npm run config

npm test
```

**[Back to top](#table-of-contents)**

## Directory Structure

Below is overview of project folder structure in this starter along with the short descriptions, respectively:

```
|--
    |-- .babelrc                        # default babel configuration object
    |-- package.json                    # lists required dependencies, scripts, config, etc
    |-- api.js                          # api entry to expose api server
    |-- app.js                          # app entry to expose app server
    |-- esm.js                          # ESM loader and module alias hook
        ...
    |-- bin                             # node server files of app and api
    |-- build                           # parent directory of scripts/webpack
    |   |-- scripts                     # build scripts for tooling purposes
    |   |-- webpack                     # webpack config for both client & server
    |   |-- serverRenderer.js           # built from `server.js` as server renderer for production
    |-- config                          # app level configuration (.env/syspath, etc)
    |-- logs                            # log files of the app
    |-- node_modules                    # installed dependencies of the app
    |-- public                          # production built assets (icons/images/views, etc)
    |-- resources                       # parent directory of resources (views/logs/fixtures, etc)
    |   |-- assets                      # parent directory of all assets
    |   |   |-- manifest.json           # manifest JSON file for web app
    |   |   |-- icons                   # source files of icon
    |   |   |-- images                  # source files of image
    |   |-- fixtures                    # fixture data for development
    |   |-- mocks                       # file & style mocks for jest
    |   |-- views                       # source files of view template
    |-- sessions                        # default directory for session file storage
    |-- src                             # parent directory of both api & app source code
        |-- api                         # parent directory of api source code
        |   |-- routers                 # respective Express routes for API
        |   |-- index.js                # api server index entry file
        |-- app                         # parent directory of app source code
        |   |-- client.js               # app rendering and webpack's client entry
        |   |-- configureStore.js       # redux middleware registration & store creation
        |   |-- index.js                # app server index entry file
        |   |-- offline.js              # offline plugin registration and event handlers
        |   |-- rootReducer.js          # root reducer creation for the app
        |   |-- routes.js               # static React routes configuration
        |   |-- server.js               # server renderer for app string & initial state
        |   |-- common                  # reusable React components & styles
        |   |   |-- components          # reusable React components for common usage
        |   |   |-- styles              # reusable CSS/SCSS for the app
        |   |-- pages                   # page components based on "modules"
        |       |-- Home                # `Home` page related (index.js/styles/tests, etc)
        |       |-- NotFound            # NotFound component for page (index.js/styles/tests, etc)
        |       |-- Root                # Root component for page layout (index.js/styles/tests, etc)
        |       |-- Todos               # `Todos` demo page related (index.js/styles/tests, etc)
        |       |-- index.js            # respective exported page components from entry
        |       |-- loadComponent.js    # dynamic import util to load page components
        |-- middlewares                 # all middlewares used for the app
        |   |-- express                 # middlewares for Express framework
        |   |-- redux                   # middlewares for Redux library
        |-- utils                       # utilities used for both client & server
```

This project structure is organized by having feature-first approach in mind. Thus, for any new features (the page), try to keep it as feature-based folder in `./src/app/pages`. Things in common such as common styles or components can be kept in `./src/app/common` directory.

**[Back to top](#table-of-contents)**

## Aliases for Modules

- There are some aliases in this starter can be used to `import` or `require` targeted modules instead of using lengthy relative paths.
- Here is a list of available aliases and description:

| Alias          | Description                                          |
| -------------- | ---------------------------------------------------- |
| `@root`        | The project's root directory                         |
| `@bin`         | The project's `bin` directory                        |
| `@build`       | The project's `build` directory                      |
| `@public`      | The project's built `public` directory in production |
| `@resources`   | The project's `resources` directory                  |
| `@assets`      | The `assets` subdirectory within `resources`         |
| `@config`      | The project's `config` directory                     |
| `@middlewares` | The `middlewares` subdirectory within `src`          |
| `@utils`       | The `utils` subdirectory within `src`                |
| `@api`         | The `api` subdirectory within `src`                  |
| `@app`         | The `app` subdirectory within `src`                  |
| `@common`      | The `common` subdirectory within `app`               |
| `@pages`       | The `pages` subdirectory within `app`                |

- Changes can be made under `_moduleAliases` property in `package.json`. These aliases are used for both webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) and `module-alias` package.

**[Back to top](#table-of-contents)**

## NPM Scripts

- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

| Script Name     | Description                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `config`        | Loads `.env` environment variables into `process.env`. Also, generate `env-properties.json` file for universal usage.                   |
| `clean`         | Remove `public` folder and respective built files.                                                                                      |
| `webpack`       | Running webpack build process.                                                                                                          |
| `build`         | Remove previous built files and build production ready files to be served. This will also run `config` script.                          |
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
| `test`          | Perform lint checks and then running tests.                                                                                             |
| `test:watch`    | Running tests with watch mode turned on.                                                                                                |
| `test:coverage` | Running tests with coverage report output.                                                                                              |

**[Back to top](#table-of-contents)**

## Project Configuration and Utilities

**Configuration**

- Project configuration should be placed in `./config` directory. By default, this starter comes with an example `.env.example` required for the app usage. Please rename the file to `.env` to serve your actual app configuration.

- This starter relies on `dotenv` package to load environment variables from `.env` into Node's `process.env`. You should always define new environment variables in `.env`.

- When environment values are changed, we can execute the following script to load new changes into `process.env`:

```bash
npm run config
```

- After script is executed, it will also create `env-properties.json` based on the defined environment variables for universal configuration usage in application. We should not amend directly any of the environment properties, which supposed to be synced with `.env`

- To use the environment properties, import file as follows:

```js
import { ENV } from "@config";

// print PORT value as configured in `.env`
console.log(ENV["PORT"]);
```

> You should never commit `.env` file to version control. Please [check out](https://www.npmjs.com/package/dotenv#faq) the FAQ section on `dotenv` page for more details.

- Besides `ENV` object, it also exposes `DEV`, `NODE`, `SYSPATH` respectively:

```js
import { DEV, NODE, SYSPATH } from "@config";

// check if we're in development environment
if (DEV) {
  console.log("We are in development environment.");
}

// check if it is on server side, the Node
if (NODE) {
  console.log("This is on server side.");
}

// print absolute path of `public` directory
// defined system paths can be found in `syspath.js`
console.log(SYSPATH["PUBLIC"]);
```

**Utilities**

- This starter also offers `print.js` and `service.js` utils that are placed in `./src/utils` directory for the usage of both client & server side.

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

- React routes can be found and defined in `.src/app/routes.js`, which is static route configuration helper provided by [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) package to work for React Router, eg:

```js
// in `routes.js`

...
{
    path: '/',
    exact: true,
    menu: 'Home',
    component: Home // `Home` component that can be loaded via `loadComponent` util
}
...
```

- You will find out [`react-universal-component`](https://github.com/faceyspacey/react-universal-component) is also being used for code splitting purpose. `loadComponent.js` is util file for serving that purpose:

```js
...

// example of dynamic import by mapping the folder name
export const Home = loadComponent('home');

// example of defining `foo` chunk name through
// webpack's magic comment for home component
// by passing a callback as argument which returns `import`
export const Home = loadComponent(() =>
  import(/* webpackChunkName: "foo" */ './home')
);

...
```

- `loadData` property in route is action function, (could be in array for multiple actions) which will be used for fetching initial data on server-side when particular route is matched and fulfilled. `menu` is just another property to serve menu's label or name.

```js
// in `server.js`

...
const branch = matchRoutes(routes, req.url);
const promises = branch.map(({ route, match }) => {
    const { loadData } = route;
    const { dispatch } = store;

    if (match && match.isExact && loadData) {
        if (Array.isArray(loadData)) {
            return Promise.all(
                loadData.map(action => dispatch(action(match, req)))
            );
        } else {
            return dispatch(loadData(match, req));
        }
    }

    return Promise.resolve(null);
});

return Promise.all(promises);
...
```

- `match` and `req` will be passed to invoked action creator. We may access and use that based on our needs.

- For API, we define modular routes by using `express.Router` class and keep it as individual file in `./src/api/routers` directory. Please refer to `todos.js` as example.

**[Back to top](#table-of-contents)**

## CSS, SCSS and CSS Modules

There are two main types of config for styles to work in this starter. Both are using [PostCSS](https://github.com/postcss/postcss) for post-processing CSS via JS plugins. (Note: PostCSS config can be found in `package.json` with `postcss` property.)

**Global CSS/SCSS**

- By default, the config of global styles rule `globalStylesRule` in `./build/webpack/common.js` recognizes `global.css` or `global.scss` file, which supposed to use CSS `@import` for external CSS stylesheets. (eg: [Bootstrap](https://getbootstrap.com/) or [Bulma](https://bulma.io/) CSS).

- Once we have global stylesheet ready, we can include it in the root component. The following is an example of using Bulma CSS framework for global usage:

a) Install Bulma package

```js
npm install bulma
```

b) Include `bulma.sass` file in `global.scss`

```css
@import "~bulma/bulma.sass";
```

> `~` above refers to the `node_modules` of current project.

c) Include `global.scss` in `index.js`, which resides in `Root` folder

```js
// in `index.js`

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
  <div className="message-body">Thanks for using universsr starter boilerplate.</div>
</article>
```

> You may consider to use [Bloomer](https://bloomer.js.org/) - a set of React components for Bulma to craft your UI components.

> ⚠️ If you got `@import is non-standard behaviour` warning message in `global.scss` when using `@import` CSS file, please read on the [discussion](https://github.com/sass/node-sass/issues/2362) here (TL;DR).

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

- This stater uses Babel 7 to transpile ES2015 and beyond syntax. Also, webpack 4 is used for module bundling workflow. All webpack configuration can be found in `./build/webpack`.

> Please note that stage presets (@babel/preset-stage-0, etc) [have been removed](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets) in Babel 7. Be sure new babel plugins are only installed based on your needs, if any.

- It is not uncommon to have two different bundles for universal app where one for client and another for server:

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

- We are not transpiling all server-side code since Node.js has already [supported](https://node.green/) most of the ES2015 syntax. `esm` package is used for `import` and `export` in those non-transpiled code. This keeps syntax consistent and also spares room for future ES Module transition in Node.

**[Back to top](#table-of-contents)**

## Express and Redux Middlewares

There are two categories of middleware in this starter:

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

c) `errorHandler.js` - A custom middleware for handling thrown exception errors in both development and production environments.

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

- By default, this starter comes with a custom Redux middleware - `serviceAlert.js` which resides in `./src/middlewares/redux` directory.

- `serviceAlert.js` is used in conjunction with `react-s-alert` package for flashing info/warning/success alert messages in application, based on the dispatched action types.

- Apart from the middleware itself, it's also exporting 3 action creators (`errorActionCreator`/`infoActionCreator`/`successActionCreator`) for creating alert action to be dispatched based on the context.

- Example of using middleware:

```js
import { serviceAlert } from "@middlewares/redux";

// mount the redux's service alert middleware
const middlewares = [serviceAlert, nextMiddleware];
const store = createStore(applyMiddleware(...middlewares));
```

- Example of using action creator of `serviceAlert.js` in `fetch`:

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

## Session, Redux State Management

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

- Since this starter adheres feature-first architecture, we keep the redux related, such as `actions.js`/`reducers.js`/`types.js` within feature directory that resides in `./src/app/pages`. You are free to tweak and move around those files within the folder.

- Besides, this starter also comes with [`redux-thunk`](https://github.com/reduxjs/redux-thunk) as default package for handling asynchronous dispatch. Please check out `Todos` demo page on the todos' redux state management and async action dispatches.

- Redux's middleware registration and store creation can be found in `./src/app/configureStore.js`. The app's state object is produced in `./src/app/rootReducer.js` via the `combineReducers` helper function.

```js
// in `configureStore.js`
...
const middlewares = [
    // register serivce action creators for dispatch
    // so it's accessible in respective thunk wrappers
    thunk.withExtraArgument({
        errorActionCreator,
        infoActionCreator,
        successActionCreator
    })
    ...
];
```

- The service alert action creators are assigned to thunk's extra arguments so that it's accessible in thunk function, without importing action creators over and over again for usage.

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

- Besides JavaScript, this starter also uses [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) in order to achieve HMR for changes made in CSS files/chunks, without going through full page reloading.

**[Back to top](#table-of-contents)**

## Lint Checks and Formatting

- This starter uses [ESLint](https://eslint.org/) for JavaScript and React components lint checks, as well as using [stylelint](https://stylelint.io/) to enforce conventions in SCSS based on configured rules. Both ESLint and Stylelint configs can be found in `package.json`.

- There are several ESLint rules have already been defined under `eslintConfig` property. Feel free to add or remove any rules based on your project's context. For styles, you may define rules under `stylelint` property, which is extending `stylelint-config-sass-guidelines`.

- Besides, [Prettier](https://prettier.io/) is also used for opinionated code styles and formatting.

**[Back to top](#table-of-contents)**

## Unit Testing

- This starter comes with [Jest](https://jestjs.io/) JavaScript testing framework and [Enzyme](http://airbnb.io/enzyme/) testing utility for React components.

- We keep each `tests` folders along with its own page to align with feature-first project structure. Jest will look up respective `tests` directories which has test files end in either `.spec.jsx?` or `.test.jsx?` for execution. (Please check out `jest` section in `package.json` for configuration.)

- Please read on [NPM scripts](#npm-scripts) section to learn more about running test scripts.

**[Back to top](#table-of-contents)**

## Deployment

- To deploy app to production on [Heroku](https://www.heroku.com/), you just remove or comment out `PORT` variable from `.env` file (remember to remove `.env` from `.gitignore`)

- For deployment steps, please check out [this guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs) and the [build behavior](https://devcenter.heroku.com/articles/nodejs-support#build-behavior) on Heroku.

**[Back to top](#table-of-contents)**

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/borisding/universsr/releases).

This project adheres to [Semantic Versioning](http://semver.org/).

**[Back to top](#table-of-contents)**

## License

[MIT](https://raw.githubusercontent.com/borisding/universsr/master/LICENSE)
