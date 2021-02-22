import { all } from 'redux-saga/effects';
import { theoDoiAddUserProject, theoDoiDeleteUserSaga, theoDoiEditUserSaga, theoDoiGetAllUserByProjectId, theoDoiGetAllUserSaga, theoDoiGetUserSaga, theoDoiRemoveUserProject } from './CyberBugs/UserSaga';
import { theoDoiProjectCategory } from './CyberBugs/ProjectCategorySaga'
import { theoDoiCreateProject, theoDoiGetAllProjectSaga, theoDoiGetListProjectSaga, theoDoiGetProjectDetail } from './CyberBugs/ProjectCreateSaga';
import { theoDoiDeleteProject } from './CyberBugs/ProjectDeleteSaga';
import { theoDoiUpdatedProject } from './CyberBugs/ProjectUpdatedSaga';
import theoDoiUserLoginAPI from './CyberBugs/userLoginSaga';
import theoDoiUserSignUp from './CyberBugs/UserSignUpSaga';
import theodoiGetAllTaskType from './CyberBugs/TaskTypeSaga';
import theoDoiGetAllPriority from './CyberBugs/PrioritySaga';
import { theoDoiCreateTaskSaga, theoDoiGetTaskDetailSaga, theoDoiHandleChangeAPI, theoDoiupdateTaskSaga, theoDoiUpdateTaskStatusSaga } from './CyberBugs/TaskSaga';
import theoDoiGetAllStatusSaga from './CyberBugs/StatusSaga';
import { theoDoiDeleteComment, theoDoiGetAllCommentSaga, theoDoiInsertCommenSaga, theoDoiUpdateComment } from './CyberBugs/CommentSaga';


export function* rootSaga() {
    yield all([
        theoDoiUserLoginAPI(),
        theoDoiUserSignUp(),
        theoDoiProjectCategory(),
        theoDoiCreateProject(),
        theoDoiGetListProjectSaga(),
        theoDoiUpdatedProject(),
        theoDoiDeleteProject(),
        theoDoiGetUserSaga(),
        theoDoiAddUserProject(),
        theoDoiRemoveUserProject(),
        theoDoiGetProjectDetail(),
        theoDoiGetAllProjectSaga(),
        theodoiGetAllTaskType(),
        theoDoiGetAllPriority(),
        theoDoiCreateTaskSaga(),
        theoDoiGetAllStatusSaga(),
        theoDoiGetAllUserByProjectId(),
        theoDoiGetTaskDetailSaga(),
        theoDoiUpdateTaskStatusSaga(),
        theoDoiupdateTaskSaga(),
        theoDoiHandleChangeAPI(),
        theoDoiGetAllCommentSaga(),
        theoDoiDeleteComment(),
        theoDoiInsertCommenSaga(),
        theoDoiUpdateComment(),
        theoDoiGetAllUserSaga(),
        theoDoiDeleteUserSaga(),
        theoDoiEditUserSaga()
    ])
}