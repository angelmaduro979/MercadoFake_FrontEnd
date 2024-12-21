import React, { useState } from 'react';
import './Newpassword.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../../hooks/hooks_index.js';
import { Form, Error, Button, Input, SuccessMessage, LogoutNavbar, LoginNavbar, Loader, Footer, Div } from '../../../components/components_index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Newpassword = () => {
    const { formState, handleChangeInput } = useForm({ password: '', confirmarPassword: '' });
    const [dataError, setDataError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toogle, setToogle] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const accesToken = sessionStorage.getItem('accesToken');

    const toogleHandler = () => setToogle(prev => !prev);
    const { reset_token } = useParams()
    console.log("Token recibido desde la URL:", reset_token);

    const submitHandlerPassword = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!reset_token) {
            setDataError("Token de recuperación no válido o ausente.");
            setLoading(false);
            return;
        }
        const response = await fetch("https://mercadofake-backend.onrender.com/api/authUser/tokenForgotPassword/" + reset_token, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formState)
        });

        const dataHTTP = await response.json();
        if (!dataHTTP.ok) {
            setDataError(dataHTTP?.message?.error_message || "Error inesperado en dataHTTP");
            setLoading(false);
        } else {
            setDataError(null);
            setSuccessMessage(dataHTTP?.message);
            setLoading(false);
            navigate('/login')
            console.log(dataHTTP);
        }
    };

    return (
        <div className="new-password-container">
            {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}


            {loading
                ? (<Loader />)
                : (
                    <Div className='new-password-form-container'>
                        <Form

                            className="new-password-form"
                            action='/Newpassword'
                            method='POST'
                            onSubmit={submitHandlerPassword}
                        >
                            <h1 className="new-password-title">Cambiar Contraseña</h1>
                            <div className="input-group">
                                <Input
                                    className="password-input"
                                    type={toogle ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder='Nueva Contraseña'
                                    onChange={handleChangeInput}
                                    value={formState.password}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={toogle ? faEye : faEyeSlash}
                                    className="password-icon"
                                    onClick={toogleHandler}
                                />
                            </div>
                            <div className="input-group">
                                <Input
                                    className="password-input"
                                    type={toogle ? 'text' : 'password'}
                                    name="confirmarPassword"
                                    id="confirmarPassword"
                                    placeholder='Confirmar Contraseña'
                                    onChange={handleChangeInput}
                                    value={formState.confirmarPassword}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={toogle ? faEye : faEyeSlash}
                                    className="password-icon"
                                    onClick={toogleHandler}
                                />
                            </div>
                            {formState.password !== formState.confirmarPassword && (
                                <Error message={'Las contraseñas no coinciden ⚠️'} />
                            )}
                            {dataError && <Error message={dataError} />}
                            {successMessage && <SuccessMessage className="success-message" message={successMessage} />}
                            <Button className="submit-button" type='submit' text='Cambiar Contraseña' />
                        </Form>
                    </Div>
                )}
            <Footer />
        </div>
    );
};

export default Newpassword;
