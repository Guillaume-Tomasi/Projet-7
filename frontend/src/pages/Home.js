import React, { useContext } from 'react';
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import Sign from './Sign';

// Page d'accueil

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div>
            <div className="Home">

                {/* Affichage du fil d'actualité si l'utilisateur est connecté, sinon affichage de la page de connexion */}
                {uid ? (
                    <>
                        <Thread />
                    </>)
                    : <Sign />}
            </div>
        </div>
    );
};

export default Home;