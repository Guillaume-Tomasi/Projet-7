import axios from 'axios';

export const GET_LIKES = 'GET_LIKES';
// export const LIKE_POST = 'LIKE_POST';
// export const UNLIKE_POST = 'UNLIKE_POST';


export const getLikes = () => {
    return (dispatch) => {
        axios({
            method: "get",
            url: "http://localhost:3000/api/like",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch({ type: GET_LIKES, payload: res.data })
            })
            .catch((err) => console.log(err))
    };
};

export const likePost = (post_id, type) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: "http://localhost:3000/api/like",
            data: {
                post_id,
                type
            },
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch(getLikes());
            })
            .catch((err) => console.log(err))
    }
}

export const unlikePost = (likeId) => {
    return (dispatch) => {
        axios({
            method: "delete",
            url: `http://localhost:3000/api/like/${likeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
        })
            .then((res) => {
                dispatch(getLikes());
            })
            .catch((err) => console.log(err));
    }
}