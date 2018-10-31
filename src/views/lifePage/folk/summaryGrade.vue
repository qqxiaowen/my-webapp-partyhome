<template>
    <div class="pt110">
        <Hearder />
        <div class="personsummary">
            <span>个人总结</span>
            <div class="item" v-for="(item,index) in summary" :key="index">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
    export default {
        components:{
            Hearder
        },
        data(){
            return{
                summary:''
            }
        },
        methods:{
            getSummary(){
                let {id} = this.$route.params;
                this.$axios.get(`/ddyj/summary/${id}`).then(res => {
                    this.summary = res.data.contents
                })
            }
        },
        created(){
            this.getSummary()
        }        
    }
</script>

<style scoped lang="less">
.personsummary{
    padding: 0.2rem;
    width: 6.8rem;
    text-align: center;
    span{
        display: block;
        padding-bottom: 0.4rem;
    }
    .item{
        margin-bottom: 0.1rem;
        padding: 0.2rem;
        box-sizing: border-box;
        img{
            width: 100%;
        }
    }
}
</style>