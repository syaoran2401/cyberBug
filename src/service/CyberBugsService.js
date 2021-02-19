import axios from 'axios'
import { ACCESS_TOKEN, DOMAIN } from '../util/Constants/settingDOMAIN'




export const userLoginJirasAPI = (userLogin) => {
    return axios({
        url: `${DOMAIN}/Users/signin`,
        method:"POST",
        data:userLogin,
    })
}

export const userSignUpJiraAPI = (userSignUpInfo) =>{
    return axios({
        url: `${DOMAIN}/Users/signup`,
        method:'POST',
        data:userSignUpInfo
    })
}


export const getAllProjectCategory = () =>{
    return axios({
        url: `${DOMAIN}/ProjectCategory`,
        method: 'GET'
    })
}

// Hàm tạo project ( ko cần quyền truy cập)
export const creatProject = (newProject) =>{
    return axios({
        url: `${DOMAIN}/Project/createProject`,
        method:'POST',
        data:newProject
    })
}


export const creatProjectAuthorize = (newProject) =>{
    console.log(localStorage.getItem(ACCESS_TOKEN))
    return axios({
        url:`${DOMAIN}/Project/createProjectAuthorize`,
        method:'POST',
        data: newProject,
        // header => gửi vào backend kèm theo key token
        headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
    })
}

export const getAllProject = () =>{
    return axios({
        url: `${DOMAIN}/Project/getAllProject`,
        method:'GET',
        //token yêu cầu từ backend, chứng minh user đã đăng nhập
        headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
    })
}

export const updateProject = (projectUpdated) =>{
    return axios({
        url: `${DOMAIN}/Project/updateProject?projectId=${projectUpdated.id}`,
        method:'PUT',
        data: projectUpdated,
        //token yêu cầu từ backend, chứng minh user đã đăng nhập
        headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
    })
}

export const deleteProjectTest = (idProject) =>{
    return axios({
        url: `${DOMAIN}/Project/deleteProject?projectId=${idProject}`,
        method:'DELETE',
        //token yêu cầu từ backend, chứng minh user đã đăng nhập
        headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
    })
}

