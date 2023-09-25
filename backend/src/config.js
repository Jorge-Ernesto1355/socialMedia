const express = require("express");
const cors = require("cors");
const connectDB = require("./db/Connect");

const Auth = require("./auth/authUser.routes");
const UserRoute = require("./users/infrastructure/User.routes");
const PostRoute = require("./Post/infrastucture/PostRoute.routes");
const fileUpload = require("express-fileupload");
const createRoles = require("../src/roles/application/createAllRoles");
const createFeelings = require("./Post/application/createPost/createFeelings");

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

    createFeelings();
    createRoles();
    this.app.use(cors({ origin: "*" }));
    this.app.use((err, req, res, next) => {
      if (!err) {
        return next();
      }

      res.status(500);
      res.send("500: Internal server error");
    });
  }

  DBconnection() {
    connectDB();
  }

  router() {
    this.app.use("/api/v1/auth", Auth);
    this.app.use("/api/v1/users", UserRoute);
    this.app.use("/api/v1/post", PostRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("ejecutando en:", this.port);
    });
  }
}

module.exports = { Server };
