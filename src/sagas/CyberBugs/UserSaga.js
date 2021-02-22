import { call, delay, put, takeLatest } from "redux-saga/effects"
import { GET_USER_SEARCH, GET_USER_SAGA, ADD_USER_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, REMOVE_USER_PROJECT_SAGA } from "../../redux/types/CyberBugsType"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_ALL_USER, GET_ALL_USER_BY_PROJECT_ID, GET_ALL_USER_BY_PROJECT_ID_SAGA } from "../../redux/types/UserType";
import { userService } from "../../service/UserService"
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";
import { notificationJira } from "../../util/Notifcation/Notification";


// Get User
function* getUserSaga(action) {
    try {
        const { data } = yield call(() => userService.getUser(action.keyword));
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
        yield call(() => userService.assignUserProject(action.userProject));
        if (STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
        }
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
        yield call(() => userService.removeUserProject(action.userProject));
        if (STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_PROJECT_SAGA
            })

        }
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiRemoveUserProject() {
    return yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProject)
}



// get user by projectId
function* getUserByProjectIdSaga(action) {
    try {
        const { data } = yield call(() => userService.getUserByProjectId(action.projectId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER_BY_PROJECT_ID,
                userProject: data.content
            })
        }
    } catch (err) {
        if (STATUS_CODE.NOT_FOUND) {
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


// get all user
function* getAllUserSaga() {

    try {
        const { data } = yield call(() => userService.getAllUser());

        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER,
                arrUser: data.content
            })


        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllUserSaga() {
    yield takeLatest(GET_USER_SAGA, getAllUserSaga)
}


// delete user
function* deleteUserSaga(action) {
    const { userId } = action


    yield put({
        type: DISPLAY_LOADING,
    })

    yield delay(500)

    try {
        yield call(() => userService.deleteUser(userId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_SAGA
            })

        }
    } catch (err) {
        console.log(err.resonse.data)
    }

    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}



// edit user
function* editUserSaga(action) {
    const { model } = action

    try {
        yield call(() => userService.editUser(model));
        if (STATUS_CODE.SUCCESS) {
            notificationJira('success', 'Edit user success !', '');
            yield put({
                type: GET_USER_SAGA
            })
        } else {
            notificationJira('success', 'Edit user fail !', '')
        }

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}