import { ADD_USER } from "../../constants/actionTypes";
import objectAssign from "object-assign";
import initialState from "../initialState";

// Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export default function userReducer(state = initialState.User, action) {
    switch (action.type) {
        case ADD_USER:
            return objectAssign({}, state, {
                name: action.payload
            });
        default:
            return state;
    }
}
