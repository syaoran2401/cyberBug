import { GET_USER_SEARCH } from "../types/CyberBugsType"
import { GET_ALL_USER_BY_PROJECT_ID } from "../types/UserType";

const initialState = {
    userSearch : [],
    arrUserInProject:[]

}

const UserReducer =  (state = initialState, action) => {
    switch (action.type) {

    case GET_USER_SEARCH:{
        state.userSearch = action.listUserSearch;
        return { ...state }
    }

    case GET_ALL_USER_BY_PROJECT_ID:{
        return {...state, arrUserInProject:action.userProject}
    }

    default:
        return state
    }
}

export default UserReducer;