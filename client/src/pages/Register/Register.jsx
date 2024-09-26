import "./register.css";

// librerias

import React from "react";
import logo  from './icons/cometaLogo.png'
import googleIcon  from '../Login/icons/google.png'
import { Formik, Form} from "formik";
import Typography from "antd/es/typography/Typography";
import facebokIcon from './icons/facebook.png'
import AuthService from "../services/AuthServices";
import { useMutation } from "react-query";
import SpinnerLoader from "../../stylesComponents/spinnerLoader/SpinnerLoader";
import AuthProvider from "../../zustand/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { validations } from "./validation";

import { InitialValues } from "./InitialValues";
import { useGeoLocations } from "../../hooks/GeoLocation/useGeoLocations";
import Input from "antd/es/input";
import { Checkbox } from "antd";
import ErrorMessageText from "../../components/ErrorMessageText";
import Background from "./background";
const {Text} = Typography

function Register() { 

  const Auth = AuthProvider()
  const navigate = useNavigate()
  const geometry = useGeoLocations()

  const { mutate, isLoading, error } = useMutation({
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

  
  const handleSubmit = async(values, {resetForm})=>{
    const { correo, nombre, contraseña } = values;

            mutate({
              email: correo,
              username: nombre,
              password: contraseña,
              geometry: (!geometry.error ? {...geometry?.location} : {}),
            }, {
              onSuccess: () => {
                resetForm()
              }
            });

  }

  const [passwordVisible, setPasswordVisible] = React.useState(false);


  return (

    
    
    <div className="register">
        <Background/>
          
        <Formik
          validate={validations}
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          >
          {({ handleBlur, handleChange, errors, values, isSubmitting }) => (
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
            
                    <Input
                     placeholder="Write your email here"
                     name="correo"
                     id="Email"
                     value={values.correo}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className="input-register"
                     />
                    
                    {errors.correo && <Text className="error-text" type="danger" >{errors.correo}</Text>}

                  <Input
                  
                  id={'username'}
                  placeholder="Write your username here"
                  name="nombre"
                  onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nombre}
                    className="input-register"
                    
                    >
                  </Input>
             
                  {errors.nombre && <Text type="danger" className="error-text" >{errors.nombre}</Text>}

                

                <Input.Password
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                  placeholder="Write your password here"
                  name="contraseña"
                  id={'password'}
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contraseña}
                  className="input-register"
                  >
               
                </Input.Password>
                  {errors.contraseña && <Text type="danger" className="error-text" >{errors.contraseña}</Text>}
          </div>

          
          <div style={{marginTop: "1rem"}}>
          <ErrorMessageText error={error}/>
          </div>
        
          <div className="login-remember">
           <div className="save-session-container">
           <Checkbox/>
                <label htmlFor="persits" className="save-session">Remember me</label>
           </div>
           <p className="forgot-password">Forgot Password?</p>
            </div>

            <button className="register-submit" type="submit" >
                  {isLoading || isSubmitting ? <SpinnerLoader/> : <> Log In</>}
            </button>

            <span className="register-link-message">You already hava an account?  <span className="SignUp-link"><Link style={{color:'#4098FF', marginLeft:'10px'}} to={'/signup'}> Log In</Link></span></span>
                        
            </Form>
          )}
        </Formik>
      </div>
          
   
  );
}

export default Register;
