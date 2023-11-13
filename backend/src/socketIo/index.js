const { Server: SocketServer } = require("socket.io");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../dotenv");

module.exports = function socketIo(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.token;
    // Implementa la validación del token u otros datos
    try {
      const isValid = jwt.verify(token, ACCESS_TOKEN_SECRET);
      if (isValid) {
        return next();
      }
      return next(new Error("Autenticación fallida"));
    } catch (error) {
      return next(new Error("Something went wrong socket"));
    }
  });

  io.on("connection", function (socket) {
    console.log("socket");
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });

    socket.on("error", (error) => {
      console.error("Error en la conexión del usuario:", error);
      // Implementa lógica de manejo de errores en el servidor
    });
  });
};
