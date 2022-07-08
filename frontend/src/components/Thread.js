import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from '../actions/like.actions';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './Utils';

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const [loadLike, setLoadLike] = useState(true);
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
        <div className="container">
            <ul>
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