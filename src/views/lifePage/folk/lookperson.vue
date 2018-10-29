<template>
    <div class="pt110">
        <Hearder />
        <div class="lookcontent"
        v-infinite-scroll="downUpLoad"
        infinite-scroll-disabled="isOffDown"
       >
            <div class="item" v-for="item in person" :key=item.id>
                <div class="left">
                    <img :src="item.avatar" alt="">
                    <span>{{item.nicheng}}</span>
                </div>
                <div class="right" v-text="branchName">
                </div>
            </div>
        </div>
        <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg" alt=""></div>
        <Nullcontent v-if="!isloading&&!person[0]" />
        <Tofoot v-if="!isloading&&person[0]" />
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import Nullcontent from '@/components/Nullcontent'
import Tofoot from '@/components/Tofoot'
    export default {
        components:{
            Hearder,
            Nullcontent,
            Tofoot
        },
        data(){
            return{
                person:'',
                page:1,
                branchName:'',
                isOffDown:true,
                isloading:true,
                tofoot:false,
            }
        },
        methods:{
            getdata(){
                let {branch} = this.$route.query
                this.$axios.get(`/user/branch?branch=${branch}&page=${this.page}&rows=15`).then(res => {
                    this.person = [...this.person,...res.data]
                    this.isOffDown = false;
                    this.isloading = false;
                    if(res.data.length <= 15){ //没有数据了
                        this.isOffDown = true;
                        this.tofoot = true;
                    }
                })
            },
            downUpLoad(){
                this.page = this.page + 1
                this.isloading = true;
                this.getdata()
            }
        },
        created(){
            switch(this.$route.query.branch){
                case 1:
                    this.branchName ='第一支部'
                    break;
                case 2:
                    this.branchName ='第一支部'
                    break;
                case 3:
                    this.branchName ='第一支部'
                    break;
                default:
                    this.branchName ='第一支部'
                    break;
            }
            this.getdata()
        }
        
    }
</script>

<style scoped lang='less'>
.item{
    display: flex;
    height: 1rem;
    line-height: 1rem;
    justify-content: space-between;
    padding: 0 0.2rem;
    border-bottom: 1px solid #ddd;
    color: #666;
    .left{
        font-size: 0.34rem;
        img{
            float: left;
            width: 0.6rem;
            height: 0.6rem;
            margin: 0.2rem 0.14rem 0 0;
        }
    }
    .right{
        font-size: 0.28rem;
    }
}
</style>