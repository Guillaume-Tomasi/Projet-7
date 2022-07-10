import axios from 'axios';

export const GET_LIKES = 'GET_LIKES';

// Récupération de tous les likes

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

// Création d'un like

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

// Suppression d'un like

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