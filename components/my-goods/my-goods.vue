<template>
  <view class='goods-item'>
    <view class='goods-item-left'>
      <image class='goods-pic' :src="good.goods_small_logo || defaultPic" ></image>
    </view>
    <view class='goods-item-right'>
      <view class='goods-name'>{{good.goods_name}}</view>
      <view class='goods-info-box'>
        <view class='goods-price'>¥{{good.goods_price | toFixed}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props:{
      good:{
        type: Object,
        default: ()=>{return {name: 'huang'}}
      }
    },
    filters:{
      toFixed(num){
        return Number(num).toFixed(2)
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .goods-item-left{
      .goods-pic{
        width: 100px;
        height: 100px;
        margin-right: 5px;
        display: block;
      }
    }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        .goods-price{
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }

</style>