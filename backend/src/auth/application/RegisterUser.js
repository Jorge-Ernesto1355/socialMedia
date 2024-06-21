const AuthService = require("./AuthService");
const { validateUserRegister } = require("../../users/validation/userSchema");

const RegisteryUser = async (req, res) => {
  const { username, email, password, geometry} = req.body;

  const result = validateUserRegister({ username, email, password });

  if (result.error) {
    return res.status(400).json({ error: result.message });
  }

  const user = await AuthService.Register({ username, email, password, geometry});

  if (user?.error) {
    return res.status(500).json({ error: user.message });
  }

  return res.status(201).json(user);
};

module.exports = RegisteryUser;
