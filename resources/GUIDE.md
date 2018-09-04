## Folder Structure
(TODO)

## Project Configuration

(TODO)

## NPM Scripts
- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

| Script Name |  Description  |
| ---------- | ------- |
| `config` |Loads environment variables from `.env` file into `process.env`. Also, generate `config-properties.json` file for universal usage.  |
| `clean` | Remove `public` folder and built files. |
|`build`| Clean previous built files and build production ready files to be served.|
|`build:analyze`|Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files. |
|`postinstall`|Run after package installed - which triggers `build` script in our context. Useful for production deployment, eg: deployment on heroku|
|`dev:app`|Start running app server in development environment (React changes is monitored with `webpack-hot-server-middleware` on server-side).|
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