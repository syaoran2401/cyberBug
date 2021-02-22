import { GET_USER_SEARCH } from "../types/CyberBugsType"
import { DISABLE_EDIT_CURRENT_USER, ENABLE_EDIT_CURRENT_USER, GET_ALL_USER, GET_ALL_USER_BY_PROJECT_ID, GET_CURRENT_USER } from "../types/UserType";

const initialState = {
    userSearch: [],
    arrUserInProject: [],
    arrUser: [],
    selectedUser: [],
    editFieldVisible: {
        status: false
    }
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_SEARCH: {
            state.userSearch = action.listUserSearch;
            return { ...state }
        }

        case GET_ALL_USER_BY_PROJECT_ID: {
            return { ...state, arrUserInProject: action.userProject }
        }

        case GET_ALL_USER: {
            return { ...state, arrUser: action.arrUser }
        }

        case GET_CURRENT_USER: {
            return { ...state, selectedUser: action.selectedUser }
        }

        case ENABLE_EDIT_CURRENT_USER: {
            state.editFieldVisible = true;
            return { ...state }
        }

        case DISABLE_EDIT_CURRENT_USER: {
            state.editFieldVisible = false;
            return { ...state }
        }

        default:
            return state
    }
}

export default UserReducer;