import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete, Table, Space, Input, Button, Popconfirm } from 'antd'
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_USER_SAGA } from '../../redux/types/CyberBugsType';
import { DELETE_USER_SAGA, DISABLE_EDIT_CURRENT_USER, EDIT_USER_SAGA, ENABLE_EDIT_CURRENT_USER, GET_CURRENT_USER } from '../../redux/types/UserType';
import { withFormik } from 'formik';
import * as Yup from 'yup';



function UserManagement(props) {
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;


    const searchRef = useRef(null)
    const dispatch = useDispatch();
    const { arrUser, editFieldVisible } = useSelector(state => state.UserReducer);
    const [inputVisible, setInputVisible] = useState(false);
    const [selectedInputVisible, setSelectInputVisible] = useState('');
    const [cancleButtonVisible, setCancleButtonVisile] = useState(false);
    const [valueSearch, setValueSearch] = useState('')
    const { userSearch } = useSelector(state => state.UserReducer);

    const confirm = (record) => {
        dispatch({
            type: DELETE_USER_SAGA,
            userId: record.userId
        })
    }


    useEffect(() => {
        dispatch({
            type: GET_USER_SAGA
        })
        dispatch({
            type:ENABLE_EDIT_CURRENT_USER
        })
    }, [])

    const columns = [
        {
            title: 'STT',
            key: 'userId',
            render: (text, record, index) => (
                <div >{index + 1}</div>
            )
        },

        {
            title: 'Email',
            key: 'email',
            render: (text, record, index) => (
                editFieldVisible && inputVisible && selectedInputVisible.userId === record.userId ? <div>
                    <Input placeholder={record.email} onChange={handleChange} defaultValue={record.email} name='email' />
                    <span className='text-danger'>{errors.email}</span>
                </div> : record.email
            )
        },
        {
            title: 'Password',
            key: 'Password',
            render: (text, record, index) => (
                editFieldVisible && inputVisible && selectedInputVisible.userId === record.userId ? <div>
                    <Input placeholder='********' onChange={handleChange} name='passWord' />
                    <span className='text-danger'>{errors.passWord}</span>
                </div> : '***********'
            )
        },
        {
            title: 'Name',
            key: 'name',
            render: (text, record, index) => (
                editFieldVisible && inputVisible && selectedInputVisible.userId === record.userId ? <div>
                    <Input placeholder={record.name} onChange={handleChange} defaultValue={record.name} name='name' />
                    <span className='text-danger'>{errors.name}</span>
                </div> : record.name
            )
        },
        {
            title: 'Phone Number',
            key: 'phoneNumber',
            render: (text, record, index) => (
                editFieldVisible && inputVisible && selectedInputVisible.userId === record.userId ? <div>
                    <Input placeholder={record.phoneNumber} defaultValue={record.phoneNumber} onChange={handleChange} name='phoneNumber' />
                    <span className='text-danger'>{errors.phoneNumber}</span>
                </div> : record.phoneNumber
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    {editFieldVisible && cancleButtonVisible && selectedInputVisible.userId === record.userId ? '' :
                        <Button type="primary" onClick={() => {
                            setInputVisible(true);
                            setSelectInputVisible(record);
                            setCancleButtonVisile(true);
                            dispatch({
                                type: ENABLE_EDIT_CURRENT_USER,
                            })
                            dispatch({
                                type: GET_CURRENT_USER,
                                selectedUser: record
                            })
                        }}>Edit</Button>
                    }




                    {editFieldVisible && cancleButtonVisible && selectedInputVisible.userId === record.userId ? <div style={{whiteSpace:'nowrap'}}>
                        <Button type="primary submit" htmlType='submit' className='mr-2'>Submit</Button>
                        <Button type="danger" onClick={() => {
                            setInputVisible(false)
                            setCancleButtonVisile(false)
                        }}>Canel</Button>
                    </div> : <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => confirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                            <Button type='danger'>Delete</Button>
                        </Popconfirm>}
                </Space>
            )
        },

    ];


    return (
        <div className='container mt-5'>
            <div>
                <h2 className='text-center'>User List</h2>
            </div>
            <div>
                <AutoComplete
                    value={valueSearch}
                    options={userSearch?.map((item, index) => {
                        return { label: item.name, value: item.userId.toString() }
                    })}

                    onChange={(text) => {
                        setValueSearch(text)
                    }}
                    style={{
                        width: '80%',
                    }}
                    onSelect={(valueSelect, option) => {
                        setValueSearch(option.label);
                    }}

                    onSearch={(value) => {
                        if (searchRef.current) {
                            clearTimeout(searchRef.current)
                        }
                        searchRef.current = setTimeout(() => {
                            dispatch({
                                type: GET_USER_SAGA,
                                keyword: value
                            })
                        }, 300)

                    }}
                    placeholder="Searching ..."
                >
                </AutoComplete>
                <button className='ml-3'>Search</button>
            </div>
            <form onSubmit={handleSubmit}>
                {valueSearch !== '' ? <Table columns={columns} dataSource={userSearch} /> :
                    <Table columns={columns} dataSource={arrUser} />
                }
            </form>
        </div>
    )
}




const EditUserWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { selectedUser } = props;
        return {
            userId: selectedUser.userId,
            email: selectedUser.email,
            passWord: '',
            name: selectedUser.name,
            phoneNumber: selectedUser.phoneNumber
        }
    },

    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid !'),
        passWord: Yup.string().required('password is required for confirmation or changing !'),
        name: Yup.string().required('name is required!'),
        phoneNumber: Yup.string().required('phoneNumber is required!')
    }),


    handleSubmit: (values, { props, resetForm }) => {
        const { userId, email, name, phoneNumber, password } = values;

        props.dispatch({
            type: EDIT_USER_SAGA,
            model: {
                id: userId,
                email,
                password,
                name,
                phoneNumber
            }
        })

        props.dispatch({
            type: DISABLE_EDIT_CURRENT_USER
        })

        resetForm({
            values: {
                passWord: ''
            }
        })



    },
    displayName: 'User Management',
})(UserManagement);

const mapStateToProps = state => {
    return {
        selectedUser: state.UserReducer.selectedUser,
    }
}

export default connect(mapStateToProps)(EditUserWithFormik)