import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

// Header 

const Navbar = () => {
    const uid = useContext(UidContext);

    return (
        <nav className="navbar bg-dark navbar-expand py-2 shadow-lg">

            {/* Logo */}

            <div className="container-fluid col-8 justify-content-between">
                <NavLink to="/" className="">
                    <img src="./images/logo.svg" alt="Logo" className='img-fluid' />
                </NavLink>

                {/* Bouton de déconnexion */}

                {uid ? (
                    <Logout />
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;