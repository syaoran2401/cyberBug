import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector } from 'react-redux'
import { USER_SIGN_UP_API } from '../../util/Constants/settingDOMAIN';





function UserSignUp(props) {
    const {history} = useSelector(state => state.HistoryReducer);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
      } = props;

   

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: window.innerHeight }}>
                <h1>Sign Up</h1>
                <div style={{ width: '400px' }}>
                    <div>
                        <Input onChange={handleChange} name='email' value={values.email} className='mt-3' size="large" placeholder="Email" prefix={<UserOutlined />} />
                        <span className='text-danger text-center'>{errors.email}</span>
                    </div>
                    <div>
                        <Input onChange={handleChange} name='passWord' value={values.passWord} className='mt-3' size="large" placeholder="Password" prefix={<LockOutlined />} />
                        <span className='text-danger  text-center'>{errors.passWord}</span>
                    </div>
                    <div>
                        <Input onChange={handleChange} name='phoneNumber' value={values.phoneNumber} className='mt-3' size="large" placeholder="Phone Number" prefix={<PhoneOutlined />} />
                    </div>
                    <div>
                        <Input onChange={handleChange} name='name' value={values.name} className='mt-3' size="large" placeholder="Name" prefix={<IdcardOutlined />} />
                        <span className='text-danger  text-center'>{errors.name}</span>
                    </div>
                </div>
                <div className='mt-4'>
                    <Button htmlType='submit' className='mr-3' type="primary submit">Register</Button>
                    <Button className='ml-3' type="danger" onClick={()=>{
                        history.push('/home')
                    }}>Back to home</Button>
                </div>
            </div>
        </form>
    )
}

const signUpWithForMik = withFormik({
    mapPropsToValues: () => ({ 
        email:'',
        passWord:'',
        phoneNumber: '',
        name: '' ,

    }),
  
    validationSchema:Yup.object({
        email: Yup.string().email('Invalid email address !').required('Required !'),
        name: Yup.string().min (5,'Must be 5 characters or more' ).max(30, 'Must be 30 characters or less').required('Required !'),
        passWord: Yup.string().required('Required !'),
    }),
  
    handleSubmit: (values, {props, setSubmitting }) => {
        const {email, passWord, phoneNumber, name} = values
        props.dispatch({
            type:USER_SIGN_UP_API,
            model:{
               email,
               passWord,
               phoneNumber,
               name 
            }
       })
    },
  
    displayName: 'BasicForm',
  })(UserSignUp);


export default connect() (signUpWithForMik)



