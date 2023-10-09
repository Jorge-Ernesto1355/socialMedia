const z = require("zod");



const UserSchemaRegister = z.object({
  username: z.string({
    required_error:"username is required"
  }).nonempty().min(5).max(15),
  email: z.string({
    required_error:'email is required'
  }).nonempty(), 
  password: z.string({
    required_error:'password is required'
  }).nonempty().min(6).max(15),
});

const UserSchemaLogin = z.object({
  email: z.string({
    required_error:'email is required'
  }).nonempty(), 
  password: z.string({
    required_error:'password is required'
  }).nonempty().min(6).max(15),
});

function validateUserRegister(object) {
  return UserSchemaRegister.safeParse(object);
}

function validateUserLogin(object) {
  return UserSchemaLogin.safeParse(object);
}

module.exports = { validateUserRegister, validateUserLogin};
