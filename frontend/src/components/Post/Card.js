import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, likePost, unlikePost } from '../../actions/like.actions';
import { getPosts, updatePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
import { dateParser, isEmpty } from '../Utils';
import DeleteCard from './DeleteCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faThumbsUp as noLike } from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown as noDislike } from '@fortawesome/free-regular-svg-icons'

// Publication

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

    // Fonction de suppression d'un like

    const deleteLike = () => {
        likes.forEach(like => {
            if (`${like.user_id}` === uid && like.post_id === post.id && like.type === 1) {
                dispatch(unlikePost(like.id));
            }
        })
        dispatch(getLikes());
    }

    // Fonction de suppression d'un dislike

    const deleteDislike = () => {
        likes.forEach(like => {
            if (`${like.user_id}` === uid && like.post_id === post.id && like.type === -1) {
                dispatch(unlikePost(like.id));
            }
        })
        dispatch(getLikes());
    }

    // Fonction de modification du texte d'une publication

    const updateItem = async () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        dispatch(getPosts());
        setIsUpdated(false);
    }
    console.log(uid);
    useEffect(() => {
        !isEmpty(usersData) && setIsLoading(false);
        setLikeValue(countLikes);
        setDislikeValue(countDislikes);
        setIsLiked(false);
        setIsDisliked(false)
        if (!isEmpty(liked)) setIsLiked(true);
        if (!isEmpty(disLiked)) setIsDisliked(true);
        if (uid === `${post.owner_id}` || uid === '1') {
            setIsOwner(true);
        }
    },
        [usersData, likes, countLikes, countDislikes, isliked, liked, disLiked, uid, post.owner_id]
    )

    return (
        <div className='d-flex justify-content-center border border-secondary rounded mb-4 shadow' key={post.id}>
            {isLoading ? (
                <div className="spinner-border text-primary"></div>
            ) : (
                <div className="container-fluid bg-secondary m-1 rounded">

                    {/* Nom d'utilisateur + date de création de la publication */}

                    <div className="container-fluid row my-3 d-flex">
                        <div className="d-flex justify-content-between align-items-center px-0">
                            <h3 className='text-dark pt-1 me-3'>{!isEmpty(usersData[0]) && usersData
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
                            <p className='text-truncate'>{dateParser(post.createdat)}</p>
                        </div>
                    </div>

                    {/* Affichage du message/ de la partie modification du message */}

                    {isUpdated === false && post.content && <p className='form-control text-break border border-light'>{post.content}</p>}
                    {isUpdated && (
                        <div className="container-fluid">
                            <textarea
                                defaultValue={post.content}
                                onChange={(e) => setTextUpdate(e.target.value)} className='form-control mb-1'
                            />
                            <div className="container-fluid d-flex justify-content-center my-2">
                                <div onClick={updateItem} id="check-icon" size="2x" className=' btn btn-primary text-white'>Valider</div>
                            </div>
                        </div>
                    )}

                    {/* Affichage de l'image si présente */}

                    <div className='container-fluid d-flex justify-content-center'>{post.image ? (<img src={post.image} alt="" className='img-thumbnail mx-auto' />) : null}</div>
                    <div className='d-flex flex-row justify-content-between align-items-center my-2 '>

                        {/* Affichage des likes/dislikes */}

                        <div className='d-flex flex-row flex-nowrap align-items-center justify-content-end'>
                            <div className="d-flex flex-row" onClick={() => setIsLiked(!isliked)}>
                                {isliked ? <div onClick={deleteLike}><FontAwesomeIcon icon={faThumbsUp} size="xl" className='hover text-info me-2' /></div> : <div className='' onClick={() => dispatch(likePost(post.id, 1))}><FontAwesomeIcon icon={noLike} size="xl" className='hover text-info pe-2' /></div>}
                                <div >{likeValue}</div>
                            </div>
                            <div className="container d-flex align-items-center">
                                {isDisliked ? <div onClick={deleteDislike}><FontAwesomeIcon icon={faThumbsDown} size="xl" className='hover text-primary me-2' /></div> : <div onClick={() => dispatch(likePost(post.id, -1))}><FontAwesomeIcon icon={noDislike} size="xl" className='hover text-primary me-2' /></div>}
                                <div >{dislikeValue}</div>
                            </div>
                        </div>

                        {/* Affichage des boutons de modification et suppression de la publication */}

                        {isOwner &&
                            <div className="d-flex align-items-center justify-content-end ">
                                <div className="btn btn-outline-dark border border-secondary rounded-pill py-2" onClick={() => setIsUpdated(!isUpdated)}><FontAwesomeIcon icon={faPenToSquare} size="lg" /></div>
                                <DeleteCard id={post.id} />
                            </div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;