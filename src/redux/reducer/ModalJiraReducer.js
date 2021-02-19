import React from 'react'
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM, OPEN_FORM_CREATE_TASK, SUBMIT_CREATE_TASK } from "../types/CyberBugsType";

const initialState = {
    visible: false,
    title: '',
    componentContentDrawer: <p>default content</p>,
    // componentContentDrawer: () =>{return <p>default content</p>}
    callBackSubmit: (value) => {
        alert('click demo')
    }
}

const ModalJira = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            state.visible = true;
            return { ...state };

        case CLOSE_DRAWER:
            state.visible = false;
            return { ...state };

        case OPEN_FORM:
            state.title = action.title;
            return { ...state, visible: true, componentContentDrawer: action.component };

        case 'SET_SUBMIT_FORM_EDIT': {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }

        case OPEN_FORM_CREATE_TASK:{
            state.visible = true;
            state.title = action.title;
            state.componentContentDrawer = action.component;
            return {...state}
        }

        case SUBMIT_CREATE_TASK:{
            return {...state, callBackSubmit: action.submitFunction}
        }
        default:
            return state
    }
}

export default ModalJira;