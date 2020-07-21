## Quick Start

[![Greenkeeper badge](https://asmfadholi.github.io/#/)](https://asmfadholi.github.io/#/)

```bash
cp .env-example .env 
npm install

npm run serve
```

Then open http://localhost:5000/ to see your app. Your console should look like this:

<img src="https://raw.githubusercontent.com/asmfadholi/assets/master/assets/Screen%20Shot%202020-07-22%20at%2001.55.57.png" width="500px" alt="Razzle Development Mode"/>

---

Below is a list of commands you will probably find useful.

### `npm run build` or `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run start:prod` or `yarn start:prod`

Runs the compiled app in production.

You can again view your application at `http://localhost:5000`

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `npm run lint`

Runs the eslint and give you information about all lint error on the terminal
Eslint only investigate file *.js in folder of `src/`
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Adding Environment Variables In `.env`

To define permanent environment variables, create a file called .env in the root of your project:

```
RAZZLE_RUNTIME_BASE_URL= http://universities.hipolabs.com/
RAZZLE_RUNTIME_PUBLIC_URL= /
NODE_ENV= development

PORT=5000
```

---

MIT License

