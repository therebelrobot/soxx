const noop = function(){}

const Soxx = function Soxx (opts) {
  // Init
  const self = this
  if (!(self instanceof Soxx)) {
    return new Soxx(opts)
  }

  // opts check
  self._settings = opts
  if (self._settings.url.indexOf('http') > -1) {
    self._settings.url = self._settings.url.replace('http', 'ws')
  }
  self._settings.onOpen = self._settings.onOpen || noop
  self._settings.onClose = self._settings.onClose || noop
  self._settings.onRetry = self._settings.onRetry || noop
  self._settings.onMessage = self._settings.onMessage || noop
  self._settings.onError = self._settings.onError || noop

  // internals set
  self._socket = {}
  self._flags = {
    closing:false,
    retrying:false,
    retriesLeft:0
  }
  if(self._settings.retry){
    self._flags.retriesLeft = self._settings.retry.count || 0
    self._settings.retry.delay = self._settings.retry.delay || 1000
  }
  self._events = {}
  self._events.onOpen = function onOpenSoxx(e){
    if(!self._flags.retrying){
      self._settings.onOpen(e)
    }
    self._flags.retrying = false
  }
  self._events.onRetry = function onRetrySoxx(e){
    console.warn('Attempting reconnection...')
    if(self._flags.retriesLeft){
      self._flags.retrying = true
      self._flags.retries--
      self._settings.onRetry(e)
      self._events.retryTimeout = setTimeout(function(){
        self.connect()
      }, self._settings.retry.delay)
    }
    console.warn('Retries unsuccessful. Aborting.')
  }
  self._events.onClose = function onCloseSoxx(e){
    if(!self._flags.closing){
      console.error('Soxx error:')
      console.error('Socket closed prematurely.')
      if(self._settings.retry){
        return self._events.onRetry(e)
      }
    }
    self._flags.closing = false
    self._settings.onClose(e)
  }
  self._events.onMessage = function onMessageSoxx(e){
    self._settings.onMessage(e)
  }
  self._events.onError = function onErrorSoxx(e){
    console.error('Soxx error:')
    console.error(e)
    if(self._settings.retry){
      return self._events.onRetry(e)
    }
  }

  // Externals set
  self.connect = function connectSoxx(){
    self._socket = new WebSocket(self._settings.url)
    self._socket.onopen = self._events.onOpen
    self._socket.onclose = self._events.onClose
    self._socket.onmessage = self._events.onMessage
    self._socket.onerror = self._events.onError
  }
  self.disconnect = function disconnectSoxx(){
    self._flags.closing = true
    if(self._events.retryTimeout){
      clearTimeout(self._events.retryTimeout)
      self._events.retryTimeout = false
    }
    self._socket.close()
  }
  self.destroy = function destroySoxx(){
    self.disconnect()
    delete self._socket
    self._socket = {}
  }

  // make it all usable
  return self

}

module.exports = Soxx
