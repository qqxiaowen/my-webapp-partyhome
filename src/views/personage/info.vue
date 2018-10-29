<template>
    <div class="myinfo pt110">
        <Hearder />
        <router-link to="/updateinfo" class="redact">
            编辑
        </router-link>
        <div class="content">
            <div class="content-item">
                <span>头像</span>
                <div class="flr"><img :src="userinfo.avatar" alt=""></div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>姓名</span> 
                <div class="flr">
                    {{userinfo.username}}
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>昵称</span>
                <div class="flr">
                    {{userinfo.nicheng}}
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>工作</span>
                <div class="flr">
                    {{userinfo.job}}
                </div>
            </div>
        </div>
       
        <div class="content">
            <div class="content-item">
                <span>电话</span>
                <div class="flr">
                    {{userinfo.phone}}
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>性别</span>
                <div class="flr">{{userinfo.sex == 1 ? '男' : '女'}}</div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>最高学历</span>
                <div class="flr">{{userinfo.education}}</div>
            </div>
        </div>
        <div class="content">
            <div class="content-item">
                <span>当前身份</span>
                <div class="flr">{{userinfo.partyStatusName}}</div>
            </div>
        </div>
        <div class="content">
            <div class="desc">
                <div class="left">描述</div>
                <div class="right">
                    {{userinfo.desc}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Hearder from '@/components/Hearder'
import { mapState } from 'vuex'
    export default {
        components:{
            Hearder
        },
        computed: mapState({
                userinfo: state => state.userinfo
            }),
        
    }
</script>

<style scoped lang='less'>
.redact{
    position: fixed;
    width: 1.1rem;
    height: 1.11rem;
    line-height: 1.1rem;
    right: 0;
    top: 0;
    z-index: 998;
    font-size: 14px;
    color: #fff;
    text-align: center;

}

/deep/ .content-item{
    padding: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid #e8e8e8;
    img{
        display: block;
        width: 0.6rem;
        height: 0.6rem;
        margin: 0.15rem auto;
    }
}
.desc{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0.2rem;
    font-size: 13px;
    color: #333;
    .left{
        height: 0.9rem;
        line-height: 0.9rem;
    }
    .right{
        max-width: 5rem;
        padding-top: 0.25rem;
        line-height: 1.5;
    }
}
</style>
