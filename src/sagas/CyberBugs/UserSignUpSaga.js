import { call, put, select, takeLatest } from "redux-saga/effects";
import { STATUS_CODE, USER_SIGN_UP_API } from "../../util/Constants/settingDOMAIN";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { userSignUpJiraAPI } from "../../service/CyberBugsService";



function * userSignUpAPI (action) {  
 
    yield put({
        type:DISPLAY_LOADING
    })
    
    try{
        const {data, status} = yield call(()=>userSignUpJiraAPI(action.userSignUpInfo));

        if(STATUS_CODE.SUCCESS){
            const history = yield select(state => state.HistoryReducer.history);
            history.push('/home')
        }
    }catch(err){
        console.log(err.response.data)
    }

    yield put({
        type:HIDE_LOADING
    })

}

export default function* theoDoiUserSignUp() {
    yield takeLatest(USER_SIGN_UP_API, userSignUpAPI)
}