import {  Switch, useHistory } from "react-router-dom";
import CyberbugsTemplate from "./HomeTemplate/CyberBugTemplate";
import ProjectSetting from "./page/CyberBugs/ProjectSettings/ProjectSetting";
import LoginTemplate from "./HomeTemplate/LoginTemplate";
import Login from "./page/Login/UserLogin";
import 'antd/dist/antd.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./redux/types/CyberBugsType";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import ProjectManagement from "./page/ProjectManagement/ProjectManagement";
import DrawerJira from "./HOC/Jira/DrawerJira";
import UserSignUp from "./page/SignUp/UserSignUp";
import IndexCyberBugs from "./ProjectDetail/IndexCyberBugs";
import DemoDragDrop from "./page/DemoDragDrop/DemoDragDrop";
import DragAnhDropDnd from "./page/DragAndDropDnd/DragAnhDropDnd";
import UserManagement from "./page/UserManagement/UserManagement";


function App() {

  const history = useHistory();
  const dispatch = useDispatch()

  // dispatch history để bên userLoginSaga có thể xài đc hàm history.push
  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history: history
    })
  }, [])

  return (
    <>
      <LoadingComponent />
      <DrawerJira/>
      <Switch>
        <CyberbugsTemplate exact path='/dragdrop' Component={DemoDragDrop}></CyberbugsTemplate>
        <CyberbugsTemplate  exact path='/dragdropdnd' Component={DragAnhDropDnd}/>
        <LoginTemplate exact path='/login' Component={Login} />
        <LoginTemplate exact path='/signup' Component={UserSignUp}></LoginTemplate>
        <CyberbugsTemplate exact path='/home' Component={IndexCyberBugs} />
        <CyberbugsTemplate exact path='/projectsettings' Component={ProjectSetting} />
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement}/>
        <CyberbugsTemplate exact path='/projectDetail/:projectId' Component={IndexCyberBugs}/>
        <CyberbugsTemplate exact path='/usermanagement' Component={UserManagement}/>


        <CyberbugsTemplate exact path='/' Component={IndexCyberBugs} />

        
      </Switch>
    </>

  );
}

export default App;
