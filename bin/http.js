"use strict"

const app = require("../app.js")
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

io.on('connect',(socket)=>{
  console.log('A user has been connected')

  socket.on('afterUpdate',()=>{
      socket.broadcast.emit('latestUpdate')
  })

  socket.on('leave',()=>{
    console.log('Disconnected')
    socket.disconnect()
  })
})

server.listen(port, ()=>{console.log(`E-commerce running at port:${port}`)})
