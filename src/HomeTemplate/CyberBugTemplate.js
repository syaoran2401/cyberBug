import { Route } from 'react-router-dom'
import MenuCyberBug from '../components/Cyberbugs/MenuCyberBug';
import ModalCyberBug from '../components/Cyberbugs/ModalCyberBug/ModalCyberBug';
import SidebarCyberBug from '../components/Cyberbugs/SidebarCyberBug';
import '../index.css'


export default function CyberbugsTemplate(props) {

    const { Component, ...resParam } = props;
    return (
        <Route {...resParam} render={(propsRoute) => {
            return <>
                <div className="jira">
                    <SidebarCyberBug />
                    <MenuCyberBug />
                        <Component {...propsRoute}/>
                    <ModalCyberBug/>
                </div>
            </>
        }} />
    )
}
