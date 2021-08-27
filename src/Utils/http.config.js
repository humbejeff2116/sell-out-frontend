







import axios from 'axios';

export default function httpBase(URI, contentType ="application/json") {
    return axios.create({
        baseURL:`${URI}/api/v1`,
        headers:{
            "content-type": contentType
        }
    });
}