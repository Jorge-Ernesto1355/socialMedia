const  User = require("../users/domain/UserModel")
const roles = require('../roles/application/roles')

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "The user already exists" });
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
   
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roles.includes(req.body.roles[i])) {
        return res.status(40).json({
          message: `Role ${req.body.roles[i]} no existe`,
        });
      }
    }
  }

  next();
};


module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };