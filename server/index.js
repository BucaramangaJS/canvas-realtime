'use strict'

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

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
  socket.on('pixel', (payload) => {
    console.log(socket.id) // For users counter
    socket.broadcast.emit('new pixel', payload)
  })
})

// Socket Rooms
io.of('/rooms').on('connection', (socket) => {
  let {roomColor} = socket.handshake.query

  if (roomColor) socket.join(`${roomColor}`)

  socket.on('pixel', (payload) => {
    console.log(socket.id.slice(7)) // For users counter
    socket.broadcast.to(`${roomColor}`).emit('new pixel', payload)
  })
})

server.listen(5000)
