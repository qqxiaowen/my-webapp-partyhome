<template>
    <div class="bscroll">
        <Hearder style="position: static" />
        <div class="mian" ref="main">
            <div>
                <div class="item" v-for="(item,index) in arr" :key='index'>
                {{item}}
            </div>
            </div>
        </div>
        <div class="button">
            <input type="text" v-model="text">
            <button @click="handleClick">发送</button>
        </div>
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import BScroll from 'better-scroll'
    export default {
        components:{
            Hearder
        },
        data(){
            return{
                BS:null,
                text:'',
                arr:[
                    '1','2','3','4','5',
                    '6','7','8','9','10',
                    '1','2','3','4','5',
                    '6','7','8','9','10',
                    '1','2','3','4','5',
                    '6','7','8','9','10',
                ]
            }
        },
        methods:{
            initscroll(){
                let main = this.$refs.main
                this.BS = new BScroll(main,{mouseWhell:true,scrollbar:true})
            },
            handleClick(){
                this.arr.push(this.text)
                this.text = ''
                this.$nextTick(() => {
                    this.BS.refresh()
                    let scrollTop = this.$refs.main.scrollHeight - this.$refs.main.offsetHeight
                    this.BS.scrollTo(0,-scrollTop,300)
                })
            }
        },
        mounted(){ // 将overflow hidden 去除
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
            document.getElementById('app').style.overflow = 'hidden'
            this.initscroll()
        },
        beforeDestroy(){
            document.documentElement.style.overflow = 'auto'
            document.body.style.overflow = 'auto'
            document.getElementById('app').style.overflow = 'auto'
        }
    }
</script>

<style scoped lang="less">
.bscroll{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    .mian{
        flex: 1;
        background: #f1f1f1;
        overflow: hidden;
    }
}
.item{
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #ff0;
}
.button{
    display: flex;
    input{
        height: 45px;
        line-height: 45px;
        padding:  0 10px;
        background: #e7e7e7;
        border: none;
        flex: 1;
        outline: none;
        -webkit-appearance: none;
    }
    button{
        margin-left: 10px;
        border: none;
        background: #fff;
        width: 80px;
        height: 45px;
        outline: none;
    }
}
</style>