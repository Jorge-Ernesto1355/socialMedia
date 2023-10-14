const { encryptPassword, comparePassword } = require("./auth");
const exits = require("../../libs/exits");
const isValidObjectId = require("../../libs/isValidObjectId");
const UserModel = require("../../users/domain/UserModel");
const { REFRESH_TOKEN_SECRET } = require("../../dotenv");
const jwt = require("jsonwebtoken");
const { AlgoliaUsers } = require("../../algolia/algolia");
const formtatedUserToAlgolia = require("../utils/formtatedUserToAlgolia");

module.exports = class AuthService {
  static async Register(object) {
    try {
      exits(object);
      const { username, email, password } = object;

      const usernameValid = await isValidObjectId({ username }, "User");
      const emailValid = await isValidObjectId({ email }, "User");

      if (!usernameValid.error) throw new Error("username is already taken");

      if (!emailValid.error) throw new Error("email is aleady taken");

      const passwordEncryped = await encryptPassword(password);

      const user = new UserModel({
        username,
        email,
        password: passwordEncryped,
      });

      const userCreated = await user.save();

      const formatedUser = formtatedUserToAlgolia(userCreated);

      await AlgoliaUsers.saveObject(formatedUser, (err, result) => {
        if (err) {
          throw new Error(err.message);
        }
      });

      const accessToken = user.createAccessToken();

      const refreshToken = await user.createRefreshToken();

      return { user: userCreated, accessToken, refreshToken };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async login(object) {
    try {
      exits(object);
      const { email, password } = object;
      const options = {
        model: "User",
        select: ["password", "email", "username"],
      };
      const emailExits = await isValidObjectId({ email }, options);

      if (emailExits.error)
        throw new Error("email or password are not corrects");

      const correctPassword = await comparePassword(
        password,
        emailExits.password
      );

      if (!correctPassword)
        throw new Error("email or password are not corrects");

      const accessToken = emailExits.createAccessToken();

      const refreshToken = await emailExits.createRefreshToken();

      return { user: emailExits, accessToken, refreshToken };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async refresh(object) {
    try {
      exits(object);
      const { refreshToken } = object;

      const verifyRefresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

      const { user: userRefreshToken } = verifyRefresh;

      const options = {
        model: "User",
        select: ["password", "email", "username"],
      };

      const user = await isValidObjectId({ _id: userRefreshToken.id }, options);

      if (user?.error) {
        throw new Error(user.message);
      }

      const accessToken = user.createAccessToken();

      return { accessToken, userId: userRefreshToken.id };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async logOut(object) {
    try {
      exits(object);

      const { refreshToken } = object;

      const verifyRefresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const { id } = verifyRefresh;

      const user = await isValidObjectId({ userId: id }, "User");

      user.refreshToken = "";
      await user.save();
      return;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
};
