import React, { useState } from 'react';
import { Div, Button, Input, Form, Loader, Error, LogoutNavbar, LoginNavbar, Footer } from '../../../components/components_index.js';
import '../../../styles/global.css';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/hooks_index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { formState, handleChangeInput } = useForm({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({});
  const navigate = useNavigate();
  const [toogle, setToogle] = useState(false);
  const accesToken = sessionStorage.getItem('accesToken');

  const toogleHandler = () => setToogle((prev) => !prev);

  const validateForm = () => {
    const errors = {};
    if (!formState.email) {
      errors.email = 'El email es requerido.';
    } else if (!formState.email.includes('@')) {
      errors.email = 'El email no es válido.';
    }

    if (!formState.password) {
      errors.password = 'La contraseña es requerida.';
    } else if (formState.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorState(errors);
      return;
    }
    try {
      setLoading(true);
      const responseHTTP = await fetch('https://mercadofake-backend.onrender.com/api/authUser/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formState),
      });

      if (!responseHTTP) {
        setErrorState((prev) => ({ ...prev, general: 'Error de conexión con el servidor' }));
        setLoading(false);
      }
      const dataHTTP = await responseHTTP.json();
      if (!dataHTTP.ok) {
        const errorMessage = dataHTTP.message.error_message || dataHTTP.error || 'Error inesperado.';
        console.log(dataHTTP);
        console.log(errorMessage);
        setErrorState((prev) => ({ ...prev, general: errorMessage }));
        setLoading(false);
        return;
      }
      sessionStorage.setItem('accesToken', dataHTTP.data.accesToken)
      sessionStorage.setItem('customers-name', dataHTTP.data.userInformation.name)
      console.log(dataHTTP);
      navigate('/home')
    } catch (error) {
      setErrorState((prev) => ({ ...prev, general: 'Error de conexión con el servidor' }));
    }
  };

  return (
    <Div className="login-screen">
      {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
      <Div className="login-content">
        {loading
          ? <Loader />
          : (
            <Div className="login-container-form">

              <h1 className="login-title">Iniciar Sesión</h1>
              <Form action="/login" method="post" onSubmit={submitHandler}>
                <Div className="input-group">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formState.email}
                    onChange={handleChangeInput}
                    className="login-input"
                  />
                  {errorState.email && <Error message={errorState.email} /> || <p className="error-message">{errorState.email}</p>}
                </Div>
                <Div className="input-group password-group">
                  <Input
                    type={toogle ? 'text' : 'password'}
                    name="password"
                    placeholder="Contraseña"
                    value={formState.password}
                    onChange={handleChangeInput}
                    className="login-input"
                  />
                  <FontAwesomeIcon
                    icon={toogle ? faEye : faEyeSlash}
                    className="password-icon"
                    onClick={toogleHandler}
                  />
                </Div>
                {errorState.password && <Error message={errorState.password} /> }
                {errorState.general && <Error message={errorState.general} /> }
                <Div className="button-container">
                  <Button type="submit" text="Iniciar Sesión" className="submit-button" />
                </Div>
              </Form>
              <Div className="link-container">
                <Link to="/register" className="login-link">¿No tienes una cuenta? Regístrate</Link>
                <Link to="/PasswordRecovery" className="login-link">¿Olvidaste tu contraseña?</Link>
              </Div>
            </Div>
          )}
        
      </Div>
      <Footer />
    </Div>
  );
};

export default Login;
