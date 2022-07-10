import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// Déconnexion de l'utilisateur + suppression du session.storage

const Logout = () => {

    const logout = () => {
        sessionStorage.clear();
        window.location = '/';
    }
    return (
        <button onClick={logout} className="btn btn-dark ms-5">
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" className='logout-button' />
        </button>
    );
};

export default Logout;