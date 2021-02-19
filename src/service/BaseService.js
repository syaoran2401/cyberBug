import axios from "axios"
import { ACCESS_TOKEN, DOMAIN } from "../util/Constants/settingDOMAIN"


// PUT json ve Backend
export class BaseService {
    put = (url, model) =>{
        return axios({
            url: `${DOMAIN}/${url}`,
            method:"PUT",
            data:model,
            headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
        })
    }

    post = (url, model) =>{
        return axios({
            url: `${DOMAIN}/${url}`,
            method:"POST",
            data:model,
            headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
        })
    }

    get = (url) =>{
        return axios({
            url: `${DOMAIN}/${url}`,
            method:"GET",
            headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
        })
    }

    delete = (url) =>{
        return axios({
            url: `${DOMAIN}/${url}`,
            method:"DELETE",
            headers:{'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)} //JWT
        })
    }
}