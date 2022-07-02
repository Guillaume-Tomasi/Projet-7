import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

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
                    <LoginForm />
                    <h4 className="success">Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="signup-form">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <br />
                    <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}
                        value={username} required />
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
                        value={email} required />
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <br />
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}
                        value={password} required />
                    <br />
                    <input type="submit" value="Inscription" />
                    <div className="errorMsg"></div>
                </form>
            )}
        </>
    );
};

export default SignUpForm;