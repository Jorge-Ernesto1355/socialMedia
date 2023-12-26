const { Server: SocketServer } = require("socket.io");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../dotenv");
const ConversationService = require("../messages/ConversationService");
const { validateConversation } = require("./validations");
const userService = require("../users/userService");
const UserModel = require("../users/domain/UserModel");
const MessageService = require("../messages/MessageService");

const isValidObjectId = require("../libs/isValidObjectId");
const Message = require("../messages/domain/Message");

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

    const usersConnected =
      (await userService.getUsersOnline({
        userId,
        limit: 999999,
        page: 1,
      })) ?? [];

    const userSocket = await userService.get({ userId });
    if (userSocket.error) return null;

    if (usersConnected?.error) return;

    usersConnected?.docs?.map((user) => {
      console.log(user.socketId, "--------socketId-------", user.username);
      io.to(user.socketId).emit("user-online", userSocket);
    });

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

    socket?.on("new-unRead-message", async ({ conversationId, to, userId }) => {
      const unReadMessages = await MessageService.unReadMessage({
        conversationId,
        userId,
      });

      if (unReadMessages?.error) return null;
      const toUser = await userService.get({ userId: to });
      if (toUser?.error) return null;

      io.to(toUser?.socketId).emit("new-unRead-message", {
        unRead: unReadMessages,
      });
    });

    socket?.on("readMessage", async ({ conversationId, to, userId }) => {
      const toUser = await userService.get({ userId: to });
      const fromUser = await userService.get({ userId: userId });

      if (toUser.error || fromUser.error) return null;

      const messagesUnRead = await Message.find({
        conversationId,
        $and: [{ to: userId }, { readBy: { $size: 0 } }],
      });

      const read = await MessageService.read({ conversationId, userId });

      if (read?.error) return null;

      const unReadMessages = await MessageService.unReadMessage({
        conversationId,
        userId,
      });

      io.to(fromUser?.socketId).emit("new-unRead-message", {
        unRead: unReadMessages.unRead - read.modifiedCount,
      });

      io.to(toUser?.socketId).emit("readedMessage", messagesUnRead);
    });

    socket?.on("joinRoom", async ({ to, room }) => {
      const toUser = await userService.get({ userId: to });
      if (toUser.error) return null;
      io.to(room).emit("userJoined", { userId: to, id: toUser.socketId });
      socket.join(room);
      io.to(toUser.socketId).emit("joinRoom", { to, room });
    });

    socket?.on("userCall", async (data) => {
      const { to, offer, from } = data;

      const fromUser = await userService.get({ userId: from });
      if (fromUser?.error) return null;

      io.to(to).emit("incomingCall", { from: fromUser.socketId, offer });
    });

    socket?.on("callAccepted", async (data) => {
      const { to, ans } = data;

      io.to(to).emit("callAccepted", { from: to, ans });
    });

    socket?.on("peerNegoNeeded", async (data) => {
      const { offer, to, from } = data;

      const fromUser = await userService.get({ userId: from });
      if (fromUser?.error) return null;
      io.to(to).emit("peerNegoNeeded", { from: fromUser?.socketId, offer });
    });

    socket?.on("peerNegoDone", async ({ to, ans, from }) => {
      const fromUser = await userService.get({ userId: from });
      if (fromUser?.error) return null;
      io.to(to).emit("peerNegoFinal", { from: from?.socketId, ans });
    });

    socket.on("disconnect", async () => {
      console.log("disconed");
      if (userId != null && Boolean(userId)) {
        const user = await userService.get({ userId });
        if (user.error) return null;
        await UserModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
          status: "Offline",
        });
      }

      const usersConnected =
        (await userService.getUsersOnline({
          userId,
          limit: 999999,
          page: 1,
        })) ?? [];

      const userSocket = await userService.get({ userId });
      if (userSocket.error) return null;

      if (usersConnected?.error) return;

      usersConnected?.docs?.map((user) => {
        console.log(user.socketId, "--------socketId-------", user.username);
        io.to(user.socketId).emit("user-disconect", userSocket);
      });
    });

    socket.on("error", (error) => {
      console.error("Error en la conexión del usuario:", error);
      // Implementa lógica de manejo de errores en el servidor
      socket.disconnect();
    });
  });
};
