import { EDIT_PROJECT, GET_PROJECT_DETAIL } from "../types/CyberBugsType";

const initialState = {
    projectEditInfo :{
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string123",
        "categoryId": "<h1>1234</h1>"
    },

    projectDetail:{

    }
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

    case EDIT_PROJECT:{
        state.projectEditInfo = action.projectEditInfo;
        return { ...state }
    }

    case GET_PROJECT_DETAIL:{
        state.projectDetail = action.projectDetail;
        return { ...state }
    }

    default:
        return state
    }
}


export default ProjectReducer;