import { ADD_HISTORY } from "../types/CyberBugsType"

const initialState = {
    history: ''
}

const HistoryReducer =  (state = initialState, action) => {
    switch (action.type) {

    case ADD_HISTORY:{
        state.history = action.history
        return { ...state }
    }

    default:
        return state
    }
}

export default HistoryReducer