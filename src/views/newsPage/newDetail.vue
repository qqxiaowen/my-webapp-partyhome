<template>
    <div class="new_datil pt110">
        <Hearder :title="title" />
        <div class="loading" v-if="isloading"><img  src="@/svg/loading.svg" alt=""></div>
        <div class="detail">
            <div class="title" v-text="nwedetail.title"></div>
            <div class="content" v-html="nwedetail.content"></div>
        </div>
    </div>
</template>

<script>
import Hearder from '../../components/Hearder'
    export default {
        components:{
            Hearder
        },
        data(){
            return{
                nwedetail:{},
                isloading:true,
                title: ''
            }
        },
        methods:{
            getnewdata(){
                this.$axios.get(`/ddyj/news/${this.$route.params.id}`).then(res => {
                    this.isloading = false;
                    this.nwedetail = res.data
                    this.title = res.data.type.title
                })
            }
        },
        created(){
            this.getnewdata()
        }
        
    }
</script>





