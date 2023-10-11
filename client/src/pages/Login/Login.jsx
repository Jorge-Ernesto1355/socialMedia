/* eslint-disable no-useless-computed-key */
/* eslint-disable dot-notation */
import "./login.css";

// librerias

import React, { useEffect } from "react";
// components


import Input from "../components/Input";
// emoticons

import { FaArrowLeft } from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { GiPadlock } from "react-icons/gi";

import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import Loader from "../../utilities/Loader";
import AuthProvider from "../../zustand/AuthProvider";
import { useStoreLogin } from "./useStoreLogin";
import { useNavigate } from "react-router-dom";


function Login() {

    const Auth = AuthProvider()
    const navigate = useNavigate()


    const { mutate, isLoading } = useMutation({
        mutationFn: AuthServices.Login,
        onSuccess: (data) => {
            const accessToken = data?.data?.accessToken || null
            const refreshToken = data?.data?.refreshToken || null
            if (accessToken && refreshToken) {
                Auth.saveUser({ accessToken, refreshToken })
            }
            navigate('/')
        },
        onError: (error) => {
            const messageError = error?.response?.data?.error ?? ''
            toast.error(messageError)
        }
    })

    const handleMutate = () => {
        mutate({
            email: store['email'],
            password: store['password']
        })
    }
    const [store, setStore] = useStoreLogin()

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setStore({
            ...store,
            [name]: value

        })
    }

    useEffect(() => {
        localStorage.setItem('persits', Auth.persits)
    }, [Auth.persits])





    return (
        <div className="cuadro1">
            <ToastContainer />
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
                        name="email"

                        inputValue={store['email']}
                        handleChange={handleInputChange}

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
                        name="password"
                        type="password"
                        inputValue={store['password']}
                        handleChange={handleInputChange}
                    >
                        <div className="icon">
                            <GiPadlock />
                        </div>
                    </Input>
                </div>
                <div>
                    <input type="checkbox" id="persits" onChange={(e) => Auth.setPersits(!Auth.persits)} checked={(Auth.persits === 'true')} />
                    <label htmlFor="persits">Guardar sesion</label>

                </div>

                <div>
                    <button className="submit" type="submit">
                        {isLoading ? <Loader /> : <h2 className="register" onClick={() => handleMutate()}>login</h2>}

                    </button>
                </div>

                <span className="recuperar">recuperar contraseña</span>
            </div>
        </div>
    );
}

export default Login;
