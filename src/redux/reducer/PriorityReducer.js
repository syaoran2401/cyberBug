import { GET_ALL_PRIORITY_TYPE } from "../types/PriorityType"


const initialState = {
    arrPriority : []
}

const PriorityReducer =  (state = initialState, action) => {
    switch (action.type) {
    
    case GET_ALL_PRIORITY_TYPE:
        return { ...state, arrPriority: action.arrPriority }

    default:
        return state
    }
}

export default PriorityReducer