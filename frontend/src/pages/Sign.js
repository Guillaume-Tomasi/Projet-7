import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Log from '../components/Log';

// Page de connexion

const Sign = () => {
    const uid = useContext(UidContext);

    return (
        <div className="sign-page">
            <div className="log-container">
                {uid ? window.location = "/" :
                    <Log login={true} signup={false} />
                }
            </div>
        </div>
    );
};

export default Sign;