<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
html{
  height: 100%;
}
body {
  height: 100%;
  font-size: 16px;
  -webkit-overflow-scrolling:touch;
}
#app{
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
a{
  text-decoration: none;
}
.flr {
  float: right;
}
.fll {
  float: left;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
.pt110{
  padding-top: 1.1rem;
}
.pb104{
  padding-bottom: 1.04rem;
}
/* 全局表单样式 */
input {
  -webkit-appearance:none
}
.loading {
  margin: 0.24rem 0;
  text-align: center;
}
.loading img{
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 auto;
}
</style>
<style lang="less">
.detail{
    padding: 0.2rem;
    .title{
        font-size: 0.5rem;
        margin: 0.2rem 0;
    }
    .content{
        line-height: 0.5rem;
        
    }
  /deep/ p{
      font-size: 14px;
      margin: 0.2rem 0;
      line-height: 2;
  }
  /deep/ h2{
      font-size: 22px;
      margin: 0.2rem 0;
      font-weight: 500;
  }
  /deep/ h4{
      font-size: 18px;
      margin: 0.2rem 0;
      font-weight: 500;
  }
  /deep/ span{
      font-size: 16px;
  }
  /deep/ img{
  display: block;
  max-width:100%;
  margin: 0.2rem 0;
  }
}
</style>
