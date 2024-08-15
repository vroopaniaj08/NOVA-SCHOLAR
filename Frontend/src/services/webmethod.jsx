import axios from 'axios';

class Webmethod{
    postApiWithoutToken(url,data){
        return axios.post(url,data);
    }
    postapiWthToken(url,data,token){
        return axios.post(url,data,{
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
    }
    putapiWthToken(url,data,token){
        return axios.put(url,data,{
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
    }
    postapiWthTokenForm(url,data,token){
        return axios.post(url,data,{
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            },
        });
    }
    getapi(url,token){
        return axios.get(url,{
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
    }
}

export default new Webmethod()