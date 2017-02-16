(function (io) {
  'use strict'
  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')
  let counter = document.querySelector('#counter')
  /*
   * Socket connection - default namespace
   */
  const socket = io.connect()

  /*
   * Events
   */
  socket.on('new pixel', (payload) => window.socketsLib.draw(payload, context, canvas))

  socket.on('connections', (payload) => window.socketsLib.connectionsHandler(payload, counter))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchstart' : 'mousedown'}`, () => (window.socketsLib.changeIsDown(true)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchend' : 'mouseup'}`, () => (window.socketsLib.changeIsDown(false)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchmove' : 'mousemove'}`, (e) => window.socketsLib.move(e, context, socket, canvas))
})(window.io)
