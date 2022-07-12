import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

// Formulaire d'inscription

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    const validUserName = new RegExp('^[A-Za-z][A-Za-z0-9_]{4, 29}$')

    const validate = () => {
        if (!validUserName.test(username)) {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
        if (!validEmail.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (!validPassword.test(password)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const errorMSG = document.querySelector('.errorMsg');
        if (emailError === false && passwordError === false && usernameError === false) {
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
        } else {
            return
        }
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
                        {usernameError ? (<p className='text-primary'>Nom d'utilisateur invalide</p>) : null}
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
                            value={email} className='form-control form-control-sm' required />
                        {emailError ? (<p className='text-primary'>Email invalide !</p>) : null}
                        <br />
                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}
                            value={password} className='form-control form-control-sm' required />
                        {passwordError ? (<p className='text-primary'>Mot de passe invalide !</p>) : null}
                        <br />
                        <input type="submit" id='signup' className='btn col-6 my-3 btn btn-primary shadow-sm text-white rounded' value="Inscription" onClick={validate} />
                        <div className="errorMsg text-primary col-8 d-flex justify-content-center"></div>
                    </form>
                </div>
            )}
        </>
    );
};

export default SignUpForm;