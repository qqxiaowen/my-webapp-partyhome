<template>
    <div class="myinfo pt110">
        <Hearder />
        <div class="redact" @click="update">
            保存
        </div>
        <div class="content">
            <div class="content-item">
                <span>头像</span>
                <label>
                    <input style="display:none"  type="file" @change="handleupimg" >
                    <div class="flr">
                        <img :src="userinfo.avatar" alt="">
                    </div>
                </label> 
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>用户名</span> 
                <div class="flr">
                    <input type="text" v-model="userinfo.username" readonly  >
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>昵称</span>
                <div class="flr">
                    <input type="text" v-model="userinfo.nicheng"  >
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>工作</span>
                <div class="flr">
                    <input type="text" v-model="userinfo.job"  >
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>电话</span>
                <div class="flr">
                    <input type="text" v-model="userinfo.phone"  >
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>最高学历</span>
                <div class="flr">
                    <input type="text" v-model="userinfo.education"  >
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>性别</span>
                <div class="radio flr">
                    <input class="radio-ys" value="1" name="sex" type="radio" v-model="userinfo.sex">男
                    <input class="radio-ys" value="2" name="sex" type="radio"  v-model="userinfo.sex">女
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>当前身份</span>
                <div class="flr">
                    <select name="partyStatus" v-model="userinfo.partyStatus">
                        <option value="0">积极分子</option>
                        <option value="1">预备党员</option>
                        <option value="2">党员</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="desc">
                <div class="left">描述</div>
                <div class="right">
                    <textarea v-model="userinfo.desc"></textarea>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import { mapState } from 'vuex'
import { handletime } from '@/utils'
import { Toast } from 'mint-ui';
import axios from 'axios'
    export default {
        components:{
            Hearder
        },
        data(){
            return{
                userinfo:'',
                token:'',
            }
        },
      
        methods:{
            // 修改数据
            update(){
                let id = this.userinfo._id
                this.$axios.put(`/user/user/${id}`,this.userinfo).then( res => {
                    Toast(res.msg)
                    if(res.code == 200){
                        this.$store.commit('CHANGEINFO',this.userinfo) //将修改后的数据赋值给vuex
                        this.$router.push(`/myself`)
                    }
                })
            },
            handleupimg(e){
                let file = e.target.files[0];
                let formData = new FormData();
                formData.append('file',file)
                formData.append('token',this.token)
                axios.post('https://upload-z1.qiniup.com',formData).then(res => {
                    this.userinfo.avatar = res.data.url
                })
                
            },
            getToken(){
                axios.get('http://mawenli.xyz:3000/getToken').then(res => {
                    this.token = res.data.data
                })
            }
            
        },
        
        created(){
            this.getToken()
            this.userinfo = {...this.$store.state.userinfo}
        },
        
    }
</script>

<style scoped lang='less'>
.redact{
    position: fixed;
    width: 1.1rem;
    height: 1.11rem;
    line-height: 1.1rem;
    right: 0;
    top: 0;
    z-index: 998;
    font-size: 14px;
    color: #fff;
    text-align: center;

}

/deep/ .content-item{
    padding: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid #e8e8e8;
    img{
        display: block;
        width: 0.6rem;
        height: 0.6rem;
        margin: 0.15rem auto;
    }
    input{
        display: block;
        line-height: 0.9rem;
        text-align: right;
        color: #333;
        border: none;
        outline: none;
        background: #fff;
    }
    select{
        display: block;
        height: 0.9rem;
        color: #333;
        border: none;
        outline: none;
        background: #fff;
    }
}
.radio{
    /deep/ .radio-ys{
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.1rem;
    }
}
.sanjiao{
    float: right;
    margin: 0.4rem 0 0 0.2rem;
    width: 0;
    height: 0; 
    border: 7px solid transparent;
    border-top: 7px solid #333;
}
.desc{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0.2rem;
    font-size: 13px;
    color: #333;
    .left{
        height: 0.9rem;
        line-height: 0.9rem;
    }
    .right{
        max-width: 5rem;
        margin-top: 0.1rem;
        line-height: 1.5;
        border: 1px solid #e8e8e8;
        textarea{
            border: none;
            width: 5rem;
            height: 2rem;
            font-size: 15px;
            color: #333;
            line-height: 1.5;
            outline: none;
        }
    }
}
</style>
