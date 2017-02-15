(function (io) {
  'use strict'
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  /*
   * Socket connection - rooms namespace
   */
  const socket = io.connect('/rooms', {query: `roomColor=${window.socketsLib.roomColor}`})

  socket.on('new pixel', (payload) => window.socketsLib.draw(payload, context))

  /*
   * Events
   */
  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchstart' : 'mousedown'}`, () => (window.socketsLib.changeIsDown(true)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchend' : 'mouseup'}`, () => (window.socketsLib.changeIsDown(false)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchmove' : 'mousemove'}`, (e) => window.socketsLib.move(e, context, socket, canvas))
})(window.io)
