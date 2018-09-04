<h1 align="center">universsr</h1>


<p align="center">
<a href="https://github.com/borisding/universsr"><img src="https://img.shields.io/github/release/borisding/universsr.svg" alt="Release Version"></a>
<a href="https://travis-ci.org/borisding/universsr"><img src="https://travis-ci.org/borisding/universsr.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/universsr"><img src="https://david-dm.org/borisding/universsr/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/universsr?type=dev"><img src="https://david-dm.org/borisding/universsr/dev-status.svg" alt="Dev Dependencies"></a>
<a href="https://raw.githubusercontent.com/borisding/universsr/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Dev Dependencies"></a>
</p>


## Intro

In short, **universsr** is a server-rendered React app starter boilerplate for universal JavaScript web development.
It is also using Redux library for application state management and the back-end is powered by Node.js Express web framework.

> The name - "universsr" is combination of _universal_ and _SSR_ acronym.

P/S: If you're still new with the concept of Server-Side Rendering (SSR) front-end framework, then [this article](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4) is worth reading.


## Features

-  Server-rendered `react` 16 and powered by `express` framework.
-  Predictable state management and server-side's initial state with `redux` library.
-  Static route configuration with `react-router-config`.
-  Sass as extension of CSS and PostCSS for transforming styles with JS plugins.
-  Automatic mapping of CSS modules via `babel-plugin-react-css-modules`.
-  Webpack’s Hot Module Replacement (HMR) and `react-hot-loader` for both client & server.
-  Using `react-universal-component` for simultaneous SSR and code splitting.
-  Enforce convention and avoid errors with code linter and formatter. (`eslint`, `prettier`, `stylelint`)
-  Implement security good practices with Express `helmet` and `hpp` middlewares.
-  Combination of Babel and `webpack` enables writing next generation JavaScript and code optimization.
-  Using `webpack-bundle-analyzer` to visualize size of webpack output files.
-  Using `jest` and `enzyme` testing utilities for React components.
-  Progressive Web App (PWA) with webpack's `offline-plugin` and SEO ready.
-  Build API with node `http-proxy` integration.

## Quick Start

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

After script is executed, it will also create `config-properties.json` for universal configuration usage in application, which is exported in config's `index.js`

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

- Both scripts will run config script as mentioned above.
- Please check `package.json` file for other available scripts.

<br/>
<p align="center">
👉 <a href="https://github.com/borisding/universsr/tree/master/resources/DOCUMENT.md">CLICK HERE FOR MORE ABOUT THIS STARTER</a> 👈
</p>

## Changelog
All notable changes made to the project will be documented on [release page](https://github.com/borisding/universsr/releases).

This project adheres to [Semantic Versioning](http://semver.org/).

## License

[MIT](https://raw.githubusercontent.com/borisding/universsr/master/LICENSE)
