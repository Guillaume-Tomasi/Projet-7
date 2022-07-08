import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, likePost, unlikePost } from '../../actions/like.actions';
import { getPosts, updatePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
import { dateParser, isEmpty } from '../Utils';
import DeleteCard from './DeleteCard';




const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const [isliked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const [likeValue, setLikeValue] = useState(null);
    const [dislikeValue, setDislikeValue] = useState(null);

    const usersData = useSelector((state) => state.usersReducer);
    const likes = useSelector((state) => state.likeReducer);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();


    const countLikes = Object.values(likes).filter(like => like.type === 1 && like.post_id === post.id).length;
    const countDislikes = Object.values(likes).filter(like => like.type === -1 && like.post_id === post.id).length;


    const liked = Object.values(likes).filter(like => `${like.user_id}` === uid && like.post_id === post.id && like.type === 1);
    const disLiked = Object.values(likes).filter(like => `${like.user_id}` === uid && like.post_id === post.id && like.type === -1);


    const deleteLike = () => {
        likes.forEach(like => {
            if (`${like.user_id}` === uid && like.post_id === post.id && like.type === 1) {
                dispatch(unlikePost(like.id));
            }
        })
        dispatch(getLikes());
    }

    const deleteDislike = () => {
        likes.forEach(like => {
            if (`${like.user_id}` === uid && like.post_id === post.id && like.type === -1) {
                dispatch(unlikePost(like.id));
            }
        })
        dispatch(getLikes());
    }

    const updateItem = async () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        dispatch(getPosts());
        setIsUpdated(false);
    }




    useEffect(() => {
        !isEmpty(usersData) && setIsLoading(false);
        setLikeValue(countLikes);
        setDislikeValue(countDislikes);
        setIsLiked(false);
        setIsDisliked(false)
        if (!isEmpty(liked)) setIsLiked(true);
        if (!isEmpty(disLiked)) setIsDisliked(true);
        if (uid === `${post.owner_id}`) {
            setIsOwner(true);
        }
    },
        [usersData, likes, countLikes, countDislikes, isliked, liked, disLiked, uid, post.owner_id]
    )

    return (
        <li className='container card col-6 mb-4' key={post.id}>
            {isLoading ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card-right mx-auto">
                    <div className="card">
                        <div className="pseudo d-flex justify-content-center">
                            <h3>{!isEmpty(usersData[0]) && usersData
                                .map((user) => {
                                    if (user.id === post.owner_id) {
                                        if (`${post.owner_id
                                            }` === uid) {
                                            return "Vous"
                                        }
                                        return user.username
                                    }
                                    else {
                                        return null
                                    }
                                })
                            }

                            </h3>
                        </div>
                        <span>{dateParser(post.createdat)}</span>
                    </div>
                    {isOwner &&
                        <div className="btn-container">
                            <div className="btn btn-outline-info" onClick={() => setIsUpdated(!isUpdated)}>Modifier</div>
                            <DeleteCard id={post.id} />
                        </div>}
                    {isOwner === false && <div className="spinner-border"></div>}



                    {isUpdated === false && <p>{post.content}</p>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea
                                defaultValue={post.content}
                                onChange={(e) => setTextUpdate(e.target.value)}
                            />

                            <div className="button-container">
                                <div className="btn btn-success" onClick={updateItem}>
                                    Valider modifications
                                </div>
                            </div>
                        </div>
                    )}
                    {post.image ? (<img src={post.image} alt="" className='img-thumbnail mx-auto' />) : null}




                    <div className="container d-flex align-items-center" onClick={() => setIsLiked(!isliked)}>
                        {isliked ? <div className='btn btn-info me-2' onClick={deleteLike}>liké</div> : <div className='btn btn-outline-info me-2' onClick={() => dispatch(likePost(post.id, 1))}>Pas liké</div>}
                        <div >{likeValue}</div>
                    </div>



                    <div className="container d-flex align-items-center">
                        {isDisliked ? <div className='btn btn-danger  me-2' onClick={deleteDislike}>disliké</div> : <div className='btn btn-outline-danger me-2' onClick={() => dispatch(likePost(post.id, -1))}>Pas disliké</div>}
                        <div >{dislikeValue}</div>
                    </div>

                </div>
            )}
        </li>
    );
};

export default Card;