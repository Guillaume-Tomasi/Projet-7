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
        <div className="connection-form col-4 mx-auto">
            <div className="form-control">
                <ul>

                    <button onClick={handleModals} id="register" className={signUpModal ? "btn btn-outline-primary" : "btn btn-outline-primary"}>S'inscrire</button>
                    <button onClick={handleModals} id="login" className={loginModal ? "btn btn-outline-primary" : "btn btn-outline-primary"} >Se connecter</button>

                </ul>
                {signUpModal && <SignUpForm />}
                {loginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;