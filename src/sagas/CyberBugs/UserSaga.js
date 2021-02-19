import { call, put, takeLatest } from "redux-saga/effects"
import { GET_USER_SEARCH, GET_USER_SAGA, ADD_USER_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, REMOVE_USER_PROJECT_SAGA } from "../../redux/types/CyberBugsType"
import { GET_ALL_USER_BY_PROJECT_ID, GET_ALL_USER_BY_PROJECT_ID_SAGA } from "../../redux/types/UserType";
import { userService } from "../../service/UserService"
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";


// Get User
function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword));
        console.log(data);
        yield put({
            type: GET_USER_SEARCH,
            listUserSearch: data.content

        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiGetUserSaga() {
    return yield takeLatest(GET_USER_SAGA, getUserSaga)
}



// Add User
function* addUserProject(action) {
    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));
        yield put({
            type: GET_ALL_PROJECT_SAGA
        })
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiAddUserProject() {
    return yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProject)
}



// Remove User
function* removeUserProject(action) {
    try {
        const { data, status } = yield call(() => userService.removeUserProject(action.userProject));
        yield put({
            type: GET_ALL_PROJECT_SAGA
        })
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiRemoveUserProject() {
    return yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProject)
}



// get user by projectId
function* getUserByProjectIdSaga(action) {
    console.log(action)
    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(action.projectId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER_BY_PROJECT_ID,
                userProject: data.content
            })
        }
    } catch (err) {
        if(STATUS_CODE.NOT_FOUND){
            console.log(err.response.data)
            yield put({
                type: GET_ALL_USER_BY_PROJECT_ID,
                userProject: []
            })
        }
    }

}

export function* theoDoiGetAllUserByProjectId() {
    return yield takeLatest(GET_ALL_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}