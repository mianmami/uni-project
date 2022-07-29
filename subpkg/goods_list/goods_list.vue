<template>
  <view>
    <view class="goods-list">
      <view v-for="(good, idx) in goodlist" :key="idx" @click="gotoDetail(good)">
        <my-goods :good="good"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodlist: [],
        loadding: false,
        total: 0,
      };
    },
    methods: {
      async getGoodsList(cb) {
        this.loadnig = true
        const {
          data: res
        } = await uni.$http.get('http://192.168.199.150:8080/prefix/api/public/v1/goods/search', this.queryObj)
        this.loading = false
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodlist = [...this.goodlist, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList();
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return
      if (this.loading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="less">

</style>
