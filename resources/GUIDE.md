## Folder Structure
(TODO)

## Project Configuration

(TODO)

## NPM Scripts
(TODO)

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