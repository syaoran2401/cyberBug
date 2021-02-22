import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainContent from '../components/Cyberbugs/Main/MainContent'
import MainHeader from '../components/Cyberbugs/Main/MainHeader'
import MainInfo from '../components/Cyberbugs/Main/MainInfo'
import { GET_PROJECT_DETAIL_SAGA } from '../redux/types/CyberBugsType'



export default function IndexCyberBugs(props) {

    const {projectDetail} = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        const {projectId} = props.match.params;
        dispatch({
            type:GET_PROJECT_DETAIL_SAGA,
            projectId
        })
    }, [])

    return (
        <div className='main'>
        <MainHeader projectDetail={projectDetail}/>

        <MainInfo projectDetail={projectDetail}/>

        <MainContent projectDetail={projectDetail}/>
    </div>
    )
}
