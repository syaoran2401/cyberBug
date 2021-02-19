import ProjectCategoryReducer from './reducer/ProjectCategoryReducer'
import LoadingReducer from './reducer/LoadingReducer';
import UserLoginJira from './reducer/UserLoginReducer'
import {applyMiddleware,combineReducers, createStore} from 'redux';
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from '../sagas/rootSaga';
import UserLoginReducer from './reducer/UserLoginReducer';
import JiraProjectReducer from './reducer/JiraProjectReducer';
import ModalJiraReducer from './reducer/ModalJiraReducer';
import ProjectReducer from './reducer/ProjectReducer';
import HistoryReducer from './reducer/HistoryReducer';
import UserReducer from './reducer/UserReducer';
import TaskTypeReducer from './reducer/TaskTypeReducer';
import PriorityReducer from './reducer/PriorityReducer';
import StatusReducer from './reducer/StatusReducer';
import TaskReducer from './reducer/TaskReducer';
import CommentReducer from './reducer/CommentReducer';




const middleWareSaga = createMiddleWareSaga();

export const rootReducer = combineReducers({
    UserLoginJira,
    ProjectCategoryReducer,
    LoadingReducer,
    HistoryReducer,
    UserLoginReducer,
    JiraProjectReducer,
    ModalJiraReducer,
    ProjectReducer,
    UserReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer,
})


const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);


export default store