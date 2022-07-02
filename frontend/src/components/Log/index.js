import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

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
        <div className="connection-form">
            <div className="form-container">
                <ul>

                    <button onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</button>
                    <button onClick={handleModals} id="login" className={loginModal ? "active-btn" : null}>Se connecter</button>

                </ul>
                {signUpModal && <SignUpForm />}
                {loginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;