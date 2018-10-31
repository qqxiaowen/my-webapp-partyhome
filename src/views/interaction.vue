<template>
    <div class="interaction" >
        <Hearder style="position: absolute" />
        <div class=" main pt110" ref="main">
            <div v-infinite-scroll="updownload"
            infinite-scroll-disabled="isOffdownload">
                <router-link :to="{name:'interDetail',params:{id:item._id}}" class="item" v-for="(item,index) in formdata" :key=index >
                    <div class="row1">
                        <div class="left">
                            <img :src="item.user.avatar" alt="">
                            <div>
                                <div class="title">{{item.user.nicheng}}</div>
                                <div class="date-message">
                                    <span><i class="dmiconys iconfont icon-shijian"></i>{{item.createTime}}</span>
                                    <span><i class="dmiconys iconfont icon-xiaoxi"></i>公开</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="right">党员互动</div>
                    </div>
                    <div class="row2">
                        {{item.content}}
                    </div>
                    <div class="row3">
                        <i class="dmiconys iconfont icon-xiaoxi2"></i>回复
                    </div>
                </router-link >

            </div>
            
            <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg"   alt=""></div>
            <Nullcontent v-if="!isloading&&!formdata[0]"  />
            <Tofoot v-if="!isloading&&formdata[0]" />
        </div>
        <div class="issue" @click="ShowTeaea">
            <i class="issue-ys iconfont icon-wuuiconxiangjifangda"></i>
        </div>
        <div class="suemessage" v-if="isshowteaea">
            <div class="suem-top" @click="offTeaea"></div>
            <div class="suem-bottom">
                <textarea v-model="content" name="" id="" ></textarea>
                <div class="button">
                    <button class="fabu" @click="fabucontent">发布</button>
                    <button @click="offTeaea">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import Tofoot from '@/components/Tofoot'
import Nullcontent from '@/components/Nullcontent'
import { Toast } from 'mint-ui';
import {handletime} from '@/utils/index'
    export default {
        components:{
            Hearder,
            Nullcontent,
            Tofoot
        },
        data(){
            return{
                formdata:'',
                pn:1,
                isOffdownload:true,
                isloading:true,
                isshowteaea:false,
                content:''
            }
        },
        methods:{
            getData(){
                this.$axios.get(`/ddyj/topic?pn=${this.pn}`).then(res => {
                    res.data.forEach(item => {
                        item.createTime = handletime(item.createTime)
                    })
                    this.formdata = [...this.formdata,...res.data]
                    this.isOffdownload = false;
                    if(res.data.length == 0){
                        // this.isOffdownload = true;
                        this.isloading = false;
                    }
                })
            },
            updownload(){
                this.pn = this.pn + 1;
                this.getData()
            },
            ShowTeaea(){
                this.isshowteaea = true;
            },
            offTeaea(){
                this.isshowteaea = false;
            },
            fabucontent(){
                if(this.content){
                    this.$axios.post(`/ddyj/topic`,{content:this.content}).then(res => {
                        if(res.code == 200){
                            Toast(res.msg)
                            this.offTeaea()
                            this.formdata = ''
                            this.content = ''
                            this.pn = 1
                            this.getData()
                        }else{
                            Toast(res.msg)
                        }
                    })
                }else{
                   Toast('请输入主题') 
                }
                
            },
            handledetil(id){
                this.$router.push(`/interDetail?id=${id}`)
            }

        },
        created(){
            this.getData()
        },
        mounted(){ 
            // this.$nextTick(() => {
                document.documentElement.style.overflow = 'hidden'
                document.body.style.overflow = 'hidden'
                document.getElementById('app').style.overflow = 'hidden'
            // })
        },
        beforeDestroy(){ // 将overflow hidden 去除
            document.documentElement.style.overflow = 'auto'
            document.body.style.overflow = 'auto'
            document.getElementById('app').style.overflow = 'auto'
        }
    }
</script>

<style scoped lang='less'>
.item{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #333;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.row1{
    display: flex;
    justify-content: space-between;
}
.left{
    display: flex;
    img{
        width: 0.7rem;
        height: 0.7rem;
        vertical-align: middle;
        margin-right: 0.2rem;
    }
}
.right{
    border: 1px solid #f00;
    color: #f00;
    width: 1.2rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.22rem;
    text-align: center;
    border-top-left-radius: 15% 50%;
    border-top-right-radius: 15% 50%;
    border-bottom-right-radius: 15% 50%;
    border-bottom-left-radius: 15% 50%;
}
.date-message{
    font-size: 0.22rem;
    color: #666;
    padding-top: 0.05rem;
    
}
.dmiconys{
    font-size: 14px;
    margin-right: 0.1rem;
    vertical-align: middle;
}
.row2{
    padding: 0.2rem 0;
    font-size: 0.28rem;
    color: #333;
}
.row3{
    text-align: right;
    font-size: 0.28rem;
    color: #333;
}
.issue{
    position:absolute;
    right: 0.2rem;
    bottom: 1.5rem;
    width: 1.2rem;
    height: 1.2rem;
    z-index: 200;
    .issue-ys{
        color: #f00;
        font-size: 1.2rem;
    }
}
.suemessage{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.2);
    z-index: 960;
    display: flex;
    flex-direction: column;
}
.suem-top{
   flex: 2.5;
}
.suem-bottom{
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #f1f1f1;
    padding: 0.2rem;
    z-index: 300;
    textarea{
        width: 6.8rem;
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
        outline: none;
        margin-bottom: 0.1rem;
        border: none;
    }
    .button{
        display: flex;
        justify-content: space-between;
        button{
            width: 0.8rem;
            height: 0.5rem;
            line-height: 0.5rem;
            border-radius: 4px;
            border: none;
            outline: none;
        }
        .fabu{
            background: #ef473a;
            color: #fff;
        }
    }
}
</style>
<style>
html{
    height: 100%;
    overflow: hidden;
}
body{
    height: 100%;
    overflow: hidden;
}
#app{
    height: 100%;
    overflow: hidden;
}
.interaction{
    display: flex;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
}
.main{
    flex: 1;
    background: #f1f1f1;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

</style>
