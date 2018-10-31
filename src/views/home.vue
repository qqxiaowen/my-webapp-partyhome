<template>
    <div class="home pt110 pb104">
        <div class="top">
            <div class="top_left"></div>
            <div class="tip_right">
                <router-link to='/login'>登录</router-link>
            </div>
        </div>
        <div class="lunbo">

            <swiper :options="secondOptions" ref="mySwiper" >
                <swiper-slide v-for="(item) in LunboData" :key="item.id">
                     <router-link :to="{name: 'newDetail', params: {id:item.newsId}}">
                        <img :src= "item.img" >
                        <span>{{item.title}}</span>
                    </router-link>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

        </div>
       
        <div class="navicon">
            <ul>
                <li><router-link to='/dadilEyes'><img src="/static/img/icon_01.png">信工新闻眼</router-link></li>
                <li><router-link to='/life'><img src="/static/img/icon_02.png">掌上组织生活</router-link></li>
                <li @click="isInteLogin"><router-link to='' ><img src="/static/img/icon_03.png">党员云互动</router-link></li>
                <li><router-link to='/oneclick'><img src="/static/img/icon_04.png">党建一点通</router-link></li>
                <li><router-link to='/showrank'><img src="/static/img/icon_05.png">党员亮身份</router-link></li>
                <li><router-link to='/partytoday'><img src="/static/img/icon_06.png">党史上的今天</router-link></li>
            </ul>
        </div>
        <div class="imgnav"></div>
        <div class="imgnav2">
            <div class="imgnav_left"></div>
            <div class="imgnav_right">
                <div class="row">
                    <router-link to='/anystudy'></router-link>
                    <router-link to='/anyphoto'></router-link>
                </div>
                <div class="row">
                    <router-link to='/system'></router-link>
                    <router-link to='/activity'></router-link>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import Footer from '../components/Footer'
    import { islogin } from '@/utils/redlogin'

    export default {
        components: {
            swiper,
            swiperSlide,
            Footer
        },
        data() {
            const vm = this;
        return {
            // 轮播图配置
            secondOptions: {
                autoplay: 3000,
                loop:true,
                pagination : '.swiper-pagination',
                onTouchEnd: function(swiper){
                    setTimeout(() => {
                        swiper.startAutoplay()
                    }, 1)
                    // 会报错
                },
            },
            
            // 数据
            LunboData:[],
            
        }
    },
    methods:{
        getLunboData(){
            this.$axios.get(`/ddyj/swiper`).then(res => {
                if(res.code == 200){
                    this.$nextTick(() => {
                        this.LunboData = res.data
                    })
                }
            })
        },
        isInteLogin(){
            islogin('interaction',this)
        }
      
    },
    created(){
        this.getLunboData()
    },
    

    }
</script>

<style scoped lang='less'>
@import '../viewStyles/home.less';
</style>

