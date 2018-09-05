## Folder Structure
(TODO)

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


- Amendments can be done under `_moduleAliases` in `package.json`. The aliases are used for both webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) and `module-alias` package

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
|`dev:app`|Start running app server in development environment (React changes is monitored by `webpack-hot-server-middleware` on server-side).|
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

## App Configuration
- All configuration related should be placed in `config` folder, which is under the `resources` directory.

- This starter relies on `dotenv` package to load environment variables from `.env` into Node's `process.env`. You should always define new environment variables in `.env`. By default, this starter comes with an example `.env.example` required for the app usage.

- When there are updates in `.env` file, we can run `config` script to load the changes into `process.env`. The NPM script will also generate `config-properties.json` file based on the defined environment variables. So, we should not amend any config properties to the `config-properties.json` directly, which should always be synced with `.env`

- To use the config properties in application, we can import the config entry file (`index.js`), which is cosisted of environment variables, system paths, etc. This is handy and to make sure everything is centralized for the usage of both server and client side.

```js
import config from '@config';
```

> You should never commit `.env` file to version control. Please [check out](https://www.npmjs.com/package/dotenv#faq) the FAQ section on `dotenv` page for more details.


## Styles and CSS Modules
(TODO)


## ESM and Webpack Bundling
(TODO)

## Middlewares and Utilities
(TODO)

## Deployment

Deploying to production on [Heroku](https://www.heroku.com/):

1.  Remove or comment out `PORT` variable from `.env` file (remember to remove `.env` from `.gitignore`)
2.  Login with your credentials via command: `heroku login`
3.  Create your app: `heroku create <your app name>`
4.  Commit local changes and push to Heroku: `git push heroku master`
5.  To visit deployed app: `heroku open`

> Node.js now installs `devDependencies` [by default](https://devcenter.heroku.com/changelog-items/1376) on Heroku.
