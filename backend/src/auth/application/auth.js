const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../dotenv");

function sign(payload, isAccessToken) {
  return jwt.sign(
    payload,
    isAccessToken ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    { expiresIn: 3600 }
  );
}

const RefreshToken = (user) => {
  return sign({ user }, false);
};

const AccessToken = (user) => {
  return sign({ user }, true);
};

const encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (passwordBody, passwordCompare) => {
  return await bcrypt.compare(passwordBody, passwordCompare);
};

module.exports = {
  RefreshToken,
  AccessToken,
  encryptPassword,
  comparePassword,
};
