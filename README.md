# \<toothfairy\>

Application for designing specific modification 3D model.

## Server

Features:

* Handle frontend file upload.

### Install npm dependecies

```
$ npm install
```

### Start the server

```
$ npm start
```

## Frontend

Features:

* Upload ASCII STL models to the server.
* Display ASCII STL model for design
* Scene debugging

### Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

### Install bower modules

```
$ bower install
```

### Viewing Your Application

```
$ polymer serve
```

### Building Your Application

```
$ polymer build
```

This will create a `build/` folder with `bundled/` and `unbundled/` sub-folders
containing a bundled (Vulcanized) and unbundled builds, both run through HTML,
CSS, and JS optimizers.

You can serve the built versions by giving `polymer serve` a folder to serve
from:

```
$ polymer serve build/bundled
```

### Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
