import { call, put, select, takeLatest } from 'redux-saga/effects'
import { CREAT_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, GET_PROJECT_LIST } from '../../redux/types/CyberBugsType';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../redux/types/LoadingStyle';
import { GET_ALL_USER_BY_PROJECT_ID_SAGA } from '../../redux/types/UserType';
import { creatProjectAuthorize, getAllProject } from '../../service/CyberBugsService';
import { projectService } from '../../service/ProjectService';
import { STATUS_CODE } from '../../util/Constants/settingDOMAIN';


function* createProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        const { data, status } = yield call(() => creatProjectAuthorize(action.newProject));

        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }
    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateProject() {
    yield takeLatest(CREAT_PROJECT_SAGA, createProjectSaga);
}

// SAGA get list project from API
function* getListProjectSaga() {

    try {
        const { data, status } = yield call(() => getAllProject());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_LIST,
                projectList: data.content
            })

            const history = yield select(state => state.HistoryReducer.history);
            history.push('/projectmanagement')

        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getListProjectSaga)
}



// SAGA getprojectDetail from API
function* getProjectDetailSaga(action) {

    yield put ({
        type:DISPLAY_LOADING
    })

    try {
        const { data } = yield call(() => projectService.getProjectDetail(action.projectId));

        yield put({
            type:GET_PROJECT_DETAIL,
            projectDetail: data.content
        })

    } catch (err) {
        console.log(err.response.data);
        const history = yield select(state => state.HistoryReducer.history);
        history.push('/projectmanagement')
    }

    yield put ({
        type:HIDE_LOADING
    })
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga)
}



// SAGA get all project from API
function* getAllProjectSaga() {

    try {
        const { data, status } = yield call(() => projectService.getAllProject());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT,
                arrProject: data.content
            })

            yield put ({
                type:GET_ALL_USER_BY_PROJECT_ID_SAGA,
                projectId: data.content[0].id
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}