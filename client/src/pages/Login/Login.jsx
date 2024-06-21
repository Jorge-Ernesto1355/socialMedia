/* eslint-disable no-useless-computed-key */
/* eslint-disable dot-notation */
import "./login.css";
import LoginImage from './icons/login-image.png'
import cometa from './icons/cometa.png'
import GoogleIcon from './icons/google.png'
import Spinner from '../../stylesComponents/spinnerLoader/SpinnerLoader'
// librerias

import React, { useEffect } from "react";
// components


import Input from "../components/Input";


import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";

import AuthProvider from "../../zustand/AuthProvider";
import { useStoreLogin } from "./useStoreLogin";
import { Link, useNavigate } from "react-router-dom";
import useQueryLocation from "../../hooks/useQueryLocation";
import { useGeoLocations } from "../../hooks/GeoLocation/useGeoLocations";


function Login() {
    
    const Auth = AuthProvider()
    const navigate = useNavigate()
   


    const { mutate, isLoading, isError } = useMutation({
        mutationFn: AuthServices.Login,
        onSuccess: (data) => {
            const accessToken = data?.data?.accessToken || null
            const refreshToken = data?.data?.refreshToken || null
            const userId = data?.data?.user?._id

            if (accessToken && refreshToken && userId) {
                Auth.saveUser({ accessToken, refreshToken, userId })
                navigate('/')
            }
        },
       
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
        <div className="login">
        <img src={LoginImage} alt="" />
        
        <div className="login-container">
            <img className="login-icon" src={cometa} alt="" />
            <h1 className="login-title">Welcome back!</h1>
            <p className="login-description">Please enter your details</p>
                <Input
                    name="email"
                    id='Correo'
                    inputValue={store['email']}
                    handleChange={handleInputChange}
                  
                />
             

                <Input
                    isError={isError}
                    placeholder="contraseña"
                    id='Password'
                    name="password"
                    type="password"
                    inputValue={store['password']}
                    handleChange={handleInputChange}
                    
                />
               
            <div className="login-remember">
           <div className="save-session-container">
           <input type="checkbox" id="persits" onChange={(e) => Auth.setPersits(!Auth.persits)} checked={Boolean(Auth.persits)} />
                <label htmlFor="persits" className="save-session">Remember me</label>
           </div>
           <p className="forgot-password">Forgot Password?</p>
            </div>

            <div>
                <button className="login-submit-button" type="submit" onClick={()=> handleMutate()}>
                  {isLoading ? <Spinner/> : <> Log In</>}
                </button>
                <button className="login-submit-button-google" type="submit">
                    <img src={GoogleIcon} className="google-icon" alt="google" />  Log In with Google
                </button>
            </div>

            <span className="signUp-message">{"Don't"} have an account?  <span className="SignUp-link"><Link style={{color:'#000',}} to={'/signup'}>Sign Up</Link></span></span>
        </div>
    </div>
    );
}

export default Login;
