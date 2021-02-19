import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../types/TaskType"


const initialState = {
  taskDetailModal: {
    "priorityTask": {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail": {
      "id": 1,
      "taskType": "bug"
    },
    "assigness": [
      {
        "id": 6,
        "avatar": "https://ui-avatars.com/api/?name=khải",
        "name": "khải",
        "alias": "khai"
      },
      {
        "id": 25,
        "avatar": "https://ui-avatars.com/api/?name=test",
        "name": "test",
        "alias": "test"
      }
    ],
    "lstComment": [],
    "taskId": 167,
    "taskName": "efefttttttttt",
    "alias": "efefttttttttt",
    "description": "<p>111111111</p>",
    "statusId": "2",
    "originalEstimate": 10,
    "timeTrackingSpent": 10,
    "timeTrackingRemaining": 10,
    "typeId": 1,
    "priorityId": 1,
    "projectId": 201
  }
}

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: action.taskDetailModal }
    }

    case CHANGE_TASK_MODAL: {
      const { name, value } = action
      console.log(state.taskDetailModal)
      return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }
    }

    case CHANGE_ASSIGNESS:{
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.assigness]
      // return {...state, taskDetailModal:{...state.taskDetailModal, assigness: action.assigness}}
      return {...state}
    }

    case REMOVE_USER_ASSIGN:{
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(user => user.id !== action.userId)]
      return {...state}
    }
    default:
      return state
  }
}

export default TaskReducer