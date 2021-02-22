import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd'
import { withFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA, GET_USER_SAGA, SUBMIT_CREATE_TASK } from '../../redux/types/CyberBugsType';
import { GET_ALL_PRIORITY_TYPE_SAGA } from '../../redux/types/PriorityType';
import { GET_ALL_TASK_TYPE_SAGA } from '../../redux/types/TaskTypeConstant';
import * as Yup from 'yup';
import { CREATE_TASK_SAGA } from '../../redux/types/TaskType';
import { GET_ALL_STATUS_SAGA } from '../../redux/types/StatusType';
import { GET_ALL_USER_BY_PROJECT_ID_SAGA } from '../../redux/types/UserType';

const children = [];

function FormCreateTask(props) {

    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    //hook
    const [size] = useState('default');
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })
    const { arrProject } = useSelector(state => state.JiraProjectReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrUserInProject } = useSelector(state => state.UserReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const userOption = arrUserInProject.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        });
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        });
        dispatch({
            type: GET_ALL_PRIORITY_TYPE_SAGA,
        });
        dispatch({
            type: GET_USER_SAGA,
            keyword: ''
        })
        dispatch({
            type: GET_ALL_STATUS_SAGA,
        })
        dispatch({
            type:SUBMIT_CREATE_TASK,
            submitFunction: handleSubmit
        })
    }, [])




    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    const renderAllProject = () => {
        return arrProject?.map((item, index) => {
            return <option key={index} value={item.id}>{item.projectName}</option>
        })
    }

    const renderTaskType = () => {
        return arrTaskType?.map((item, index) => {
            return <option key={index} value={item.id}>{item.taskType}</option>
        })
    }

    const renderPriority = () => {
        return arrPriority.map((item, index) => {
            return <option value={item.priorityId} key={index}>{item.priority}</option>
        })
    }


    const renderStatusId = () => {
        return arrStatus?.map((item, index) => {
            return <option value={item.statusId} key={index}>{item.statusName}</option>
        })
    }


    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p className='mb-0 mt-2'>Project</p>
                <select className='form-control' name='projectId' onChange={(e)=>{

                    // dispatch gia tri lam thay doi user
                    let {value} = e.target;
                    dispatch({
                        type:GET_ALL_USER_BY_PROJECT_ID_SAGA,
                        projectId: value
                    })

                    // cap nhat gia tri cho project Id
                    setFieldValue('projectId', e.target.value)
                }}>
                    {renderAllProject()}
                </select>
            </div>

            <div className='form-group'>
                <p className='mb-0 mt-2'>Task name</p>
                <input className='form-control' type="text" name='taskName' onChange={handleChange} />
            </div>

            <div className='form-group'>
                <p className='mb-0 mt-2'>Status ID</p>
                <select className='form-control' name='statusId' onChange={handleChange}>
                    {renderStatusId()}
                </select>
            </div>

            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p className='mb-0 mt-2'>Priority</p>
                        <select className='form-control' name='priorityId' onChange={handleChange}>
                            {renderPriority()}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p className='mb-0 mt-2'>Task type</p>
                        <select className='form-control' name='typeId' onChange={handleChange}>
                            {renderTaskType()}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p className='mb-0 mt-2'>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userOption}
                            placeholder="Please select"
                            optionFilterProp='label'
                            // Khi ko fai là thẻ select bình thường, mà mún lấy value thi fai dùng hàm setFieldValue
                            onChange={(values) => {
                                // Set lai gia tri cho listUserAsign
                                setFieldValue('listUserAsign', values)
                            }}
                            onSearch={(value) => {
                               

                            }}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>

                        <div className='row' style={{ marginTop: '32px' }}>
                            <div className='col-12'>
                                <p>Original Estimate</p>
                                <input type="number" defaultValue='0' min='0' className='form-control' name='originalEstimate' onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className='col-6 mt-3'>
                        <p>Time Tracking</p>
                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} onChange={handleChange} />
                        <div className='row'>
                            <div className='col-6'>
                                <div className='text-left font-weight-bold'>{timeTracking.timeTrackingSpent} logged</div>
                            </div>
                            <div className='col-6'>
                                <div className='text-right font-weight-bold'>{timeTracking.timeTrackingRemaining} remaining</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <p className='mb-0 mt-2'>Time spent</p>
                                <input type="number" defaultValue='0' min='0' className='form-control' name='timeTrackingSpent' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })
                                    setFieldValue('timeTrackingSpent', e.target.value)
                                }} />
                            </div>
                            <div className='col-6'>
                                <p className='mb-0 mt-2'>Time remaining</p>
                                <input type="number" defaultValue='0' min='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                    setFieldValue('timeTrackingRemaining', e.target.value)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='form-group'>
                <p>Description</p>
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
                    onEditorChange={handleEditorChange}
                />
            </div>
            {/* <button type='submit'>submit</button> */}
        </form>
    )
}


const createTaskForm = withFormik({
    // enableReinitialize => mỗi lần redux thay đổi thì sẽ chạy lại hàm projectSettingForm
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProject, arrTaskType, arrPriority, arrStatus } = props
        // if(arrProject.length> 0){
        //     props.dispatch({
        //         type:GET_ALL_USER_BY_PROJECT_ID_SAGA,
        //         projectId:  arrProject[0]?.id
        //     })
        // }
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },

    validationSchema: Yup.object().shape({
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
      
        props.dispatch({
            type: CREATE_TASK_SAGA,
            taskObject: values
        })
    },

    displayName: 'create task form',
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        arrProject: state.JiraProjectReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus
    }
}

export default connect(mapStateToProps)(createTaskForm)