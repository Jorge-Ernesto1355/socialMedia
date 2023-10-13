const express = require("express");
const cors = require("cors");
const connectDB = require("./db/Connect");

const Auth = require("./auth/authUser.routes");
const UserRoute = require("./users/infrastructure/User.routes");
const PostRoute = require("./Post/infrastucture/PostRoute.routes");
const NotificationRoute = require("./notification/infrastructure/Notification.routes");
const ReactionRouter = require("./reaction/infratructure/Reaction.routes");
const CommentRouter = require("./comment/infrastructure/Comment.routes");
const ConversationRouter = require("./messages/infrastructure/Conversation.routes");
const MessageRouter = require("./messages/infrastructure/Message.routes");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";

    this.middlewares();
    this.router();
    this.DBconnection();
  }

  middlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "./src/upload",
      })
    );
    this.app.use(cookieParser());

    this.app.use(
      cors({
        origin: (origin, callback) => {
          const ACCEPTED_ORIGINS = ["http://localhost:3000"];

          if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
          }
          if (!origin) {
            return callback(null, true);
          }

          return callback(new Error("Not Allowed by CORS"));
        },
      })
    );
    this.app.use((err, req, res, next) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Error de validación", message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(404)
          .json({ error: "Recurso no encontrado", message: err.message });
      }

      return res
        .status(500)
        .json({ error: "Error interno del servidor", message: err.message });
    });
  }

  DBconnection() {
    connectDB();
  }

  router() {
    this.app.use("/api/v1/auth", Auth);
    this.app.use("/api/v1/users", UserRoute);
    this.app.use("/api/v1/post", PostRoute);
    this.app.use("/api/v1/notification", NotificationRoute);
    this.app.use("/api/v1/reaction", ReactionRouter);
    this.app.use("/api/v1/comment", CommentRouter);
    this.app.use("/api/v1/conversation", ConversationRouter);
    this.app.use("/api/v1/message", MessageRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("ejecutando en:", this.port);
    });
  }
}

module.exports = { Server };
