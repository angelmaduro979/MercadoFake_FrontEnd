import React, { useState } from 'react';
import { Div, Button, Input, Form, Loader, Error, SuccessMessage, LoginNavbar, LogoutNavbar, Footer } from '../../../components/components_index.js';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/hooks_index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const { formState, handleChangeInput } = useForm({
    email: '',
    name: '',
    role: '',
    phone: '',
    password: '',
    confirmarPassword: ''
  });
  const [errorsState, setErrorsState] = useState({});
  const navigate = useNavigate();
  const [toogle, setToogle] = useState(false);
  const accesToken = sessionStorage.getItem('accesToken');

  const toogleHandler = () => setToogle(prev => !prev);

  const validateForm = () => {
    const errors = {};
    if (!formState.email.includes('@')) errors.email = 'El email no es válido';
    if (!formState.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!/^\d+$/.test(formState.phone)) errors.phone = 'El teléfono debe contener solo números';
    if (formState.password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formState.password !== formState.confirmarPassword)
      errors.password = 'Las contraseñas no coinciden';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorsState(errors);
      return;
    }
    try {
      const responseHTTP = await fetch('https://mercadofake-backend.onrender.com/api/authUser/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formState.email,
          name: formState.name,
          phone: formState.phone,
          password: formState.password,
          role: formState.role
        }),
      });
      const dataHTTP = await responseHTTP.json();
      if (responseHTTP.ok) {
        navigate('/login');
      } else {
        setErrorsState(prev => ({ ...prev, general: dataHTTP.message }));
      }
    } catch (error) {
      setErrorsState(prev => ({ ...prev, general: 'Error de conexión con el servidor' }));
    }
  };

  return (
    <Div className="registerScreen">
      {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
      <Div className="register-container">

        <Form method="POST" action="/register" onSubmit={handleSubmit} className="register-form">
          <Div>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChangeInput}
            />
            {errorsState.email && <span className="error">{errorsState.email}</span>}
          </Div>
          <Div>
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formState.name}
              onChange={handleChangeInput}
            />
            {errorsState.name && <span className="error">{errorsState.name}</span>}
          </Div>
          <Div className="select-container">
            <select
              id="rol"
              value={formState.role}
              name="role"
              onChange={handleChangeInput}
              className={formState.role ? "styled-select" : "styled-select-disabled"}
            >
              <option value="" disabled hidden >
                Selecciona un rol
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errorsState.role && <span className="error">{errorsState.role}</span>}
          </Div>
          <Div>
            <Input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formState.phone}
              onChange={handleChangeInput}
            />
            {errorsState.phone && <span className="error">{errorsState.phone}</span>}
          </Div>
          <Div className="password-container">
            <Input
              type={toogle ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={formState.password}
              onChange={handleChangeInput}
            />
            <FontAwesomeIcon
              icon={toogle ? faEye : faEyeSlash}
              className="password-icon"
              onClick={toogleHandler}
            />
            {errorsState.password && <span className="error">{errorsState.password}</span>}
          </Div>
          <Div className="password-container">
            <Input
              type={toogle ? 'text' : 'password'}
              name="confirmarPassword"
              placeholder="Confirmar Contraseña"
              value={formState.confirmarPassword}
              onChange={handleChangeInput}
            />
            <FontAwesomeIcon
              icon={toogle ? faEye : faEyeSlash}
              className="password-icon"
              onClick={toogleHandler}
            />
          </Div>
          {errorsState.general && <div className="error general-error">{errorsState.general}</div>}
          <Button type="submit" text="Registrar" className={"submit-button"} />
          <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
        </Form>
        
      </Div>
      <Footer />
    </Div>
  );
};

export default Register;
