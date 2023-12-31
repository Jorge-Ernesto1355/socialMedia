function validateContraseña(contraseña) {
  const regexContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/;

  return regexContraseña.test(contraseña);
}

export default validateContraseña;
