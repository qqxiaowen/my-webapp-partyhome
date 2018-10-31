<template>
    <div>
        <Hearder />
        <div class="clearfix pt110">
            <div  v-infinite-scroll="handleBootom"
            infinite-scroll-disabled="isOffDown"
            >
                <div class="item"  v-for="(item,index) in newData" :key=index>
                    <div @click="$router.push(`/newDetail/${item._id}`)">
                        <img :src="item.img" alt="">
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg"   alt=""></div>

        <Nullcontent v-if="!isloading&&!newData[0]"  />
        <Tofoot v-if="!isloading&&newData[0]" />
    </div>

</template>

<script>
import Hearder from '@/components/Hearder'
import Nullcontent from '@/components/Nullcontent'
import Tofoot from '@/components/Tofoot'
// import {handletime} from '@/utils/index'

    export default {
        components:{
            Hearder,
            Tofoot,
            Nullcontent,
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
                    // res.data.forEach(item => {
                    //     item.createTime = handletime(item.createTime)
                    // })
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
        }
        
    }
</script>

<style scoped lang="less">

.item{
    float: left;
    width: 3rem;
    height: 2.4rem;
    margin: 0.25rem 0.25rem 0.6rem 0.25rem;
    border: 0.05rem solid transparent;
    img{
        display: block;
        width: 100%;
        height: 2.4rem;
    }
    span{
        font-size: 0.26rem;
        color: #666;
        line-height: 1.5; 
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}

</style>