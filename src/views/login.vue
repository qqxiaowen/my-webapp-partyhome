<template>
    <div class="login pt110 ">
        <Hearder />
        <img src="/static/img/logo.png" alt="">
        <form action="form" @submit.prevent>
            <input v-model="forData.username"  type="text" placeholder="帐号：">
            <span>
                <input v-model="forData.password" class="pwd" type="password" placeholder="密码：">
            </span>
            <button @click="handlelogin">登录</button>
        </form>
    </div>
</template>

<script>
import Hearder from '../components/Hearder'
import { Indicator,Toast } from 'mint-ui';
    export default {
        components:{
            Hearder
        },
        data(){
            return{
                forData:{
                    username:'',
                    password:''
                }
            }
        },
        methods:{
            handlelogin(){
                this.$axios.post(`/user/login`,this.forData).then(res => {
                    console.log(res)
                    if(res.code == 200){
                        let partyStatusName = ''
                        switch(res.data.partyStatus){
                            case 0:
                                partyStatusName = '积极分子'
                                break;
                            case 1:
                                partyStatusName = '预备党员'
                                break;
                            case 2:
                                partyStatusName = '党员'
                                break;
                            default:
                                partyStatusName = '积极分子'
                                break;
                        }
                        let userinfo = res.data
                        userinfo.partyStatusName = partyStatusName
                        userinfo.password =''
                        this.$store.commit('CHANGEINFO',userinfo)
                        Indicator.open('登陆中...');
                        let url ='myself'
                        let isreplace = false
                        if(this.$route.query&&this.$route.query.redirect){
                            url = this.$route.query.redirect
                            isreplace = true;
                        }
                        if(isreplace){
                            setTimeout(() => {
                                this.$router.replace(`/${url}`)
                                Indicator.close();
                            }, 300);
                        }else{
                             setTimeout(() => {
                                this.$router.push(`/${url}`)
                                Indicator.close();
                            }, 300);
                        }
                        
                    }else{
                        Toast(res.msg);
                    }
                })
            },

        },
        
    }
</script>

<style scoped lang='less'>
.login{
    position:absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #c50206;
    img{
        display: block;
        width: 3.9rem;
        height: 1.04rem;
        margin: 0.48rem auto 0.92rem;
    }
}
form{
    text-align: center;
    input{
        display: block;
        width: 5.72rem;
        height: 0.8rem;
        line-height: .8rem;
        border: 1px solid #ffff27;
        border-radius: 4px;
        margin: 0 auto .2rem;
        background: #c50206;
        padding: 0 0.1rem;
        box-sizing: border-box;
        color: #fff;
        outline: none;
    }
    button{
        display: block;
        width: 5.72rem;
        height: 0.8rem;
        margin: 0 auto;
        text-align: center;
        background: #e43228;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 4px;
    }
    span {
        ::-webkit-input-placeholder{text-indent: 2em;}    /* 使用webkit内核的浏览器 */
        :-moz-placeholder{text-indent: 2em;}                  /* Firefox版本4-18 */
        ::-moz-placeholder{text-indent: 2em;}                  /* Firefox版本19+ */
        :-ms-input-placeholder{text-indent: 2em;}           /* IE浏览器 */
    }
    ::-webkit-input-placeholder{color:#fff;}    /* 使用webkit内核的浏览器 */
    :-moz-placeholder{color:#fff;}                  /* Firefox版本4-18 */
    ::-moz-placeholder{color:#fff;}                  /* Firefox版本19+ */
    :-ms-input-placeholder{color:#fff;}           /* IE浏览器 */
}
</style>