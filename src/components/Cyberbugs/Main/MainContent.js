import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { GET_ALL_COMMENT_SAGA } from '../../../redux/types/CommentTypes';
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../redux/types/TaskType';


export default function MainContent(props) {

    const { projectDetail } = props;
    const dispatch = useDispatch()

    const handleDragEnd = res => {
        let { destination, source } = res;
        let { projectId, taskId } = JSON.parse(res.draggableId);
        if (!destination) {
            return
        }
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return
        }

        dispatch({
            type: UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: {
                "taskId": taskId,
                "statusId": destination.droppableId,
                'projectId': projectId
            }
        })
    }

    //card Task List
    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={(res) => {
            handleDragEnd(res)
        }}>
            {projectDetail.lstTask?.map((taskListDetail, index) => {
                return <Droppable key={index} droppableId={taskListDetail.statusId} >
                    {(provided) => {
                        return <div
                            className="card" style={{ width: '17rem', height: 'auto' }}
                            key={index}
                            ref={provided.innerRef}
                            {...provided.droppableProps} >
                            <div className="card-header">
                                {taskListDetail.statusName}
                            </div>
                            <div className="list-group list-group-flush" style={{ height: '100' }}>
                                {renderSectionInfo(taskListDetail)}
                            </div>
                            {provided.placeholder}
                        </div>
                    }}
                </Droppable>
            })
            }
        </DragDropContext>
    }


    //Task List Info
    const renderSectionInfo = (taskListDetail) => {
        return taskListDetail.lstTaskDeTail.map((task, index) => {
            return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({
                projectId: task.projectId,
                taskId: task.taskId
            })} >
                {(provided) => {
                    return <div
                        key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => {
                            dispatch({
                                type: GET_TASK_DETAIL_SAGA,
                                taskId: task.taskId
                            })
                            dispatch({
                                type:GET_ALL_COMMENT_SAGA,
                                taskId:task.taskId
                            })
                        }}>
                        <p className='font-weight-bold'>
                            {task.taskName}
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <p className='text-danger'>{task.priorityTask.priority}</p>
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    {/* Render member in task */}
                                    {task.assigness.map((mem, index) => {
                                        return <div key={index} className="avatar">
                                            <img src={mem.avatar} alt={mem.avatar} />
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }}

            </Draggable>

        })
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>

    )
}
