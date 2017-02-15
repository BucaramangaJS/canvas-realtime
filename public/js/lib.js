window.socketsLib = (function () {
  let isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
  let isDown = false
  let random = Math.random().toString(16).slice(2, 8)
  let roomColor = window.location.pathname.split('/')[2]

  function move (e, context, socket, canvas) {
    if (isDown) {
      let cursorPosition = getCursorPosition(e, canvas)

      var payload = {
        x: cursorPosition.x,
        y: cursorPosition.y,
        color: !roomColor ? `#${random}` : roomColor
      }

      draw(payload, context)

      socket.emit('pixel', payload)
    }
  }

  function draw (payload, context) {
    context.fillStyle = payload.color
    context.fillRect(payload.x, payload.y, 4, 4)
  }

  function changeIsDown (value) {
    isDown = value
  }

  function getCursorPosition (e, canvas) {
    let rect = canvas.getBoundingClientRect()
    let touches = e.changedTouches
    return {
      x: ((isMobile ? touches[0].pageX : e.clientX) - rect.left) / (rect.right - rect.left) * canvas.width,
      y: ((isMobile ? touches[0].pageY : e.clientY) - rect.top) / (rect.bottom - rect.top) * canvas.height
    }
  }

  return {
    isMobile,
    isDown,
    random,
    roomColor,
    move,
    draw,
    changeIsDown
  }
})()
