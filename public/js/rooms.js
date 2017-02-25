(function (io, socketsLib) {
  'use strict'
  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')
  let counter = document.querySelector('#counter')
  /*
   * Socket connection - rooms namespace
   */
  const socket = io.connect('/rooms', {query: `roomColor=${window.socketsLib.roomColor}`})

  /*
   * Events
   */
  socket.on('new pixel', (payload) => socketsLib.draw(payload, context))

  socket.on('connections', (payload) => socketsLib.connectionsHandler(payload, counter))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchstart' : 'mousedown'}`, () => (socketsLib.changeIsDown(true)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchend' : 'mouseup'}`, () => (socketsLib.changeIsDown(false)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchmove' : 'mousemove'}`, (e) => socketsLib.move(e, canvas, context, socket))

})(window.io, window.socketsLib)
