import React from 'react';

const Logout = () => {

    const logout = () => {
        sessionStorage.clear();
        window.location = '/';
    }


    return (
        <button onClick={logout} className="btn btn-outline-light">
            Déconnexion
        </button>
    );
};

export default Logout;