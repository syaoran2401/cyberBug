import { USER_LOGIN_INFO } from "../../util/Constants/settingDOMAIN"
import { USER_LOGIN } from "../types/CyberBugsType"


let userLoginLocalStorage = {};
if(localStorage.getItem(USER_LOGIN_INFO)){
    userLoginLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN_INFO))
}

const initialState = {
    userLogin :userLoginLocalStorage
}

const UserLoginReducer  = (state = initialState, action) => {
    switch (action.type) {  
        case USER_LOGIN:
       state.userLogin = action.data
        return { ...state }

    default:
        return state
    } 
}

export default UserLoginReducer
