import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';



export const getPosts = () => {
    return (dispatch) => {
        axios({
            method: "get",
            url: "http://localhost:3000/api/post",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch((err) => console.log(err))
    };
};

export const addPost = (data) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: "http://localhost:3000/api/post",
            data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch(getPosts());
            })

    };
}

export const updatePost = (postId, content) => {
    return (dispatch) => {
        axios({
            method: "put",
            url: `http://localhost:3000/api/post/${postId}`,
            data: { content },
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { content, postId } });
                dispatch(getPosts());
            })
            .catch((err) => console.log(err));
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        axios({
            method: "delete",
            url: `http://localhost:3000/api/post/${postId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch(getPosts());
            })
            .catch((err) => console.log(err));
    }
}