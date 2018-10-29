<template>
    <div class="today pt110">
        <Hearder />
        <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg" alt=""></div>
        <div class="detail">
            <div v-html="content"></div>
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
                content:'',
                isloading:true,
            }
        },
        methods:{
            getData(){
                this.$axios.get(`/ddyj/partytoday`).then(res => {
                    this.content = res.content
                    this.isloading = false;
                })
            },
        },
        
        created(){
            this.getData()
        }
        
    }
</script>
<style lang="less">
.detail{
    h1{
        font-weight: 400;
        font-size: 26px;
    }
}
</style>
