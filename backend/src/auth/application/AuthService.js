const { encryptPassword, comparePassword } = require("./auth");
const exits = require("../../libs/exits");
const isValidObjectId = require("../../libs/isValidObjectId");
const UserModel = require("../../users/domain/UserModel");
const { REFRESH_TOKEN_SECRET } = require("../../dotenv");
const jwt = require("jsonwebtoken");
const TokenModel = require("../../users/domain/TokenModel");

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

      await user.save();

      const accessToken = user.createAccessToken();

      const refreshToken = await user.createRefreshToken();

      return { user, accessToken, refreshToken };
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
      const emailExits = await isValidObjectId({ email }, "User");

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
      const { id } = verifyRefresh;

      const user = await isValidObjectId({ userId: id }, "User");
      const accessToken = user.createAccessToken();

      return accessToken;
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
    } catch (error) {}
  }
};
