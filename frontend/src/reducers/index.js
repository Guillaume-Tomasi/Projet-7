import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import likeReducer from "./like.reducer";

// Information des éléments stockés dans le store

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    likeReducer
}
)