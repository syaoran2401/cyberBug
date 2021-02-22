import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../redux/types/CommentTypes'
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { commentService } from "../../service/CommentService";
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";

function* getAllCommentSaga(action) {
    const { taskId } = action

    try {
        const { data } = yield call(() => commentService.getAllComment(taskId))

        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT,
                userComment: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}


function* deleteCommentSaga(action) {
    const { idComment, taskId } = action;
    yield put({
        type: DISPLAY_LOADING
    })

    try {
        yield call(() => commentService.deleteComment(idComment))
        if (STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiDeleteComment() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}



function* insertCommentSaga(action) {
    const { taskId, model } = action;

    try {
        yield call(() => commentService.insertComment(model))
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiInsertCommenSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga)
}


function* updateComment(action) {
    const { id, contentComment, taskId } = action;

    try {
        yield call(() => commentService.updateComment(id, contentComment))
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiUpdateComment() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateComment)
}