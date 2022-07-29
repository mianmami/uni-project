<template>
  <view class='my-search-container' :style="{backgroundColor: bgcolor}" @click='searchBoxHandler'>
    <view class='my-search-box' :style="{borderRadius: radius + 'px'}">
      <uni-icons type="search" size=17></uni-icons>
      <text class='placeholder'>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props:{
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
    methods:{
      searchBoxHandler(){
        
      }
    }
  }
</script>

<style lang="less">
.my-search-container{
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box{
    height: 36px;
    display: flex;
    background-color: #fff;
    justify-content: center;
    width: 100%;
    align-items: center;
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>