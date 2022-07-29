<template>
  <view>
    <view class='search-box'>
      <uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
    </view>
    <!-- 如果又搜索历史就展示，没有就展示空，等待搜索返回的结果，然后进行展示-->
    <view class='sugg-list' v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item) in searchResults" :key="item.goods_id" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class='history-box' v-else>
      <view class='history-title'>
        <text>搜索历史</text>
        <uni-icons type='trash' size='17' @click='clean'></uni-icons>
      </view>
      <view class='history-list'>
        <uni-tag  class='uniTag' :text="item" v-for="(item,idx) in histories" :key='idx' @click='gotoGoodsList(item)'>
        </uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        historyList: [],
        searchResults: []
      }
    },
    computed: {
      histories() {
        return [...this.historyList].reverse() // 直接reverse会修改原来的列表
      }
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 1000)

      },
      saveSearchHistory() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
        })
      },
      gotoGoodsList(item) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?query=${item}`
        })
      },
      clean() {
        uni.removeStorageSync('kw')
        this.historyList = []
      },
      async getSearchList() {
        if (this.kw.length == 0) {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('http://192.168.199.150:8080/prefix/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory()
      },

    },
    onLoad() {

      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
  }
</script>

<style lang="less">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    .uni-searchbar{
      background-color: #C00000;
    }
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        margin-right: 3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;

      

     
      .uni-tag {
        // display: block;
        // margin-bottom: 5px;
        // margin-right: 5px;
      }
    }
  }
</style>
