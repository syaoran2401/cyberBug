import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CLOSE_DRAWER, GET_ALL_PROJECT_SAGA, UPDATED_PROJECT_SAGA } from "../../redux/types/CyberBugsType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { updateProject } from "../../service/CyberBugsService";
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";



function* updatedProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)

    try {
        const { data, status } = yield call(() => updateProject(action.projectUpdate));

        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }

        yield put({
            type:GET_ALL_PROJECT_SAGA
        })

        yield put({
            type:CLOSE_DRAWER
        })


    } catch (err) {
        console.log(err);
    }
    

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiUpdatedProject() {
    yield takeLatest(UPDATED_PROJECT_SAGA, updatedProjectSaga);
}

