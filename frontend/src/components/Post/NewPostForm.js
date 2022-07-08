import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { addPost, getPosts } from '../../actions/post.actions';


const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    };

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

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setFile('');

    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData])

    return (
        <div className="post-container">
            {isLoading ? (
                <div className="spinner-border"></div>
            ) : (
                <>
                    <div className="post-form card col-4 mx-auto mb-3  p-3">
                        <textarea name="message" id="message" placeholder='Quoi de neuf ?' onChange={(e) => setMessage(e.target.value)} value={message} className='form-control'>
                        </textarea>
                        <div className="content">
                            <img src={postPicture} alt="" width="200px" height="auto" />
                        </div>
                        <div className="footer-form">

                            <input type="file" name="file" id="file-upload" accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)}
                            />

                            <div className="btn-send">


                                <button className='send' onClick={handlePost}>Envoyer</button>
                                {message || postPicture ? (<button className='cancel' onClick={cancelPost}>Annuler</button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;