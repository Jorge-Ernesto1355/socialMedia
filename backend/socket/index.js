const  express =  require('express') 
const  http =  require('http') 
const  {Server : SocketServer} =  require('socket.io') 

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors:{
        origin:'http://localhost:3000'
    }
}) 

io.on('connection', (socket)=>{
    console.log('si')
    console.log(socket.id)
})

server.listen(3002, () => {
    console.log("ejecutando en:", 3002);
  }).on("error", (err) => {
    console.error("Server error:", err);
    // Restart the server here
  });