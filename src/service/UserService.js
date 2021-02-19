import { BaseService } from "./BaseService";


export class UserService extends BaseService {
    constructor(){
        super();
    }

    getUser = (keyword) =>{
        return this.get(`/Users/getUser?keyword=${keyword}`)
    }

    assignUserProject = (userProject) =>{
        return this.post('/Project/assignUserProject', userProject)
    }

    removeUserProject = (userProject) =>{
        return this.post('/Project/removeUserFromProject', userProject)
    }

    getUserByProjectId = (projectId) =>{
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`, )
    }

}

export const userService = new UserService()