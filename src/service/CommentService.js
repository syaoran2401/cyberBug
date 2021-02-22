import { BaseService } from "./BaseService";


export class CommentService extends BaseService{


    getAllComment = (taskId) =>{
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }

    deleteComment = (idComment) =>{
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }

    insertComment = (model) =>{
        return this.post(`Comment/insertComment`, model)
    }

    updateComment = (id, comment) =>{
        return this.put(`Comment/updateComment?id=${id}&contentComment=${comment}`)
    }
}


export const commentService = new CommentService()