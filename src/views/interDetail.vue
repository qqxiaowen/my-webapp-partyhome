<template>
    <div class=" interdetail">
        <Hearder style="position: absolute" />
        <div class=" pt110 main2" ref="main">
            <div v-infinite-scroll="handleBootom"
                 infinite-scroll-disabled="isOffDown">
                <div class="item itme-ys" v-if="replytop&&replytop.user">
                    <div class="row1">
                        <div class="left">
                            <img :src="replytop.user.avatar" alt="">
                            <div>
                                <div class="title">{{replytop.user.nicheng}}</div>
                                <div class="date-message">
                                    <span><i class="dmiconys iconfont icon-shijian"></i>{{replytop.createTime}}</span>
                                    <span><i class="dmiconys iconfont icon-xiaoxi"></i>公开</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="right">党员互动</div>
                    </div>
                    <div class="row2">
                        {{replytop.content}}
                    </div>
                </div>

                <div >
                    <div class="item " v-for="(item,index) in replybody " :key=index>
                        <div class="row1">
                            <div class="left">
                                <img :src="item.user.avatar" alt="">
                                <div>
                                    <div class="title">{{item.user.nicheng}}</div>
                                    <div class="date-message">
                                        <span><i class="dmiconys iconfont icon-shijian"></i>{{item.createTime}}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="right">党员互动</div>
                        </div>
                        <div class="row2">
                            {{item.content}}
                        </div>
                    </div>
                    <Nullcontent v-if="!isloging&&!replybody[0]" />
                    <Tofoot v-if="!isloging&&replybody[0]" />
                </div>
                <div class="loading" v-if="isloging"><img  src="@/svg/loading.svg"   alt=""></div>
            </div>
        </div>

        <div class="talk">
            <input type="text" v-model="talk.content">
            <button @click="handletalk">评论</button>
        </div>
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import Nullcontent from '@/components/Nullcontent'
import Tofoot from '@/components/Tofoot'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui';
import {handletime} from '@/utils/index'
import BScroll from 'better-scroll'

    export default {
        components:{
            Hearder,
            Nullcontent,
            Tofoot,
        },
        data(){
            return{
                BS:'',
                replytop:'',
                replybody:'',
                isloging:true,
                isOffDown:true,
                  talk:{
                    topic_id:'',
                    content:''
                },
                pn:1,
            }
        },
        methods:{
            getreplytop(){ //获取主题
                this.$axios.get(`/ddyj/topic/${this.talk.topic_id}`).then(res => {
                    this.replytop = res.data
                    this.replytop.createTime = handletime(this.replytop.createTime)
                    this.getreplybody()
                })
                
            },

            getreplybody(){ // 获取主题下的评论
                this.$axios.get(`/ddyj/common/bytopic/${this.talk.topic_id}`,{pn:this.pn}).then(res => {
                    this.isOffDown = false,
                    res.data.forEach(item => {
                        item.createTime = handletime(item.createTime)
                    })
                    this.replybody = [...this.replybody,...res.data]
                    if(res.data.length < 10){  //没有数据了
                        this.isloging = false;
                        this.isOffDown = true;
                    }
                })
            },
            handletalk(){ //添加评论
                this.$axios.post(`/ddyj/common`,this.talk).then(res => {
                    if(res.code == 200){
                        Toast('评论成功')
                        // this.getreplybody();
                        // this.replybody.push()
                        this.replybody = '',
                        this.pn = 1,
                        this.getreplybody()
                    }else{
                        Toast(res.msg)
                    }
                })
            },
            handleBootom(){ //下拉加载
                console.log('下拉了')
                // this.pn = this.pn + 1
                // this.getreplybody();
            },
            initscroll(){ // 初始化BS
                let main = this.$refs.main
                this.BS = new BScroll(main,{mouseWhell:true,scrollbar:true})

            }

        },
        created(){
            this.talk.topic_id = this.$route.params.id
            this.getreplytop()
        },
        mounted(){
            this.initscroll()
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
            document.getElementById('app').style.overflow = 'hidden'
        },
        beforeDestroy(){
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
    margin-bottom: 0.05rem;
    padding: 0.2rem;
    background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
/deep/ .itme-ys{
    margin: 0.2rem;
    border: 1px solid #ddd;

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
    width: 1.2rem;
    height: 0.5rem;
    display: none;
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
.talk{
    // position:fixed;
    display: flex;
    justify-content: space-between;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // height: 0.6rem;
    background: #f1f1f1;
    padding:  0.1rem 0.2rem;
    z-index: 996;
    input{
        flex: 1;
        border: 1px solid #f00;
        border-radius: 4px;
        padding: 0 10px;
        margin-right: 0.2rem;
        box-sizing: border-box;
        height: 0.6rem;
        outline: none;
    }
    button{
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 4px;
        border: none;
        background: #f00;
        color: #fff;
        outline: none;
        padding: 0 0.2rem;
    }
}

</style>
<style>
.interdetail{
    display: flex;
    flex-direction: column;    
    height: 100%;
    overflow: hidden;
}
.main2{
    flex: 1;
    background: #e8e8e8;
    overflow: hidden;
    /* overflow-y: scroll; */
    /* -webkit-overflow-scrolling:touch; */
}
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
</style>

