# ![soxx](/soxx-title-padding.png)

:zap: The missing microlib for websocket communication in the modern web browser. :cake:

Provides connecting, disconnecting, eventing, retrying and listening. Not much else.

## Scope

In the interest of size and speed, the scope of this library extends to **modern browsers only**. Compatibility with older browsers that do not support websockets is not the aim or goal of this lib.

## Installation

To install Soxx, you first need to get the lib either from the [releases page](https://github.com/therebelrobot/soxx/releases) or via NPM:

```bash
npm install soxx
```

Then, you can either include `dist/soxx.js` file in your html file as such:

```html
<script src='path/to/soxx.js'></script>
```

or you can include it via broswerify:

```js
var Soxx = require('soxx')
```

## API

### Create

To start a connection, you need to instatiate the lib:

```js
var opts = {
  url:'ws://sockb.in/'
}
var websocket = new Soxx(opts)
```

Once instantiated, you can connect, assign listeners, and fire events back to the server.

### Connect

```js
var opts = {
  url:'ws://sockb.in/',
  onOpen: function(event){
    // do something here
  }
}
var websocket = new Soxx(opts)
websocket.connect()
```

Once the lib establishes a connection with the websocket server, it will fire `onOpen` as specified.

### Disconnect

```js
var opts = {
  url:'ws://sockb.in/',
  onClose: function(event){
    // do something here
  }
}
var websocket = new Soxx(opts)
websocket.connect()
websocket.disconnect()
```

Once when you fire disconnect, it will fire `onClose` as specified.

### Write

```js
var opts = {
  url:'ws://sockb.in/'
}
var websocket = new Soxx(opts)
websocket.connect()
var message = 'Hello World!'
websocket.write(message)
```

***Note: `message` should only be a string.***

### Listen

```js
var opts = {
  url:'ws://sockb.in/',
  onMessage: function(message){
    // do something with the message
  }
}
var websocket = new Soxx(opts)
websocket.connect()
```

The message will come in as a raw string, you'll need to do parsing on it as you prefer.

### Error Handling & Retry

```
var opts = {
  url:'ws://sockb.in/',
  retry: {
    count: 5, // number of times to retry as a whole since instantiation
    delay: 1000 // time to wait before retrying connection
  },
  onRetry: function(){
    // do something (this is inline, don't do async here)
  },
  onError: function(eventt){
    // handle error the way you like
  }
}
var websocket = new Soxx(opts)
websocket.connect()
```
If the connection is dropped or if an error is sent, it will attempt to retry if there is a `retry` sub-object present.

## Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep A Changelog](http://keepachangelog.com/).


## [v2.0.0](https://github.com/therebelrobot/soxx/releases/v2.0.0) | 2016-04-29
*branch: [`release/v2.0.0`](https://github.com/therebelrobot/soxx/tree/release/v2.0.0)*

***REWRITE***

This version bump is a complete rewrite. New API, new internals, new everything. Because YOLO.


## [v1.1.0](https://github.com/therebelrobot/soxx/commit/67ff21410ab7d24194b6e70583ebd5a124f01d4c) | 2015-07-21
*branch: [`release/v1.1.0`](https://github.com/therebelrobot/soxx/tree/release/v1.1.0)*

| Type | Link | Description |
| ---- | ---- | ----------- |
| Added | [#4](https://github.com/therebelrobot/soxx/pull/4) | Added `off()` functionality |

## [v1.0.0](https://github.com/therebelrobot/soxx/commit/ba18c0c0dbf1dff7db920a458d6e2a2b1f59b801) | 2015-07-21
*branch: [`release/v1.0.0`](https://github.com/therebelrobot/soxx/tree/release/v1.0.0)*

| Type | Link | Description |
| ---- | ---- | ----------- |
| Added | [ba18c0c](https://github.com/therebelrobot/soxx/commit/ba18c0c0dbf1dff7db920a458d6e2a2b1f59b801) | Added initial files |


## License

[ISC](https://tldrlegal.com/license/-isc-license)

