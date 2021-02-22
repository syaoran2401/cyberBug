import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik  } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import { jiraUserLoginAction } from '../../redux/actions/JiraAction';



function Login(props) {

    const {
        errors,
        handleChange,
        handleSubmit,
      } = props;

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h2 className='text-center'>Login</h2>
                <div className='mt-4'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} placeholder='email' name='email' size="large" prefix={<UserOutlined />} />
                   <div className='text-danger text-center'>{errors.email}</div> 
                </div>

                <div className='mt-3' >
                    <Input onChange={handleChange} style={{ minWidth: 300 }} placeholder='password' type='password' name='password' size="large" prefix={<LockOutlined />} />
                  <div className='text-danger text-center'>{errors.password}</div>
                </div>

                <Button htmlType='submit' className='mt-4' style={{ backgroundColor: 'rgb(102,117,223)', color: 'white' }}>Login</Button>

                <div className='social mt-3 d-flex'>
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape='circle' size={'large'} >
                        <span className='font-weight-bold text-white'>f</span>
                    </Button>
                    <Button className='ml-3' type='primary' shape='circle' size={'large'}>
                        <TwitterOutlined />
                    </Button>
                </div>
            </div>
        </form>
    )
}


const UserLoginWithFormik = withFormik({
    mapPropsToValues: () => ({
        email:'',
        password:'',
    }),
    
    validationSchema:Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid !'),
        password: Yup.string().min(6, 'password must have at least 6 characters').max(32, "password can't longer than 32 characters")
    }),
    
 
    handleSubmit: (values, {props, setSubmitting }) => {
        props.dispatch(jiraUserLoginAction(values.email, values.password))
    },
    displayName: 'User Login',
  })(Login);

  export default connect()(UserLoginWithFormik)
