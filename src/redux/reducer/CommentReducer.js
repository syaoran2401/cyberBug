import { GET_ALL_COMMENT } from "../types/CommentTypes"

const initialState = {
    userComment :
    [
        {
          "user": {
            "userId": 6,
            "name": "khải",
            "avatar": "https://ui-avatars.com/api/?name=khải"
          },
          "id": 61,
          "userId": 6,
          "taskId": 173,
          "contentComment": "123456",
          "deleted": false,
          "alias": "123456"
        },
      
      ],
       
      
}

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_COMMENT:
        return { ...state, userComment: action.userComment}

    default:
        return state
    }
}

export default CommentReducer