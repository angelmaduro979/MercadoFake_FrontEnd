import React, { useState } from 'react';
import { Div, Button, Input, Form, Error, SuccessMessage, LogoutNavbar, LoginNavbar, Loader, Footer } from '../../../components/components_index.js';
import './passwordRecovery.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/hooks_index.js';


const PasswordRecovery = () => {
  const { formState, handleChangeInput } = useForm({
    email: ''
  })
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState('')
  const accesToken = sessionStorage.getItem('accesToken');
  const submitHandlerPassword = async (e) => {
    e.preventDefault();
    setDataError(''); 
    setSuccessMessage('');
    setLoading(true);

    try {
      if (!formState.email || !formState.email.includes('@')) {
        setDataError('Por favor, ingresa un correo electrónico válido.');
        setLoading(false);
        return;
      }

      const response = await fetch('https://mercadofake-backend.onrender.com/api/authUser/passwordRecovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      if (!response.ok) {
        setDataError(data?.message?.error_message || 'Error inesperado en data.');
        console.error('Error del servidor:', data?.message?.error_message);
      } else {
        console.log('Respuesta del servidor:', data);
        setSuccessMessage(data.message || 'Email enviado correctamente.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setDataError('Error de red al intentar conectar con el servidor.');
    } finally {
      setLoading(false); 
    }
  };


  return (
    <Div className="recovery-container-main">
      {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}

      {loading
        ? <Loader />
        : (
          <Div className="recovery-container-outer">
            <Div className="recovery-container">

              <h1 className="recovery-title">Recuperar tu contraseña</h1>
              <p className="recovery-subtitle">
                Ingresa el correo electrónico asociado a tu cuenta. Te enviaremos un enlace para restablecer tu contraseña.
              </p>

              <Form method="POST" action="/PasswordRecovery" className="recovery-form" onSubmit={submitHandlerPassword}>
                <Div className="input-container">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    required
                    className="input-field"
                    onChange={handleChangeInput}
                    value={formState.email}
                  />
                </Div>
                {dataError && <Error message={dataError} />}
                {successMessage && <SuccessMessage message={successMessage} />}
                <Button
                  type="submit"
                  text="Enviar enlace"
                  className="submit-button"
                />
              </Form>

              <Div className="links-container">
                <Link to="/login" className="back-link">Volver a iniciar sesión</Link>
              </Div>
            </Div>
          </Div>
        )}

      <Footer />
    </Div>
  );
};



export default PasswordRecovery