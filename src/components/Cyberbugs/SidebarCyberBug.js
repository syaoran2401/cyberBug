import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UnorderedListOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { OPEN_FORM_CREATE_TASK } from '../../redux/types/CyberBugsType';
import FormCreateTask from '../Forms/FormCreateTask';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function SidebarCyberBug() {

    const [state, setState] = useState({
        collapsed: false,
    })

    const dispatch = useDispatch()

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    }; 


    return (
        <div>
            <Sider style={{ height: '100%' }} trigger={null} collapsible collapsed={state.collapsed}>
                <div className='text-right text-white mb-3' style={{ fontSize: '20px' }} onClick={toggle}><UnorderedListOutlined /></div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PlusOutlined style={{fontSize:'20px'}} onClick={()=>{
                        dispatch({
                            type:OPEN_FORM_CREATE_TASK,
                            title: ' Create Task',
                            component: <FormCreateTask/>,
                        })
                    }}/>}>
                      <span className='mb-2'>Creat Task</span>
              </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined  style={{fontSize:'20px', marginTop:''}}/>}>
                        Search 
              </Menu.Item>
                </Menu>
            </Sider>
        </div>
    );
}
