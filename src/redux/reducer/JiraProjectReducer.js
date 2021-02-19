import { GET_ALL_PROJECT, GET_PROJECT_LIST } from "../types/CyberBugsType"

const initialState = {
    projectList: [
        {
            id:'1',
            projectName: 'abc',
            description: "<p>12345</p>"
        }
    ],

    // get all project cho dropdown
    arrProject: []
}

const JiraProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PROJECT_LIST: {
            state.projectList = action.projectList
            return { ...state }
        }

        case GET_ALL_PROJECT:{
            return {...state, arrProject: action.arrProject}
        }

        default:
            return state
    }
}

export default JiraProjectReducer
