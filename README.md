Build Instructions
====================

Inside the root folder, run:

To install module dependencies:

```
npm install
```

To serve app folder at [http://localhost:8120/](http://localhost:8120/)

```
node admin-app-server-http.js
```

Alternatively, you can use another web server to serve the `/app` folder. Build step above puts all the necessary files to run a standalone SPA.

Post Build
=================

The corresponding API endpoint should be set in `app/settings.js`:

```js
{
  apiEndpoint: 'http://demo1.identify3d.net:3000/'
}
```

Logo(s) can be found in `app/media/branding`.
