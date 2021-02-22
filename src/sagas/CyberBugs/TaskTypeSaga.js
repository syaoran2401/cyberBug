import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../redux/types/TaskTypeConstant";
import { taskTypeService } from "../../service/TaskTypeService";
import { STATUS_CODE } from "../../util/Constants/settingDOMAIN";


function * getAllTaskType(action){
    try{
        const {data} =  yield call(() =>taskTypeService.getAllTaskType())

        if(STATUS_CODE.SUCCESS){
            console.log(data)
        }
        yield put({
            type:GET_ALL_TASK_TYPE,
            arrTaskType: data.content
        })

    }catch(err){
        console.log(err.response.data)
    }
}


export default function * theodoiGetAllTaskType(){
    return yield takeLatest(GET_ALL_TASK_TYPE_SAGA,getAllTaskType)
}