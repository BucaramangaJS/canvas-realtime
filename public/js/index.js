(function (io) {
  'use strict'
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  /*
   * Socket connection - default namespace
   */
  const socket = io.connect()

  socket.on('new pixel', (p) => window.socketsLib.draw(p, context, canvas))

  /*
   * Events
   */
  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchstart' : 'mousedown'}`, () => (window.socketsLib.changeIsDown(true)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchend' : 'mouseup'}`, () => (window.socketsLib.changeIsDown(false)))

  canvas.addEventListener(`${window.socketsLib.isMobile ? 'touchmove' : 'mousemove'}`, (e) => window.socketsLib.move(e, context, socket, canvas))
})(window.io)
