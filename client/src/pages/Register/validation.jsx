import validateContraseña from "../../utilities/ExpresionRegularContraseña";

export  const validations = (values)=>{
    const errors = {};

            const { correo, nombre, contraseña } = values;

            // validacion de correo

            if (!correo) {
              errors.correo = "introduce un correo";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.correo,
              )
            ) {
              errors.correo =
                "el correo solo puede contener letras, numeros, puntos, guiones, guion bajo.";
            }

            // validacion de nombre

            if (!nombre) {
              errors.nombre = "introduce un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre)) {
              errors.nombre = "el nombre solo puede contener letras y esapcios";
            }
            if (!contraseña) {
              // validacion contraseña

              errors.contraseña = "introduce una contraseña";
            } else if (!validateContraseña(contraseña)) {
              errors.contraseña =
                "Minimo 8 ,caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minuscula, Al menos un dígito, No espacios en blanco,  Al menos 1 caracter especial";
            }

            // validacion de crup
            return errors;
}