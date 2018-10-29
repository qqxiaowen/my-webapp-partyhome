<template>
    <div class="pt110">
        <Hearder />
        <div class="contnet">
            <form action="/" @submit.prevent>
                <div class="item">
                    <div class="title" >旧密码：</div>
                    <input type="text" v-model="oldpwd">
                </div>
                <div class="item">
                    <div class="title">新密码：</div>
                    <input type="text" v-model="newpwd">
                </div>
                <div class="item">
                    <div class="title" >确认密码：</div>
                    <input type="text" v-model="againpwd">
                </div>
                <button @click="updatepwd">确定</button>
            </form>
        </div>
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import { Toast } from 'mint-ui';
    export default {
        components:{
            Hearder
        },

        data(){
            return {
                oldpwd:'',
                newpwd:'',
                againpwd:''
            }
        },
        methods:{
            updatepwd(){
                if(this.oldpwd&&this.newpwd&&this.againpwd){
                    if(this.newpwd != this.againpwd){
                        Toast('两次输入的密码不一致');
                    }else{
                        this.update()
                    }
                }else{
                    Toast('请输入密码');
                }
            },
            update(){
                this.$axios.put(`/user/password`,{
                    oldpsd:this.oldpwd,
                    newpsd:this.newpwd
                    }).then(res => {
                    if(res.code ==200){
                        Toast(res.msg)
                        // let userinfo = this.$store.state.userinfo
                        // userinfo.password = this.oldpwd
                        // console.log(userinfo)
                        // this.$store.commit('CHANGEINFO',userinfo) 
                        this.$router.push(`/myself`)
                    }else{
                        Toast(res.msg)
                    }
                })
            }
        }
    }
    
</script>

<style scoped lang="less">
.contnet{
    padding: 0.6rem 0.8rem 0;
    .item{
        padding-bottom: 0.2rem;
        .title{
            margin-bottom: 0.2rem;
        }
        input{
            width: 100%;
            background: #fff;
            padding: 0.2rem 0;
            outline: none;
            border: 1px solid #666;
            border-radius: 4px;
        }
    }
    button{
        width: 100%;
        background: #fff;
        padding: 0.2rem 0;
        border-radius: 4px;
        color: #fff;
        background: #e43228;
        border: none;
    }
}
</style>