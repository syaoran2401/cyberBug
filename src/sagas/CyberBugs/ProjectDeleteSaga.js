import { call, delay, put, takeLatest } from "redux-saga/effects";
import { DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA } from "../../redux/types/CyberBugsType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { projectService } from "../../service/ProjectService";
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";
import { notificationJira } from "../../util/Notifcation/Notification";



function* deleteProjectSaga(action) {
    console.log("action", action)


    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)

    try {
        // const { data, status } = yield call(() =>deleteProjectTest(action.idProject));
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject))
        console.log(data)
        console.log(status)

        if (status === STATUS_CODE.SUCCESS) {
            notificationJira('success', 'Deleted project successful !', '')
        } else {
            notificationJira('success', 'Deleted project fail !', '')
        }

        yield put({
            type: GET_ALL_PROJECT_SAGA
        })

    } catch (err) {
        console.log(err.response.data);
        notificationJira('success', 'Deleted project fail !', '')
    }


    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

