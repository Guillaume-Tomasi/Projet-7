import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <form action="" onSubmit={handleLogin} id="Login-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            <br />
            <input type="submit" className='btn btn-primary' value="Se connecter" />
            <div className="errorMsg"></div>
        </form>
    );
};

export default LoginForm;