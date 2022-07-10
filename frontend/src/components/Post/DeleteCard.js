import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

// Bouton de suppression de la publication

const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () => {
        dispatch(deletePost(props.id))
    }
    return (
        <div className="btn btn-outline-dark border border-secondary rounded-pill py-2" onClick={() => {
            if (window.confirm('Supprimer la publication ?')) {
                deleteQuote()
            }
        }}><FontAwesomeIcon icon={faTrashCan} size="lg" /></div>
    );
};

export default DeleteCard;