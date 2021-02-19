import { GET_ALL_STATUS } from "../types/StatusType"

const initialState = {
    arrStatus:[]
}

const StatusReducer =   (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_STATUS :{
        state.arrStatus = action.arrStatus
        return { ...state}
    }

    default:
        return state
    }
}


export default StatusReducer