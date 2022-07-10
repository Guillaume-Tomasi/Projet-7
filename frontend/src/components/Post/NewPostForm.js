import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { addPost, getPosts } from '../../actions/post.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

// Formulaire de création de publication

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    // Gestion de l'image

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const insertImg = () => {
        document.getElementById('file-upload').click();
    }

    // Création de la publication au clic sur "Envoyer"

    const handlePost = () => {
        if (message || postPicture) {
            const data = new FormData()
            data.append('owner_id', userData[0].id);
            data.append('content', message);
            if (file) data.append('image', file);

            dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
            window.location.reload();
        } else {
            alert("veuillez entrer un message")
        }
    };

    // Annulation de la publication au clic sur "Annuler"

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setFile('');
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData])

    return (
        <div className="container-fluid col-4 py-3">
            {isLoading ? (
                <div className='container-fluid d-flex justify-content-center'>
                    <div className="spinner-border"></div>
                </div>
            ) : (
                <>
                    <div className="container-fluid card mb-3 py-3 border border-secondary shadow-sm">

                        {/* Création du message */}

                        <textarea name="message" id="message" placeholder='Quoi de neuf ?' onChange={(e) => setMessage(e.target.value)} value={message} className='form-control border border-secondary mb-2'></textarea>

                        {/* Prévisualisation de l'image */}

                        {postPicture && <div className="container-fluid d-flex justify-content-center mb-2">
                            <img src={postPicture} alt="" width="300px" className='img-thumbnail mx-auto' />
                        </div>}

                        {/* Boutons "Envoyer" et "Annuler" + Bouton d'ajout d'une image */}
                        <div className="container-fluid d-flex justify-content-between mt-2">
                            <div className="btn-send d-flex">
                                <button className='send-button me-1 btn btn-primary text-white border rounded me' onClick={handlePost}>Envoyer</button>
                                {message || postPicture ? (<button className='send-button btn btn-outline-dark border rounded' onClick={cancelPost}>Annuler</button>
                                ) : null}
                            </div>
                            <div className='picture-input position-relative overflow-hidden my-2'>
                                <FontAwesomeIcon icon={faImage} size="xl" className='send-img input-icon position-relative text-dark' onClick={insertImg} />
                                <input type="file" name="file" id="file-upload" accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} className='input-image position-absolute start-0 invisible'
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;