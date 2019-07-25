import * as types from "../../constants/actionTypes";

export function addNewUser(user) {
    return dispatch => {
        return dispatch({
            type: types.ADD_USER,
            payload : user
        });
    };
}
