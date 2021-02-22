import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParse from 'react-html-parser'
import { GET_ALL_STATUS_SAGA } from '../../../redux/types/StatusType';
import { GET_ALL_PRIORITY_TYPE_SAGA } from '../../../redux/types/PriorityType';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN } from '../../../redux/types/TaskType';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/types/TaskTypeConstant';
import { Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { DELETE_COMMENT_SAGA,  INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../../redux/types/CommentTypes';


export default function ModalCyberBug(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const { userComment } = useSelector(state => state.CommentReducer);
    const { userLogin } = useSelector(state => state.UserLoginReducer);
    const [visibleEditor, setVisibleEditor] = useState(false);
    const [visibleCommentEditor, setVisibleCommentEditor] = useState(false);
    const [visibleAddComment, setVisibleAddComment] = useState(false)
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description)

    const [selectedComment, setSelectedComment] = useState()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_STATUS_SAGA,
        });
        dispatch({
            type: GET_ALL_PRIORITY_TYPE_SAGA,
        });
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
    }, [])

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParse(taskDetailModal.description);
        return <div >
            {visibleEditor ?
                <div>
                    <Editor
                        name="description"
                        initialValue={taskDetailModal.description}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={(content, editor) => {
                            setContent(content)
                        }}
                    />
                    <button className='btn btn-primary mt-2' onClick={() => {
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODAL,
                            name: 'description',
                            value: content
                        })
                        // dispatch({
                        //     type: CHANGE_TASK_MODAL,
                        //     name: 'description',
                        //     value: content
                        // })
                        setVisibleEditor(false)
                    }}>Save</button>
                    <button className='btn btn-primary ml-3 mt-2' onClick={() => {
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODAL,
                            name: 'description',
                            value: historyContent
                        })
                        // dispatch({
                        //     type: CHANGE_TASK_MODAL,
                        //     name: 'description',
                        //     value: historyContent
                        // })
                        setVisibleEditor(false)
                    }}>Cancel</button>
                </div>
                :
                <div onClick={() => {
                    setHistoryContent(taskDetailModal.description)
                    setVisibleEditor(!visibleEditor)
                }}> {jsxDescription}</div>}

        </div>
    }

    const renderStatus = () => {
        return arrStatus.map((status, index) => {
            return <option value={status.statusId} key={index}>{status.statusName}</option>
        })
    }


    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: '100%' }}>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                            <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
                        </div>
                    </div>
                </div>


                <div className='row'>
                    <div className="col-6">
                        <input className='form-control' name='timeTrackingSpent' type="text" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="col-6">
                        <input className='form-control' name='timeTrackingRemaining' type="text" onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
        )
    }

    const renderAddComment = () => {
        return <div className='d-flex align-items-center' style={{ border: '1px solid black', minWidth: '388px' }}>

            {visibleAddComment ? <div>
                <Editor
                    name="description"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                                   alignleft aligncenter alignright alignjustify | \
                                   bullist numlist outdent indent | removeformat | help",
                    }}
                    onEditorChange={(content, editor) => {
                        setContent(content)
                    }}
                />
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary' onClick={() => {
                        dispatch({
                            type: INSERT_COMMENT_SAGA,
                            taskId: taskDetailModal.taskId,
                            model: {
                                taskId: taskDetailModal.taskId,
                                contentComment: content
                            }
                        })
                        setVisibleAddComment(false)
                    }}>Save</button>

                    <button className='btn btn-danger mx-3' onClick={() => {
                        setVisibleAddComment(false)
                    }}>Close</button>
                </div>
            </div>

                :
                <div className='ml-2' onClick={() => {
                    setVisibleAddComment(true)
                }}>Add a comment ...
            </div>}
        </div>
    }


    const deleteComment = (idUser, idComment) => {
        const index = taskDetailModal.assigness.findIndex(item => item.id === idUser);
        if (index !== -1) {
            dispatch({
                type: DELETE_COMMENT_SAGA,
                idComment,
                taskId: taskDetailModal.taskId
            })
        }
    }


    const renderUserComment = () => {
        return userComment.map((item, index) => {
            const jsxComment = ReactHtmlParse(item.contentComment);

            return <div className="comment-item mt-3" key={index}>
                <div>{item.name}</div>
                <div className="comment-item">
                    <div className="display-comment" style={{ display: 'flex' }}>
                        <div className="avatar">
                            <img src={item.user.avatar} alt='download1' />
                        </div>

                        <div>
                            {(visibleCommentEditor && selectedComment.id === item.id) ? <div>
                                <Editor
                                    name="description"
                                    initialValue={item.contentComment}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | \
                                   alignleft aligncenter alignright alignjustify | \
                                   bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={(content, editor) => {
                                        setContent(content)
                                    }}
                                />
                                <button onClick={() => {
                                    dispatch({
                                        type: UPDATE_COMMENT_SAGA,
                                        taskId: taskDetailModal.taskId,
                                        id: item.id,
                                        contentComment: content
                                    })
                                    setVisibleCommentEditor(false)
                                }}>Save</button>
                                <button onClick={() => {
                                    setVisibleCommentEditor(false)
                                }}>Cancel</button>
                            </div>
                                : <div >{jsxComment} </div>}


                            {userLogin.id === item.user.userId ? <div>
                                <span className='mr-2' style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                    setSelectedComment(item)
                                    setVisibleCommentEditor(true)
                                }}>Edit</span>
                                    •
                                    <span className='ml-2' style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                    const userId = item.userId;
                                    const idComment = item.id
                                    deleteComment(userId, idComment)
                                }}>Delete</span>
                            </div> : ' '}


                        </div>
                    </div>
                </div>
            </div>
        })

    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })


        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name,
        //     value
        // })
    }

    return (
        // <!-- Search Modal -->
        <div>
            <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModal" aria-hidden="true">
                <div className="modal-dialog modal-search">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="search-block">
                                <input className="search" />
                                <i className="fa fa-search" />
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>RECENT ISSUES</p>
                            <div style={{ display: 'flex' }}>
                                <div className="icon">
                                    <i className="fa fa-bookmark" />
                                </div>
                                <div>
                                    <p>cyberlearn</p>
                                    <p>BUG-238066</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // Info Modal */}
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name='typeId' value={taskDetailModal.typeId} onChange={(e) => handleChange(e)}>
                                    {arrTaskType.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.taskType}</option>
                                    })}
                                </select>

                                <span>{taskDetailModal.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <p className='font-weight-bold'>Description</p>
                                            {renderDescription()}
                                        </div>

                                        <div className="comment mt-4">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src={userLogin.avatar} alt='download1' />
                                                </div>
                                                {renderAddComment()}
                                             
                                            </div>
                                            <div className="lastest-comment">
                                                {renderUserComment()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                                                handleChange(e)
                                                // const action = {
                                                //     type:UPDATE_STATUS_TASK_SAGA,
                                                //     taskUpdateStatus:{
                                                //         taskId:taskDetailModal.taskId,
                                                //         statusId: e.target.value,
                                                //         projectId: taskDetailModal.projectId
                                                //     }
                                                // }
                                                // dispatch(action)
                                            }}>
                                                {renderStatus()}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className='row'>
                                                {taskDetailModal.assigness.map((mem, index) => {
                                                    return <div key={index} className='col-6 my-1 '>
                                                        <div  style={{ display: 'flex' }} className="item">
                                                            <div className="avatar">
                                                                <img src={mem.avatar} alt='download1' />
                                                            </div>
                                                            <p className="name mt-1  ml-1">
                                                                {mem.name}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {

                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: mem.id
                                                                    })

                                                                    // dispatch({
                                                                    //     type: REMOVE_USER_ASSIGN,
                                                                    //     userId: mem.id
                                                                    // })
                                                                }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                })}

                                                <div className='col-6 my-4'>
                                                    <Select
                                                        // hàm filter => lọc member đã có ra khỏi thẻ option
                                                        options={projectDetail.members?.filter(member => {
                                                            let index = taskDetailModal.assigness?.findIndex(assigness => assigness.id === member.userId);
                                                            if (index !== -1) {
                                                                return false
                                                            }
                                                            return true;
                                                        })?.map((mem) => {
                                                            return { value: mem.userId, label: mem.name }
                                                        })}
                                                        optionFilterProp='label'
                                                        style={{ width: '100%' }}
                                                        className='form-control'
                                                        name='listUser'
                                                        value='+ Add More'
                                                        onSelect={(value) => {
                                                            if (value == '0') {
                                                                return
                                                            }
                                                            let userSelect = projectDetail.members.find(mem => mem.userId == value);
                                                            userSelect = { ...userSelect, id: userSelect.userId };

                                                            //dispatch reducer

                                                            dispatch({
                                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                                actionType: CHANGE_ASSIGNESS,
                                                                assigness: userSelect
                                                            })

                                                            // dispatch({
                                                            //     type: CHANGE_ASSIGNESS,
                                                            //     assigness: userSelect
                                                            // })
                                                        }}>

                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name='priorityId' className='form-control' value={taskDetailModal.priorityId} onChange={(e) => {
                                                handleChange(e)
                                            }}>
                                                {arrPriority.map((item, index) => {
                                                    return <option value={item.priorityId} key={index}>{item.priority}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name='originalEstimate' type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => handleChange(e)} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {renderTimeTracking()}

                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
