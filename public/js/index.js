(function (io, socketsLib) {
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
  socket.on('new pixel', (payload) => socketsLib.draw(payload, context, canvas))

  socket.on('connections', (payload) => socketsLib.connectionsHandler(payload, counter))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchstart' : 'mousedown'}`, () => (socketsLib.changeIsDown(true)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchend' : 'mouseup'}`, () => (socketsLib.changeIsDown(false)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchmove' : 'mousemove'}`, (e) => socketsLib.move(e, canvas, context, socket))

})(window.io, window.socketsLib)
