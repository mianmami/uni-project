<template>
  <view>
    <!-- 搜索框-->
    <my-search @click.native="gotoSearch"></my-search>

    <view class='scroll-view-container'>
      <!-- 左侧滑动区域-->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <view :class="['left-scroll-view-item', idx === active ? 'active' : '']" @click="activeChanged(idx)"
          v-for="(item, idx) in cateList" :key="idx">{{item.cat_name}}</view>
      </scroll-view>

      <scroll-view scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class='cate-lv2' v-for="(item,idx) in cateLevel2" :key="idx">
          <view class='cate-lv2-title'>{{item.cat_name}}</view>
          <view class='cate-lv3-list'>
            <view class='cate-lv3-item' v-for="(item3, idx3) in item.children" :key="idx3"
              @click="gotoGoodsList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        cateLevel2: [],
        active: 0,
        scrollTop: -1,
      };
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get("http://192.168.199.150:8080/prefix/api/public/v1/categories")
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        });
      },
      getScrollHeight() {
        const sysInfo = uni.getSystemInfoSync();
        this.wh = sysInfo.screenHeight - 50
      },
      activeChanged(i) {
        this.active = i;
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },

    },
    onLoad() {
      this.getScrollHeight()
      this.getCateList()
    }

  }
</script>

<style lang="less">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #FFFFFF;
          position: relative;

          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }

        ;
      }
    }
  }
</style>
