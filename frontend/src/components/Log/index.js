import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

// Affichage de la fenêtre d'inscription ou de connexion au clic

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [loginModal, setLoginModal] = useState(props.login);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setLoginModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setLoginModal(true);
        }
    }

    return (
        <div className="form-control-fluid col-6 mx-auto mt-5 border rounded shadow-sm">
            <div className='bg-secondary m-1 rounded'>
                <ul className='nav justify-content-center mx-auto '>
                    <button onClick={handleModals} id="register" className={signUpModal ? "btn btn-dark mx-2 my-3 shadow-sm rounded" : "btn btn-outline-dark mx-2 my-3"}>S'inscrire</button>
                    <button onClick={handleModals} id="login" className={loginModal ? "btn btn-outline-dark mx-2 my-3 shadow-sm rounded" : "btn btn-outline-dark mx-2 my-3"} >Se connecter</button>
                </ul>
                {signUpModal && <SignUpForm />}
                {loginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;