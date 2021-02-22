import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_PRIORITY_TYPE, GET_ALL_PRIORITY_TYPE_SAGA } from "../../redux/types/PriorityType";
import { priorityService } from "../../service/PriorityService";
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";

export function * getAllPrioritySaga(action){
    try{
        const {data} =  yield call(() => priorityService.getAllPriority())
        if(STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_PRIORITY_TYPE,
                arrPriority: data.content
            })
        }

    }catch(err){
        console.log(err.response.data)
    }
}

export default function * theoDoiGetAllPriority(){
    return yield takeLatest(GET_ALL_PRIORITY_TYPE_SAGA,getAllPrioritySaga)
}