import { USER_SIGN_UP_API } from "../../util/Constants/settingDOMAIN"
import { CREAT_PROJECT_SAGA, USER_LOGIN_API } from "../types/CyberBugsType"

export const jiraUserLoginAction = (email, password) => {
    return {
        type:USER_LOGIN_API,
        userLogin: {
            email:email,
            password:password
        }
    }
}

export const jiraUserSignUpAction = (email, password) =>{
    return {
        type:USER_SIGN_UP_API,
        userSignUpInfo:{
            email:email,
            password:password
        }
    }
}

export const jiraCreatProjectAction = (values)=>{
    return {
        type:CREAT_PROJECT_SAGA,
        newProject: values
    }
}