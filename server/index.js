'use strict'

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

let connections = {
  index: 0,
  red: 0,
  green: 0
}

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => res.render('index', {title: 'Canvas'}))

app.get('/rooms/:room', (req, res) => {
  let {room} = req.params

  if (!(room === 'green' || room === 'red')) {
    return res.redirect('/')
  }

  res.render('rooms', {title: room})
})

// Socket Index
io.on('connection', (socket) => {
  let {roomColor} = socket.handshake.query

  if (!roomColor) {
    connections.index++
    socket.emit('connections', connections.index)
    socket.broadcast.emit('connections', connections.index)
  }

  socket.on('pixel', (payload) => {
    socket.broadcast.emit('new pixel', payload)
  })

  socket.on('disconnect', (a) => {
    if (!roomColor) {
      connections.index--
      socket.emit('connections', connections.index)
      socket.broadcast.emit('connections', connections.index)
    }
  })
})

// Socket Rooms
io.of('/rooms').on('connection', (socket) => {
  // console.log(socket.id.slice(7))

  let {roomColor} = socket.handshake.query

  if (roomColor) {
    socket.join(roomColor)
    connections[roomColor]++
    socket.emit('connections', connections[roomColor])
    socket.broadcast.to(`${roomColor}`).emit('connections', connections[roomColor])
  }

  socket.on('pixel', (payload) => {
    socket.broadcast.to(`${roomColor}`).emit('new pixel', payload)
  })

  socket.on('disconnect', () => {
    connections[roomColor]--
    socket.emit('connections', connections[roomColor])
    socket.broadcast.to(`${roomColor}`).emit('connections', connections[roomColor])
  })
})

server.listen(5000)
