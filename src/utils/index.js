import axios from 'axios'
import { Toast } from 'mint-ui';
import router from '../router/index'

const env = process.env.NODE_ENV
const baseURL = env == 'development' ? '/api' : '/'

var instance = axios.create({
    baseURL,
    timeout: 15000,
});


export const  $axios = {
    get(url,data, config){
        return new Promise((resolve,rejects) => {
            instance.get(url,{params:data, ...config}).then(res => {
                if(res.data.code == 405){
                    Toast(res.data.msg);
                    router.push('/login')
                }
                resolve(res.data)
            }).catch(err =>{
                rejects(err)
            })
        })
    },
    fetch(url,data,config,methods){
        return new Promise((resolve,rejects) => {
            instance[methods](url,data,config).then(res => {
                if(res.data.code == 405){
                    Toast(res.data.msg);
                    router.push('/login')
                }
                resolve(res.data)
            }).catch(err => {
                rejects(err)
            })
        })
    },
    post(url,data,config){
        return this.fetch(url,data,config,'post')
    },
    put(url,data,config){
        return this.fetch(url,data,config,'put')
    }
}

export function handletime(str){
    let time = new Date(str)
    // let year = time.getFullYear();
    // let month = time.getMonth() +1;
    // let day = time.getDate()
    // month = month < 10 ? '0' + month : month
    // day = day <10 ? '0' + day : day
    // let newtime = `${year}-${month}-${day}`
    let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)

    return newtime
}


