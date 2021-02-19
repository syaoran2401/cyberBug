import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../redux/types/CyberBugsType';
import FormsEditProject from '../../components/Forms/FormsEditProject';




export default function ModalJira(props) {

    const {visible,componentContentDrawer,callBackSubmit, title } = useSelector(state => state.ModalJiraReducer);
    const dispatch = useDispatch()



    const showDrawer = () => {
        dispatch({
            type:OPEN_DRAWER,
        })
    };

    const onClose = () => {
        dispatch({
            type:CLOSE_DRAWER,
        })
    };


    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {componentContentDrawer}
            </Drawer>
        </>
    )
}
