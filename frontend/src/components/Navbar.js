import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="./images/logo.png" alt="Logo" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;