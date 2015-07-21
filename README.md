# soxx

The missing microlib for websocket communication in the modern web browser. Provides connecting, disconnecting, eventing and listening. Not much else.

## Scope

In the interest of size and speed, the scope of this library extends to **modern broswers only**. Compatibility with older browsers that do not support websockets is not the aim or goal of this lib.

## Installation

To install Soxx, you first need to get the lib either from the [releases page]() or via NPM:

```bash
npm install soxx
```

Then, you can either include `lib/soxx.js` file in your html file as such:

```html
<script src='path/to/soxx.js'></script>
```

or you can include it via broswerify:

```js
var Soxx = require('soxx')
```

## API

### Instatiation via `connect()`

To start a connection, you need to instatiate the lib:

```js
var opts = {
  protocol:'ws',
  hostname:'echo.websocket.org',
  path:'/?encoding=text'
}
var socket = Soxx.connect(opts)
```

Once instantiated, you can assign listeners, and fire events back to the server.

### Communication with server

This library implements a very simple eventing system. All data passed into `emit()` is added to an object with `event` and `data` defined. After being added, it is passed through `JSON.stringify()` and sent to the server. Data recieved back from the server is expected in the same format.

Example:

```json
{
  "event": "CoolEvent",
  "data": { "foo": "bar" }
}
```

You can bypass these settings by setting them in the opts object during instantiation. Be aware, if you set a new `onmessage` that some functionality described below may break.

### Listeners via `on()`

To assign a listener to an event:

```js
socket.on('CoolEvent', function(data){
  console.log('event fired!', data)
})
```

*Note: only one function can be assigned per event right now. Will expand this later*

To unassign, simply run `off()`

```js
socket.off('CoolEvent')
```

### Fire events via `emit()`

To fire events back to the server:

```js
var dataToSend = {foo:'bar'}
socket.emit('CoolEvent', dataToSend, function(){
  console.log('emit callback')
})
```

### Verbose Mode

To have more granular info about your events, set the `verbose` flag to `true` in `opts` on instantiation.

## Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep A Changelog](http://keepachangelog.com/).

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

