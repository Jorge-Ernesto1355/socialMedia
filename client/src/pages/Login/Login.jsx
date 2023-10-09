import "./login.css";

// librerias

import React from "react";
// components


import Input from "../components/Input";
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

                <div className="input">
                                <h3 className="text">correo</h3>
                                

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

                <span className="recuperar">recuperar contraseña</span>
            </div>
        </div>
    );
}

export default Login;
