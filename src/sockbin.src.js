
var SockBin
module.exports = SockBin = {
  open: _openConnection,
  _close: _closeConnection,
  _emit: _emit,
  _on: _on,
  _onFunctions: {},
  _emitFunctions: {},
  _options: {},
  _returnObject: {},
  _socket: {}
}

function _openConnection(opts){
  opts = opts || {}

  var options = {}
  options.protocol = 'ws'
  options.hostname = 'echo.websocket.org'
  options.path = '/?encoding=text'
  options.port = 80

  for(i in opts){
    options[i] = opts[i]
  }
  options.url = options.url || options.protocol+'://'+options.hostname+':'+options.port+options.path
  SockBin._options = options
  SockBin._socket = new WebSocket(options.url)
  SockBin._socket.onopen = options.onopen || _onOpen
  SockBin._socket.onclose = options.onclose || _onClose
  SockBin._socket.onmessage = options.onmessage || _onMessage
  SockBin._socket.onerror = options.onerror || _onError
  SockBin._returnObject = {
    socket:SockBin._socket
    close:_close
  }
  if(!options.onmessage){
    SockBin._returnObject.on = _on
    SockBin._returnObject.emit = _emit
  }
  return SockBin._returnObject
}

/** Exposed Functions */

function _close(cb){ // Exposed Function : SockBin.open(opts).close(cb)

  return SockBin._returnObject
}
function _emit(event, data, cb){ // Exposed Function : SockBin.open(opts).emit(cb)

  return SockBin._returnObject
}
function _on(event, cb){ // Exposed Function : SockBin.open(opts).on(cb)

  return SockBin._returnObject
}

/** Internal Functions */

function _closeConnection(cb){ // Internal Function: Close connection and run callback if present
  SockBin._socket.close()
  if(cb && typeof cb === 'function'){
    cb()
  }
}
function _onOpen(event){ // Internal Function: To run after connection is opened

}
function _onClose(event){ // Internal Function: To run after connection is closed

}
function _onMessage(event){ // Internal Function: Parse Event ID and run the corresponding _onFunctions function
  var message = event.data

}
function _onError(event){ // Internal Function: To run on socket error

}