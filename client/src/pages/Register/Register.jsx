import "./register.css";

// librerias

import React from "react";

import { Formik, Form, ErrorMessage } from "formik";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cuadro from "../../components/cuadro/Cuadro";

import Input from "../components/Input";


import validateContraseña from "../../utilities/ExpresionRegularContraseña";


import AuthService from "../services/AuthServices";
import { useMutation } from "react-query";
import SpinnerLoader from "../../stylesComponents/spinnerLoader/SpinnerLoader";
import AuthProvider from "../../zustand/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {

  const Auth = AuthProvider()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: AuthService.Register,
    onSuccess: (data) => {
      const accessToken = data?.data?.accessToken || null
      const refreshToken = data?.data?.refreshToken || null
      if (accessToken && refreshToken) {
        Auth.saveUser({ accessToken, refreshToken })
        navigate('/')
      }

      
    },
    onError: (error) => {

      const messageError = error?.response?.data?.error ?? ''

      toast.error(messageError)
    }
  })


  return (
    <div className="cuadro1">
      <div className="login">
        <i />

        <h1 className="title">CBTA 81</h1>
        <div className="logocbta81">

        </div>
        <div className="icon-atras">
     
        </div>

        <div className="logo" />

        <Formik
          validate={(values) => {
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
          }}
          initialValues={{
            correo: "",
            nombre: "",
            contraseña: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            const { correo, nombre, contraseña } = values;

            mutate({
              email: correo,
              username: nombre,
              password: contraseña,
            }, {
              onSuccess: () => {
                resetForm()
              }
            });
          }}
        >
          {({ handleBlur, handleChange, errors, values }) => (
            <Form>
              <div className="input">
                <h3 className="text">correo</h3>
                <ErrorMessage
                  name="correo"
                  component={() => (
                    <Cuadro text={errors.correo} danger={"danger"} />
                  )}
                />

                <Input
                  placeholder="correo"
                  name="correo"
                  inputValue={values.correo}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                >
                  <div className="icon">
             
                  </div>
                </Input>
              </div>
              <div className="input">
                <h3 className="text">nombre</h3>

                <ErrorMessage
                  name="nombre"
                  component={() => (
                    <Cuadro text={errors.nombre} danger={"danger"} />
                  )}
                />

                <Input
                  placeholder="nombre"
                  name="nombre"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  inputValue={values.nombre}
                >
                  <div className="icon">
                
                  </div>
                </Input>
              </div>

              <div className="input">
                <h3 className="text">contraseña</h3>

                <ErrorMessage
                  name="contraseña"
                  component={() => (
                    <Cuadro text={errors.contraseña} danger={"danger"} />
                  )}
                />

                <Input
                  placeholder="contraseña"
                  name="contraseña"
                  type="password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  inputValue={values.contraseña}
                >
                  <div className="icon">
                 
                  </div>
                </Input>
              </div>
              <div>
                <button className="submit" type="submit">
                  {isLoading ? <SpinnerLoader /> : <h2 className="register">Register</h2>}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <span className="recuperar">recuperar contraseña</span>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

export default Register;
