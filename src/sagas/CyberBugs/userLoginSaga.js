import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { ACCESS_TOKEN, USER_LOGIN_INFO } from "../../util/Constants/settingDOMAIN";
import { USER_LOGIN_API } from "../../util/Constants/settingDOMAIN";
import {userLoginJirasAPI} from '../../service/CyberBugsService'
import { USER_LOGIN } from "../../redux/types/CyberBugsType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingStyle";

export function* userLoginSaga(action){
    
    yield put({
        type:DISPLAY_LOADING,
    })

    yield delay(500)

    try{
        const {data} = yield call (()=>userLoginJirasAPI(action.userLogin));
        console.log(data.content)
        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN_INFO,JSON.stringify(data.content))

        yield put({
            type:USER_LOGIN,
            data: data.content
        })

        const history = yield select(state => state.HistoryReducer.history);
        history.push('/home')

    }catch(err){
        console.log(err.response.data)
    }

    yield put({
        type:HIDE_LOADING,
    })

}

export default function* theoDoiUserLoginAPI (){
    yield takeLatest(USER_LOGIN_API,userLoginSaga)
}