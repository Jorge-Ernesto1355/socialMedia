const { Server } = require("socket.io")

module.exports =  function socketIo(server) {
  const io = new Server(server);
  io.on("connection", function (socket) {
    console.log(socket.id);
    console.log("Made socket connection");
  });
}