import "./login.css";

// librerias

import React from "react";

import { Formik, Form, ErrorMessage } from "formik";



// components

import Cuadro from "../../components/cuadro/Cuadro";

import Input from "../components/Input";


import validateContraseña from "../../utilities/ExpresionRegularContraseña";


// emoticons

import { FaArrowLeft } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { GiPadlock } from "react-icons/gi";

import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import Loader from "../../utilities/Loader";
import AuthProvider from "../../zustand/AuthProvider";


function Login() {

    const Auth = AuthProvider()

    const { mutate, isLoading } = useMutation({
        mutationFn: AuthServices.Login,
        onSuccess: (data) => {
            const accessToken = data?.data?.accessToken || null
            const refreshToken = data?.data?.refreshToken || null
            if (accessToken && refreshToken) {
                Auth.saveUser({ accessToken, refreshToken })
            }
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
                    <FaArrowLeft />
                </div>

                <div className="logo" />

                <Formik
                    validate={(values) => {
                        const errors = {};

                        const { correo, contraseña } = values;

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


                        if (!contraseña) {
                            // validacion contraseña

                            errors.contraseña = "introduce una contraseña";
                        } else if (!validateContraseña(contraseña)) {
                            errors.contraseña =
                                "Minimo 8 caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minuscula, Al menos un dígito, No espacios en blanco,  Al menos 1 caracter especial";
                        }

                        // validacion de crup
                        return errors;
                    }}
                    initialValues={{
                        correo: "",

                        contraseña: "",
                    }}
                    onSubmit={async (values, { resetForm }) => {
                        const { correo, contraseña } = values;

                        mutate({
                            email: correo,
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
                                        <MdEmail />
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
                                        <GiPadlock />
                                    </div>
                                </Input>
                            </div>

                            <div>
                                <button className="submit" type="submit">
                                    {isLoading ? <Loader /> : <h2 className="register">login</h2>}

                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <span className="recuperar">recuperar contraseña</span>
            </div>
        </div>
    );
}

export default Login;
