import React, { useState, useEffect, useRef } from 'react'
import { Table,  Button, Space, Tag, Popconfirm, Popover, AutoComplete, } from 'antd';
import {  DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_ALL_PROJECT_SAGA, GET_USER_SAGA,  OPEN_FORM, ADD_USER_PROJECT_SAGA, REMOVE_USER_PROJECT_SAGA } from '../../redux/types/CyberBugsType';
import FormsEditProject from '../../components/Forms/FormsEditProject';
import Avatar from 'antd/lib/avatar/avatar';
import { NavLink } from 'react-router-dom';



export default function ProjectManagement(props) {

    const projectList = useSelector(state => state.JiraProjectReducer.projectList);
    const { userSearch } = useSelector(state => state.UserReducer);

    // Hàm useState để set giá trị ban đầu của value trong AutoComplete
    const [value, setValue] = useState('');

    const searchRef = useRef(null)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })
    }, [])


    const [state,setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };


    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item1, item2) => {
                // if item2 - item1 < 0 => hoan' vi.
                return item2.id - item1.id
            },
            // sortDirections: ['descend'],

        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) =>{
                return <NavLink to={`/projectDetail/${record.id}`} onClick={()=>{
                    // dispatch({
                    //     type:GET_PROJECT_DETAIL_SAGA,
                    //     projectId:record.id
                    // })
                }}>{text}</NavLink>
            },
            sorter: (item1, item2) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1
            },
            // sortDirections: ['descend'],
        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         let jsxContent = ReactHtmlParse(text)
        //         return <div key={index}>
        //             {jsxContent}
        //         </div>
        //     }
        // },
        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item1, item2) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1
            },
            sortDirections: ['descend'],
        },

        {
            title: 'creator',
            // dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item1, item2) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1
            },
            sortDirections: ['descend'],
        },

        {
            title: 'member',
            // dataIndex: 'creator',
            key: 'member',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Popover key={index} placement="top" title='Member' content={() =>{
                            return <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {record.members?.map((item, index)=>{
                                           return  <tr key={index}>
                                               <td>{item.userId}</td>
                                               <td><img src={item.avatar} width='30' height='30' alt={item.name} style={{borderRadius:'50%'}}/></td>
                                               <td>{item.name}</td>
                                               <td>
                                                   <button className='btn btn-danger' style={{borderRadius:'50%'}} onClick={()=>{
                                                       dispatch({
                                                           type:REMOVE_USER_PROJECT_SAGA,
                                                           userProject: {
                                                               userId: item.userId,
                                                               projectId: record.id
                                                           }
                                                       })
                                                   }}>X</button>
                                               </td>
                                           </tr>
                                       })}
                                    </tbody>
                            </table>
                        }}>
                            <Avatar key={index} src={member.avatar} />
                        </Popover>
                    })
                    }

                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                    <Popover placement="topLeft" title={'Add User'} content={() => {
                        return <AutoComplete
                            // thuộc tính của AutoComplete => nhất dịnh fai chuyển về {label, value},để hiển thị tên và id của user 
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}

                            value={value}
                            onChange={(text) => {
                                setValue(text)
                            }}
                            // thuộc tinh Select => sau khi chọn thì sẽ lấy đc value (id), option (label và value)
                            onSelect={(valueSelect, option) => {
                                setValue(option.label);

                                dispatch({
                                    type: ADD_USER_PROJECT_SAGA,
                                    userProject: {
                                        projectId: record.id,
                                        userId: option.value
                                    }
                                })

                            }}
                            style={{ width: "100%" }} onSearch={(value) => {
                                if(searchRef.current){
                                    clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(() =>{
                                    dispatch({
                                        type: GET_USER_SAGA,
                                        keyword: value
                                    })
                                },300)
                            }} /> 
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>

            },
        },


        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                 
                    <Button type='primary' onClick={() => {
                        const action = {
                            type: OPEN_FORM,
                            title:'EDIT PROJECT',
                            component: <FormsEditProject />
                        }
                        dispatch(action)

                        // dispatch data hiện tại lên reducer
                        const actionEditProject = {
                            type: EDIT_PROJECT,
                            projectEditInfo: record
                        }
                
                        dispatch(actionEditProject)
                    }} ><EditOutlined /></Button>


                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                idProject: record.id
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger><DeleteOutlined /></Button>
                    </Popconfirm>,

                </Space>
            ),
        },
    ];

    return (
        <div className='container mt-5'>
            <h3 className='text-center '>Project Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={'id'} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
