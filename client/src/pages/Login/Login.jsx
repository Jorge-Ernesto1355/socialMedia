/* eslint-disable no-useless-computed-key */
/* eslint-disable dot-notation */
import "./login.css";
import cometa from './icons/cometa.png'
import GoogleIcon from './icons/google.png'
import Spinner from '../../stylesComponents/spinnerLoader/SpinnerLoader'
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import AuthProvider from "../../zustand/AuthProvider";
import { useStoreLogin } from "./useStoreLogin";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Register/background";
import { Input } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import ErrorMessageText from "../../components/ErrorMessageText";



function Login() {
    
    const Auth = AuthProvider()
    const navigate = useNavigate()

    
  const [passwordVisible, setPasswordVisible] = React.useState(false);

    const { mutate, isLoading, error } = useMutation({
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
        <Background/>
        
        <div className="login-container">
            <img className="login-icon" src={cometa} alt="" />
            <h1 className="login-title">Welcome back!</h1>
            <p className="login-description">Please enter your details</p>
                <Input
                    name="email"
                    id='Correo'
                    placeholder="write your email"
                    value={store['email']}
                    onChange={handleInputChange}
                    className="input-register"
                />
                
                
             

                <Input.Password
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    placeholder="write your password"
                    id='Password'
                    name="password"
                    value={store['password']}
                    onChange={handleInputChange}
                    className="input-register"
                />
               
               <div style={{marginTop: ".3rem"}}>
               <ErrorMessageText error={error}/>
               </div>
            <div className="login-remember">
           <div className="save-session-container">
          <Checkbox/>
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
