import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';


const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () => {
        dispatch(deletePost(props.id))
    }


    return (
        <div className="btn btn-outline-info" onClick={() => {
            if (window.confirm('Supprimer la publication ?')) {
                deleteQuote()
            }
        }}>Supprimer</div>
    );
};

export default DeleteCard;