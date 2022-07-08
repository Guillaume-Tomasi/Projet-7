import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';




const Navbar = () => {
    const uid = useContext(UidContext);



    return (
        <div>
            <nav className=" navbar navbar-expand py-2 mb-3">
                <div className="container-fluid">
                    <NavLink to="/" className="">
                        <img src="./images/logo.svg" alt="Logo" className='img-fluid' />
                    </NavLink>
                    {uid ? (
                        <Logout />
                    ) : (
                        <NavLink to="/user">
                            <div className="btn btn-outline-light">Connexion</div>
                        </NavLink>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;