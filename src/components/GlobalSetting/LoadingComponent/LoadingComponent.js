import React from 'react'
import loadingStyle from './LoadingComponent.module.css'
import loadingLogo from '../../../assets/imgLoading/loading.gif'
import { useSelector } from 'react-redux'


export default function LoadingComponent() {

    const {isLoading} = useSelector(state => state.LoadingReducer)

    if(isLoading){
            return (
                <div className={loadingStyle.bgLoading}>
                    <img src={loadingLogo} alt='loading'/>
                </div>
            ) 
    }else{
        return ''
    }
}
