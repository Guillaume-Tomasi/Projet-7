import React, { useContext } from 'react';
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import Sign from './Sign';
import NewPostForm from '../components/Post/NewPostForm';

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div>
            <div className="Home">
                {uid ? (
                    <>
                        <NewPostForm />
                        <Thread />
                    </>)
                    : <Sign />}
            </div>
        </div>
    );
};

export default Home;