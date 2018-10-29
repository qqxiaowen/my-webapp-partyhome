<template>
    <div class="new-eyes pt110">
        <Hearder />
        <Nullcontent v-if="!isloading&&!newData[0]"  />
        <div v-infinite-scroll="handleBootom"
            infinite-scroll-disabled="isOffDown" >
            <div v-for="(item,index) in newData" :key="index" >
                <div class="newitem" @click="$router.push(`/newDetail/${item._id}`)">
                    <div class="left">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="right">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="row2">
                            <div class="date">
                                {{item.createTime}}
                            </div>
                            <div class="read-num">
                                <i class=" eyes-ys iconfont icon-yanjing"></i>
                                <span class="num-text flr">{{item.look_num}}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg" alt=""></div>
            <Tofoot v-if="!isloading&&newData[0]" />
            <Footer v-if="isMessage" />
        </div>
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import Tofoot from '@/components/Tofoot'
import Footer from '@/components/Footer'
import Nullcontent from '@/components/Nullcontent'
import {handletime} from '@/utils/index'
    export default {
        components:{
            Hearder,
            Tofoot,
            Nullcontent,
            Footer
        },
        data(){
            return{
                categotyTypeId:'',
                newData:'',
                page:1,
                isOffDown:true,
                isloading:true,
            }
        },
        methods:{
            handleBootom(){
                this.page = this.page+1
                this.getdata()
            },
            getdata(){
                this.$axios.get(`/ddyj/category/${this.categotyTypeId}/news`,{pn:this.page}).then( res => {
                    res.data.forEach(item => {
                        item.createTime = handletime(item.createTime)
                    })
                    this.newData = [...this.newData,...res.data]
                    this.isOffDown = false
                    if(res.data.length == 0){
                        this.isOffDown = true
                        this.isloading = false;
                    }
                })
            },
            getCategory(){
                let type = this.$route.meta.desc
                this.$axios.get('/ddyj/category').then(res => {
                    res.data.forEach(item => {
                        if(item.title == type){
                            this.categotyTypeId = item._id
                        }
                    }) 
                    this.getdata()    
                })
            },
        },
        
        created(){
            this.getCategory()
        },
        computed:{
            isMessage(){
                if(this.$route.meta.desc == '通知早知道'){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style scoped lang='less'>
.newitem{
    font-size: 0.22rem;
    display: flex;
    justify-content:space-between;
    padding: 0.18rem 0.22rem;
    border-bottom: 1px solid #ccc;
    .left{
        margin-right: 0.2rem;
        img{
            width: 1.6rem;
            height: 1.6rem;
        }
    }
    .right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 1.6rem;
        .title{
            color: #333;
            line-height: 0.5rem;
            font-size: 0.3rem;
        }
    }
    .row2{
        display: flex;
        justify-content:space-between;
        font-size: 0.18rem;
        color: #666;
        .read-num{
            width: 0.8rem;
            .eyes-ys{
                // float: left;
                font-size: 0.22rem;
                color: #ccc;
            }
           
        }
    }
}

</style>