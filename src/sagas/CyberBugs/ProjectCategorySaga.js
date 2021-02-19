import {call, put, takeLatest } from 'redux-saga/effects'
import { GET_ALL_PROJECT_CATEGORY, GET_PROJECT_CATEGORY } from '../../redux/types/CyberBugsType';
import { getAllProjectCategory } from '../../service/CyberBugsService';
import { STATUS_CODE } from '../../util/Constants/settingDOMAIN';


function* getAPIProjectCategory(action){
    try{
        const {data, status} = yield call(()=>getAllProjectCategory());

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:GET_PROJECT_CATEGORY,
                data: data.content
            })
        }
    }catch(err){    
        console.log(err.respond.data)
    }
}

export function* theoDoiProjectCategory(){
    yield takeLatest(GET_ALL_PROJECT_CATEGORY,getAPIProjectCategory)
}