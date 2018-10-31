<template>
    <div class="pt110">
        <Hearder />
        <Nullcontent v-if="!isloading&&!scoredata[0]"  />
           <div v-infinite-scroll="loadMore"
                infinite-scroll-disabled="isOffUpload"  >
                <div class="item" v-for="(item,index) in scoredata" :key=index>
                    <div class="left">
                        <div class="row1">
                        {{item.typeName}}
                        </div>
                        <div class="row2">
                        {{item.createTime}}
                        </div>
                    </div>
                    <div class="right">
                        +{{item.mark}}
                    </div>
                </div>
                <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg"   alt=""></div>
           </div>
        <Tofoot v-if="!isloading&&scoredata[0]" />
           
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import Nullcontent from '@/components/Nullcontent'
import Tofoot from '@/components/Tofoot'
import {handletime} from '@/utils/index'
    export default {
        components:{
            Hearder,
            Nullcontent,
            Tofoot
        },
        data(){
            return{
                scoredata:'',
                page:1,
                isOffUpload:true,
                isloading:true,
            }
        },
        methods:{
            getdata(){
                this.$axios.get(`/ddyj/integral`,{pn:this.page}).then(res => {
                    this.isOffUpload = false; //先开启下拉
                    res.data.forEach(item => {
                        switch(item.type){
                            case 1:
                            item.typeName = '登录'
                                break;
                            case 2:
                            item.typeName = '修改密码'
                                break;
                            case 3:
                            item.typeName = '发布云互动主题'
                                break;
                            case 4:
                            item.typeName = '回复云互动主题'
                                break;
                            case 5:
                            item.typeName = '查看新闻'
                                break;
                            case 6:
                            item.typeName = '学习党史'
                                break;
                            case 7:
                            item.typeName = '提交个人总结'
                                break;
                            case 8:
                            item.typeName = '查看他人总结'
                                break;
                            default:
                                break;
                        }
                        item.mark = item.mark / 10
                        item.createTime = handletime(item.createTime)
                    })
                    this.scoredata =[...this.scoredata,...res.data] 
                    
                    if(res.data.length < 10){
                        this.isOffUpload = true;    //关闭下拉
                        this.isloading = false;
                    }
                })
            },
            // 上拉加载
            loadMore(){
                console.log('上拉了')
                this.page = this.page + 1
                this.getdata()
            }
        },
        created(){
            this.getdata()
        }
        
    }
</script>

<style scoped lang="less">
.item{
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    height: 1.6rem;
    .left{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .row1{
            font-size: 0.34rem;
        }
        .row2{
            font-size: 0.24rem;
        }
    }
    .right{
        color: #f00;
    }
}
</style>