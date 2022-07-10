import React, { useState } from 'react';
import axios from 'axios';

// Formulaire de connexion

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Connexion + stockage des infos de l'utilisateur dans le session.storage

    const handleLogin = (e) => {
        e.preventDefault();
        const errorMSG = document.querySelector('.errorMsg');

        axios({
            method: "post",
            url: 'http://localhost:3000/api/user/login',
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                window.location = '/';
                sessionStorage.setItem('jwt', res.data.token);
                sessionStorage.setItem('id', res.data.userId);
            })
            .catch((err) => {
                errorMSG.innerHTML = err.response.data.error;
            })
    };
    return (
        <div className="container-fluid col-10">
            <form action="" onSubmit={handleLogin} id="Login-form" className='row justify-content-center' >
                <label htmlFor="email">Email</label>
                <br />
                <input type="email" name='email' id='email' className='form-control form-control-sm' onChange={(e) => setEmail(e.target.value)} value={email} required />
                <br />
                <label htmlFor="password">Mot de passe</label>
                <br />
                <input type="password" name='password' id='password' className='form-control form-control-sm' onChange={(e) => setPassword(e.target.value)} value={password} required />
                <br />
                <input type="submit" id='connect' className='btn col-6 my-3 btn btn-primary shadow-sm text-white rounded' value="Connexion" />
                <div className="errorMsg text-primary col-8 d-flex justify-content-center"></div>
            </form>
        </div>
    );
};

export default LoginForm;