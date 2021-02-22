import { BaseService } from "./BaseService";


export class TaskTypeService extends BaseService {

    getAllTaskType = () => {
        return this.get('/TaskType/getAll')
    }
}

export const taskTypeService = new TaskTypeService()