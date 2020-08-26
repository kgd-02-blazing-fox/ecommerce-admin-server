const app = require('../app.js')

const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connect', function(socket){
  console.log('CLIENT CONNECTED');

  socket.on('newproduct', function(){
    socket.broadcast.emit('NewAddProducts')
  })

  socket.on('newEditproduct', function(payload){
    socket.broadcast.emit('NewEditProduct', payload)
  })

  socket.on('deleteingProduct', function(){
    socket.broadcast.emit('NewDeleteingProduct')
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>{
  console.log('ecommerce server is online in ' + PORT);
})