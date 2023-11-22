const { Server: SocketServer } = require("socket.io");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../dotenv");
const ConversationService = require("../messages/ConversationService");
const { validateConversation } = require("./validations");
const userService = require("../users/userService");
const UserModel = require("../users/domain/UserModel");
const MessageService = require("../messages/MessageService");
const isValidObjectId = require("../libs/isValidObjectId");

module.exports = function socketIo(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    try {
      if (token != null && Boolean(token)) {
        const isValid = jwt.verify(token, ACCESS_TOKEN_SECRET);
        if (isValid) {
          return next();
        }
      }

      return next(new Error("Autenticación fallida"));
    } catch (error) {
      return next(new Error("Something went wrong socket"));
    }
  });

  io.on("connection", async function (socket) {
    const userId = socket.handshake.query.userId;
    console.log(
      "socket connected ---- ",
      "userId",
      userId,
      "socketId",
      socket.id
    );
    if (userId != null && Boolean(userId)) {
      const user = await userService.get({ userId });
      if (user.error) return null;
      await UserModel.findByIdAndUpdate(userId, {
        socketId: socket.id,
        status: "Online",
      });
    }

    socket.on("open-conversation", async (data) => {
      const { to, from } = data;

      const result = validateConversation({ from, to });

      const toUser = await userService.get({ userId: to });
      const fromUser = await userService.get({ userId: from });

      if (toUser.error || fromUser.error) return null;

      if (result.error) return null;

      const conversation = await ConversationService.conversation({ to, from });

      if (conversation.error) return null;

      io.to(fromUser.socketId).emit("open-conversation", conversation);
    });

    socket.on("new-message", async (data) => {
      const { from, to, messageId } = data;

      const toUser = await userService.get({ userId: to });
      const fromUser = await userService.get({ userId: from });

      if (toUser.error || fromUser.error) return null;

      const message = await isValidObjectId(
        { _id: messageId },
        { model: "Message" }
      );

      if (message.error) return null;

      io.to(toUser.socketId).emit("new-message", message);
    });

    socket.on("block-conversation", async ({ block, to }) => {
      const toUser = await userService.get({ userId: to });
      if (toUser.error) return null;
      io.to(toUser.socketId).emit("block-conversation", { block });
    });

    socket.on("disconnect", () => {});

    socket.on("error", (error) => {
      console.error("Error en la conexión del usuario:", error);
      // Implementa lógica de manejo de errores en el servidor
      socket.disconnect();
    });
  });
};
