import { call, put, select, takeLatest } from "redux-saga/effects";
import { STATUS_CODE, USER_SIGN_UP_API } from "../../util/Constants/settingDOMAIN";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";
import { userService } from "../../service/UserService";



function * userSignUpAPI (action) {  
    const {model} = action
 
    yield put({
        type:DISPLAY_LOADING
    })
    
    try{
        const {data} = yield call(()=>userService.userSignUp(model));

        if(STATUS_CODE.SUCCESS){
            console.log(data)
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