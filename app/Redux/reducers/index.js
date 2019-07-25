import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./User/UserReducer";

export default history =>
    combineReducers({
        router: connectRouter(history),
        userReducer
    });
