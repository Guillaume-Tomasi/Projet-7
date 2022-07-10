import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from '../actions/like.actions';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import NewPostForm from './Post/NewPostForm';
import { isEmpty } from './Utils';

// Fil d'actualités

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts())
            dispatch(getLikes())
            setLoadPost(false)
        }
    }, [loadPost, dispatch])

    return (
        <div className="container-fluid d-flex flex-column py-5 bg-light justify-content-center align-items-center">

            {/* Ajout d'une publication */}

            <NewPostForm />

            {/* Affichage des publication */}

            <ul className='container-fluid col-4'>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post.id} />;
                    })
                }
            </ul>
        </div>
    );
};

export default Thread;