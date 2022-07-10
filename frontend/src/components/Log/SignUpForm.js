import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

// Formulaire d'inscription

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const errorMSG = document.querySelector('.errorMsg');

        axios({
            method: "post",
            url: 'http://localhost:3000/api/user/signup',
            withCredentials: true,
            data: {
                username,
                email,
                password
            }
        })
            .then((res) => {
                window.location.reload();
                setFormSubmit(true);
            })
            .catch((err) => {
                errorMSG.innerHTML = err.response.data.err;
            })
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <p className="container text-success  mb-0 col-8 d-flex justify-content-center">Enregistrement réussi ! Veuillez vous connecter</p>
                    <LoginForm />
                </>
            ) : (
                <div className="container-fluid col-10">
                    <form action="" onSubmit={handleRegister} id="signup-form" className='row justify-content-center'>
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <br />
                        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}
                            value={username} className='form-control form-control-sm' required />
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
                            value={email} className='form-control form-control-sm' required />
                        <br />
                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}
                            value={password} className='form-control form-control-sm' required />
                        <br />
                        <input type="submit" id='signup' className='btn col-6 my-3 btn btn-primary shadow-sm text-white rounded' value="Inscription" />
                        <div className="errorMsg text-primary col-8 d-flex justify-content-center"></div>
                    </form>
                </div>
            )}
        </>
    );
};

export default SignUpForm;