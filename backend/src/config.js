const express = require("express");
const cors = require("cors");
const connectDB = require("./db/Connect");

const Auth = require("./auth/authUser.routes");
const UserRoute = require("./users/infrastructure/User.routes");
const PostRoute = require("./Post/infrastucture/PostRoute.routes");
const NotificationRoute = require("./notification/infrastructure/Notification.routes");
const ReactionRouter = require('./reaction/infratructure/Reaction.routes')
const CommentRouter = require('./comment/infrastructure/Comment.routes')
const fileUpload = require("express-fileupload");


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


    this.app.use(cors({ origin: "*" }));
    this.app.use((err, req, res, next) => {
      console.log(err);
      // Verificar el tipo de error y responder en consecuencia
      if (err.name === "ValidationError") {
        // Error de validación (por ejemplo, al crear un nuevo registro)
        return res
          .status(400)
          .json({ error: "Error de validación", message: err.message });
      }
      if (err.name === "CastError") {
        // Error de conversión de tipo (por ejemplo, al buscar un registro por un ID inválido)
        return res
          .status(404)
          .json({ error: "Recurso no encontrado", message: err.message });
      }
      // Otros tipos de errores

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
    this.app.use('/api/v1/reaction', ReactionRouter)
    this.app.use('/api/v1/comment', CommentRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("ejecutando en:", this.port);
    });
  }
}

module.exports = { Server };
