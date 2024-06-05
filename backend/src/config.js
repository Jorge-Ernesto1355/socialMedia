const express = require("express");
const cors = require("cors");
const connectDB = require("./db/Connect");
const http = require("http");
const socketIo = require("./socketIo");
const Auth = require("./auth/authUser.routes");
const UserRoute = require("./users/infrastructure/User.routes");
const PostRoute = require("./Post/infrastucture/PostRoute.routes");
const NotificationRoute = require("./notification/infrastructure/Notification.routes");
const ReactionRouter = require("./reaction/infratructure/Reaction.routes");
const CommentRouter = require("./comment/infrastructure/Comment.routes");
const ConversationRouter = require("./messages/infrastructure/Conversation.routes");
const MessageRouter = require("./messages/infrastructure/Message.routes");
const StoryRouter = require("./story/infrastructure/Story.routes.js")
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.ACCEPTED_ORIGINS = ["http://localhost:3000"];
    this.middlewares();
    this.router();
    this.DBconnection();
    this.socketIo();
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
          if (this.ACCEPTED_ORIGINS.includes(origin)) {
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
    const maxRetries = 3;
    let retries = 0;

    const connect = () => {
      connectDB()
        .then(() => {
          console.log("Connected to the database");
        })
        .catch((error) => {
          console.error("Failed to connect to the database:", error);
          retries++;
          if (retries <= maxRetries) {
            console.log(`Retrying connection (${retries}/${maxRetries})...`);
            setTimeout(connect, 5000); // Retry after 5 seconds
          } else {
            console.error(
              `Max connection retries (${maxRetries}) reached. Exiting...`
            );
            process.exit(1); // Exit the server process
          }
        });
    };

    connect();
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
    this.app.use("/api/v1/story", StoryRouter);
  }

  socketIo() {
    const server = http.createServer(this.app);
    socketIo(server);
    server
      .listen(3002, () => {
        console.log("ejecutando en:", 3002);
      })
      .on("error", (err) => {
        console.error("Server error:", err);
        // Restart the server here
      });
  }

  listen(portParams) {
    const port = portParams ? portParams : this.port;
    this.app
      .listen(port, () => {
        console.log("ejecutando en:", port);
      })
      .on("error", (err) => {
        console.error("Server error:", err);
        // Restart the server here
      });
  }
}

module.exports = { Server };
