<template>
  <view>
    <!-- 轮播图区域-->
    <swiper circular indicator-dots autoplay :interval="3000" :duration="1000">
      <swiper-item v-for="(item) in swiperList" :key="item.goods_id">
        <navigator class='swiper-item'>
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域-->
    <view class='nav-list'>
      <view v-for="(item) in navList" :key="item.image_src">
        <image :src="item.image_src"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view>
      <view class='floor-item' v-for="(item, idx) in floorList" :key='idx'>
        <!-- 标题-->
        <image class="floor-title" :src="item.floor_title.image_src"></image>
        <!-- 内容-->
        <view class='floor-image-box'>
          <view class="left-img-box">
            <navigator>
              <image :src='item.product_list[0].image_src' :style="{width: item.product_list[0].image_width+'rpx'}"
                mode='widthFix'>
              </image>
            </navigator>
          </view>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,idx2) in item.product_list" :key="idx2" v-if="idx2 !== 0">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>

        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('http://192.168.199.150:8080/prefix/api/public/v1/home/swiperdata')
        // await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },

      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('http://192.168.199.150:8080/prefix/api/public/v1/home/catitems')
        // await uni.$http.get('https://www.uinav.com/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },

      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('http://192.168.199.150:8080/prefix/api/public/v1/home/floordata')
        // await uni.$http.get('https://www.uinav.com/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()

        this.floorList = res.message
      }

    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()

    },
  }
</script>

<style lang="less">
  .swiper-item {
    height: 330rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .floor-image-box {
    display: flex;
    padding-left: 10rpx;
  }

  .right-img-box {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
  }
</style>
