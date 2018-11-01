<template>
    <div class="pt110">
        <Hearder />
        <div class="deilber">
            <div class="title">
                评议须知
            </div>
            <div class="content" ><p>在党支部专题组织生活会上，每一位党员要对照评议内容进行个人总结，查摆存在的问题，进行批评与自我批评，明确下一步的努力方向。在此基础上，党支部组织全体党员对每一位党员进行民主评议。评议主要内容如下：</p><p>1、坚定理想信念、贯彻执行党的路线方针政策情况；</p><p>2、参加“两学一做”学习教育情况；</p><p>3、参加党的组织生活、按要求交纳党费；</p><p>4、学习情况、业务能力提高情况；</p><p>5、关心集体、团结同志，发挥先锋模范作用情况；</p><p>6、联系群众、关心群众、服务群众情况；</p><p>7、遵守党章党规、法律法规和学校规章制度情况。</p></div>
            <div class="button">
                <select name='slectbox' v-model="value">
                    <option value="0">请选择</option>
                    <option :value=1>第一党支部</option>
                    <option :value=2>第二党支部</option>
                    <option :value=3>第三党支部</option>
                </select>
                <button @click="handledetil">下一步</button>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import { Toast } from 'mint-ui';

    export default {
        components:{
            Hearder
        },
        data(){
            return{
                value:0,
            }
        },
        methods:{
            handledetil(){
                if(this.value == "0"){
                    Toast('请先选择一项数据')
                }else{
                    this.$router.push(`/lookperson?branch=${this.value}`)
                }
            }
        },
       
    }
</script>

<style scoped lang='less'>
.deilber{
    padding: 0.2rem;
    .title{
        height: 0.8rem;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
    }
    .content{
        padding-top: 0.2rem;
        font-size: 0.28rem;
        color: #666;
        /deep/ p {
            margin: 0.1rem 0;
        }
    }
    
    .button{
        margin: 1.2rem 0.8rem 0;
        display: flex;
        justify-content: space-between;
        height: 0.8rem;
        select{
            -webkit-appearance: none;
            padding-left: 0.2rem;
            width: 3.2rem;
            margin-right: 0.2rem;
            border-radius: 4px;
            background: #c50206;
            color: #fff;
            outline: none;
            option{
                background: #fff;
                color: #000;
                width: 100%;
            }
        }
        button{
            width: 1.8rem;
            border-radius: 4px;
            background: #c50206;
            border: none;
            color: #fff;
            outline: none;
        }
    }
}
</style>