import { call, put, select, takeLatest } from "redux-saga/effects";
import { CLOSE_DRAWER, GET_PROJECT_DETAIL_SAGA } from "../../redux/types/CyberBugsType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_TASK_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../../redux/types/TaskType";
import { taskService } from "../../service/TaskService";
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";
import { notificationJira } from "../../util/Notifcation/Notification";

function* createTaskSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    try {

        const { data, status } = yield call(() => taskService.createTask(action.taskObject));
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }

        yield put({
            type: CLOSE_DRAWER
        })
        notificationJira('success', 'Create task success !',)
    } catch (err) {
        console.log(err.reponse.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiCreateTaskSaga() {
    return yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}





// get Task Detail
function* getTaskDetailSaga(action) {

    const { taskId } = action
    try {
        const { data } = yield call(() => taskService.getTaskDetail(taskId));

        if (STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })
        }
    } catch (err) {
        console.log(err.response?.data)
    }
}
export function* theoDoiGetTaskDetailSaga() {
    return yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}




// update status task
function* updateTaskStatusSaga(action) {
    const { taskUpdateStatus } = action
    try {
        const { data } = yield call(() => taskService.updateStatusTask(taskUpdateStatus));
        if (STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateStatus.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiUpdateTaskStatusSaga() {
    return yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}


// update task 
function* updateTaskSaga(action) {

}

export function* theoDoiupdateTaskSaga() {
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga)
}



// SAGA trung gian => thay đổi data ở task model xong, mới gọi API gửi update
function* handleChangePostAPI(action) {
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { name, value } = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });
            break;
        }

        case CHANGE_ASSIGNESS: {
            const { assigness } = action
            yield put({
                type: CHANGE_ASSIGNESS,
                assigness
            });
            break;
        }

        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            });
            break;
        }
        default:
            break
    }

    //lấy task detail ở reducer sau khi thay đổi
    let { taskDetailModal } = yield select(state => state.TaskReducer);

    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id
    })

    const taskUpdateAPI = { ...taskDetailModal, listUserAsign };

    try {
        const { data } = yield call(() => taskService.updateTask(taskUpdateAPI));

        if (STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateAPI.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateAPI.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiHandleChangeAPI() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostAPI)
}