import { BaseService } from "./BaseService";


export class UserService extends BaseService {

    userSignUp = (model) => {
        return this.post('Users/signup', model)
    }

    getUser = (keyword) => {
        return this.get(`/Users/getUser?keyword=${keyword}`)
    }

    assignUserProject = (userProject) => {
        return this.post('/Project/assignUserProject', userProject)
    }

    removeUserProject = (userProject) => {
        return this.post('/Project/removeUserFromProject', userProject)
    }

    getUserByProjectId = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`,)
    }

    getAllUser = () => {
        return this.get('/Users/getUser')
    }

    deleteUser = (userId) => {
        return this.delete(`/Users/deleteUser?id=${userId}`)
    }

    editUser = (model) => {
        return this.put(`Users/editUser`, model)
    }


}

export const userService = new UserService()