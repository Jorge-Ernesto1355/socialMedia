import "./register.css";

// librerias

import React from "react";
import logo  from './icons/cometaLogo.png'
import googleIcon  from '../Login/icons/google.png'
import { Formik, Form, ErrorMessage } from "formik";
import facebokIcon from './icons/facebook.png'


import 'react-toastify/dist/ReactToastify.css';

import Cuadro from "../../components/cuadro/Cuadro";

import Input from "../components/Input";


import AuthService from "../services/AuthServices";
import { useMutation } from "react-query";
import SpinnerLoader from "../../stylesComponents/spinnerLoader/SpinnerLoader";
import AuthProvider from "../../zustand/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { validations } from "./validation";
import { InitialValues } from "./InitialValues";

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
    
  })


  return (

      <div className="register">
        <Formik
          validate={validations}
          initialValues={InitialValues}
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
            <Form className="register-container">

                <div className="logo-container">
                <img src={logo} className="logo-register" alt="" />
                <h3 className="name-social">UniVerse</h3>
                </div>

                <h4 className="text-register">Create an account</h4>
                <p className="description-register">Welcome, select method to create account!</p>
                <div className="session-ways">
                  <button className="session-way">
                      <img src={googleIcon} className="google-icon" alt="google icon" />
                      <p className="text-session">Google</p>
                  </button>
                    <button className="session-way">
                      <img src={facebokIcon} className="google-icon" alt="google icon" />
                      <p className="text-session">Facebook</p>
                  </button> 
                </div>

                <div className="lines-container">
                  <div className="line-register"/>
                    <span className="text-continue">or continue with email</span>
                  <div className="line-register"/>
                  
                </div>

                <div className="inputs-form">
               
                <ErrorMessage
                  name="correo"
                  component={() => (
                    <Cuadro text={errors.correo} danger={"danger"} />
                    )}
                    />


                <Input
                  placeholder="correo"
                  name="correo"
                  id={'Email'}
                  inputValue={values.correo}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                >
                 
                </Input>
            
              

                <ErrorMessage
                  name="nombre"
                  component={() => (
                    <Cuadro text={errors.nombre} danger={"danger"} />
                    )}
                    />

                <Input
                  id={'username'}
                  placeholder="nombre"
                  name="nombre"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  inputValue={values.nombre}
                  >
                </Input>
             
              

                <ErrorMessage
                  name="contraseña"
                  component={() => (
                    <Cuadro text={errors.contraseña} danger={"danger"} />
                    )}
                    />

                <Input
                  placeholder="contraseña"
                  name="contraseña"
                  id={'password'}
                  type="password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  inputValue={values.contraseña}
                  >
               
                </Input>
          </div>
          <div className="login-remember">
           <div className="save-session-container">
           <input type="checkbox" id="persits" onChange={(e) => Auth.setPersits(!Auth.persits)} checked={Boolean(Auth.persits)} />
                <label htmlFor="persits" className="save-session">Remember me</label>
           </div>
           <p className="forgot-password">Forgot Password?</p>
            </div>

            <button className="register-submit" type="submit" >
                  {isLoading ? <SpinnerLoader/> : <> Log In</>}
            </button>

            <span className="register-link-message">You already hava an account?  <span className="SignUp-link"><Link style={{color:'#4098FF', marginLeft:'10px'}} to={'/signup'}> Log In</Link></span></span>
                        
            </Form>
          )}
        </Formik>
      </div>
   
  );
}

export default Register;
