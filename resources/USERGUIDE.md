## Directory Structure
- Below is a tree view of project folder structure in this starter, along with the short descriptions:

```
|-- 
    |-- .babelrc                   # default babel configuration object
    |-- .eslintrc                  # eslint configuration object
    |-- .stylelintrc               # stylelint configuration object
    |-- api.js                     # api entry
    |-- app.js                     # app entry
    |-- esm.js                     # ESM loader and module alias hook
        ...                            
    |-- bin                        # node server files of app/api
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

## Aliases for Modules
- There are some aliases in this starter can be used to `import` or `require` targeted modules instead of using relative paths.
- Here is a list of available aliases and description:

| Alias |  Description  |
| ---------- | ------- |
| `@root` | The project's root directory |
| `@bin` |  The project's `bin` directory|
| `@build` |  The project's `build` directory|
| `@public` |  The project's `public` directory|
| `@resources` | The project's `resources` directory |
| `@assets` |  The `assets` subdirectory within `resources`|
| `@config` | The `config` subdirectory within `resources` |
| `@middlewares` | The `middlewares` subdirectory within `src` |
| `@utils` | The `utils` subdirectory within `src` |
| `@api` | The `api` subdirectory within `src` |
| `@app` | The `app` subdirectory within `src` |
| `@common` | The `common` subdirectory within `app` |
| `@pages` | The `pages` subdirectory within `app` |


- Amendments can be done under `_moduleAliases` in `package.json`. The aliases are used for both webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) and `module-alias` package.

## NPM Scripts
- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

| Script Name |  Description  |
| ---------- | ------- |
| `config` |Loads `.env`  environment variables into `process.env`. Also, generate `config-properties.json` file for universal usage.  |
| `clean` | Remove `public` folder and built files. |
|`build`| Clean previous built files and build production ready files to be served. This will run `config` script as well.|
|`build:analyze`|Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files. |
|`postinstall`|Run after packages installed - which triggers `build` script in our context. Useful for production deployment, eg: deployment on heroku|
|`dev:app`|Start running app server in development environment (React changes are monitored by `webpack-hot-server-middleware` on server-side).|
|`dev:api`|Start running api server in development environment (started with `nodemon` for monitoring api changes).|
|`dev`|Clean existing built files before running BOTH app and api servers in development environment.|
|`start:app`|Start running app server in production environment.|
|`start:api`|Start running api server in production environment.|
|`start`|Start running BOTH app and api servers in production environment.|
|`lint`|Perform source code lint checks for JS, React and styles based on the ESLint config.|
|`lint:style`|Perform lint checks for Sass style.|
|`lint:js`|Perform lint checks for JS and React.|
|`precommit`|Git hooks via pre commit - which triggers lint checks.|
|`test`|Perform lint checks and then running tests.|
|`test:watch`|Running test with watch mode turned on.|
|`test:coverage`|Running test with coverage report output.|

## Project Configuration
- Project configuration should be placed in `config` folder, which is under the `resources` directory. By default, this starter comes with an example `.env.example` required for the app usage. Please rename the file to `.env` to serve your actual app configuration.

- This starter relies on `dotenv` package to load environment variables from `.env` into Node's `process.env`. You should always define new environment variables in `.env`.

- When there are changes in `.env` file, we can run `config` script to load the changes into `process.env`. The NPM script will also generate `config-properties.json` file based on the defined environment variables. We should not amend directly any of the config properties, which should always be synced with `.env`

- To use the config properties in application, we can import the config `index.js` entry, which is cosisted of "exported" environment variables, system paths, etc. This is handy and to make sure everything is centralized for the usage of both server and client side.

```js
import config from '@config';
```

> You should never commit `.env` file to version control. Please [check out](https://www.npmjs.com/package/dotenv#faq) the FAQ section on `dotenv` page for more details.


## CSS, SCSS and CSS Modules
- There are two main types of config for styles to work in this starter. Both are using [PostCSS](https://github.com/postcss/postcss) for post-processing CSS via JS plugins:

**Global CSS/SCSS**

- By default, the config of global styles rule `globalStylesRule` in `./build/webpack/common.js` recognizes `global.css` or `global.scss` file, which supposed to use CSS `@import` for external CSS stylesheets. (eg: [Bootstrap](https://getbootstrap.com/) or [Bulma](https://bulma.io/) CSS).

- Once we have global stylesheet ready, we can import it in the root component, which is `Layout` component in our context. The following is an example of using Bulma CSS framework for global usage:

a) Install Bulma package
```js
npm install bulma
```

b) CSS `@import` Bulma CSS in `global.css`
```css
@import '~bulma/css/bulma.css';
```
> `~ ` above refers to the `node_modules` of current project.

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
        <p>Hello World</p>
        <button className="delete" aria-label="delete" />
    </div>
    <div className="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
        nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
        purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac
        <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
        sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna
        a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
    </div>
</article>
```
> If you are using Bulma, can consider [Bloomer](https://bloomer.js.org/) - a set of React components for Bulma.

> If you got `@import is non-standard behaviour` warning message in `global.scss` when using `@import` in SCSS file, please read on the [discussion](https://github.com/sass/node-sass/issues/2362) here (TL;DR).


**CSS Modules**
- This starter also enables [CSS Modules](https://github.com/css-modules/css-modules) implementation apart from allowing to use global CSS as mentioned. It utilizes `babel-plugin-react-css-modules` instead of `react-css-modules` hook to transform `styleName` to `className` using compile time.

- This allows us to distinguish the usage in between global CSS and CSS Modules, as well as better performance via babel plugin. Please check out [more details here](https://github.com/gajus/babel-plugin-react-css-modules)  on how it works and the differences.

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

## Babel, Webpack and ESM Loader
- This stater is using Babel 7 to transpile ES2015 and beyond syntax. Also, webpack 4 is used for module bundling workflow. All webpack configuration can be found in `webpack` under `build` directory.

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

## Express & Redux Middlewares
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
app.use(csrf.toLocal())
```

c) `error-handler.js` - A custom middleware for handling thrown exception errors in both development and production environments.
```js
// mount the middleware last
app.use(errorHandler());

// JSON format will be returned when `req.xhr` is available  
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
app.use('/api/v1', proxy.proxyWeb);
```
**Redux Middlewares**

- By default, this starter comes with a custom Redux middleware - `service-alert.js` which resides in `./src/middlewares/redux` directory.

- `service-alert.js` is used in conjunction with `react-s-alert` package for alerting info/warning/success messages in application, based on the dispatched action types.

- Apart from the middleware itself, it's also exporting 3 action creators (`errorActionCreator`/`infoActionCreator`/`successActionCreator`) for creating alert action to be dispatched based on the context.

- Example of using middleware:
```js
import { serviceAlert } from '@middlewares/redux';

// mount the redux's service alert middleware
const middlewares = [serviceAlert, nextMiddleware, anotherMiddleware];
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


## App Utilities
- This starter provides `print.js` and `service.js` utils that are placed in `./src/utils` directory for the usage of both client & server side.

- `print.js` is a simple util for console logging message with color, based on the log types. eg:

-  `print.[error|info|warn|success](message, code)`, example:
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

## Deployment

Deploying to production on [Heroku](https://www.heroku.com/):

1.  Remove or comment out `PORT` variable from `.env` file (remember to remove `.env` from `.gitignore`)
2.  Login with your credentials via command: `heroku login`
3.  Create your app: `heroku create <your app name>`
4.  Commit local changes and push to Heroku: `git push heroku master`
5.  To visit deployed app: `heroku open`

> Node.js now installs `devDependencies` [by default](https://devcenter.heroku.com/changelog-items/1376) on Heroku.
