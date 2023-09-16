import './login.css';

//librerias
import toast, { Toaster } from 'react-hot-toast';

import React, { useState } from 'react';

import { Formik, Form, ErrorMessage } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

//components

import Register from '../services/Register';

import Cuadro from '../../../components/cuadro/Cuadro';

import Input from './Input';

import validateCURP from '../../../utilities/ExpresionRegularCurp';

import validateContraseña from '../../../utilities/ExpresionRegularContraseña';

import Loading from '../../../stylesComponents/Loading/Loaging';

import cbta from '../../../assets/CBTA.png';

//emoticons

import { FaArrowLeft, FaUser } from 'react-icons/fa';

import { MdEmail, MdOutlineDocumentScanner } from 'react-icons/md';

import { GiPadlock } from 'react-icons/gi';

function Login() {
  const [selectCheck, setSelectCheck] = useState(false);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkBox = () => {
    setSelectCheck(!selectCheck);
  };

  const toastNoti = (err) => {
    toast.error(err, {
      position: 'top-right'
    });
  };

  return (
    <div className="cuadro1">
      <Toaster></Toaster>
      <div className="login">
        <i />
        {error && toastNoti(error)}

        <h1 className="title">CBTA 81</h1>
        <div className="logocbta81">
          <img className="logocbta" src={cbta} alt="" />
        </div>
        <div className="icon-atras">
          <FaArrowLeft />
        </div>

        <div className="logo" />

        <Formik
          validate={(values) => {
            let errors = {};

            const { correo, nombre, contraseña, curp } = values;

            //validacion de correo

            if (!correo) {
              errors.correo = 'introduce un correo';
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.correo
              )
            ) {
              errors.correo =
                'el correo solo puede contener letras, numeros, puntos, guiones, guion bajo.';
            }

            //validacion de nombre

            if (!nombre) {
              errors.nombre = 'introduce un nombre';
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre)) {
              errors.nombre = 'el nombre solo puede contener letras y esapcios';
            }
            if (!contraseña) {
              //validacion contraseña

              errors.contraseña = 'introduce una contraseña';
            } else if (!validateContraseña(contraseña)) {
              errors.contraseña =
                'Minimo 8 ,caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minuscula, Al menos un dígito, No espacios en blanco,  Al menos 1 caracter especial';
            }

            //validacion de crup

            if (!curp) {
              errors.curp = 'introduce un curp';
            } else if (!validateCURP(curp)) {
              errors.curp = 'introduce una curp valida';
            }

            return errors;
          }}
          initialValues={{
            correo: '',

            nombre: '',

            contraseña: '',

            curp: ''
          }}
          onSubmit={async (values, { resetForm }) => {
            const { correo, nombre, contraseña, curp } = values;

            await Register(dispatch, {
              email: correo,
              username: nombre,
              password: contraseña,
              curp
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
                    <Cuadro text={errors.correo} danger={'danger'} />
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
                <h3 className="text">nombre</h3>

                <ErrorMessage
                  name="nombre"
                  component={() => (
                    <Cuadro text={errors.nombre} danger={'danger'} />
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
                    <FaUser />
                  </div>
                </Input>
              </div>

              <div className="input">
                <h3 className="text">contraseña</h3>

                <ErrorMessage
                  name="contraseña"
                  component={() => (
                    <Cuadro text={errors.contraseña} danger={'danger'} />
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

              <div className="input">
                <h3 className="text">curp</h3>

                <ErrorMessage
                  name="curp"
                  component={() => (
                    <Cuadro text={errors.curp} danger={'danger'} />
                  )}
                />

                <Input
                  placeholder="curp"
                  name="curp"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  inputValue={values.curp}
                >
                  <div className="icon">
                    <MdOutlineDocumentScanner />
                  </div>
                </Input>
              </div>

              <div className="checkBox">
                <span className="span-guardarSesion">guardar sesion</span>

                <input
                  type="checkbox"
                  value={selectCheck}
                  onClick={() => checkBox()}
                />
              </div>

              <div>
                <button className="submit" type="submit">
                  <h2 className="register">Register</h2>
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
