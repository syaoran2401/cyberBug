import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../redux/types/StatusType";
import { statusService } from "../../service/StatusService";


function * getAllStatusSaga(action){

    try{
        const {data} = yield call(()=> statusService.getAllStatus());

        yield put({
            type: GET_ALL_STATUS,
            arrStatus: data.content
        })
    }catch(err){
        console.log(err.response?.data)
    }
}

export default function * theoDoiGetAllStatusSaga(){
    return yield takeLatest(GET_ALL_STATUS_SAGA,getAllStatusSaga)
}