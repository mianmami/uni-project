
// #ifndef VUE3
import Vue from 'vue'
import App from './App'



import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.beforeRequest = function (options) {
  uni.showLoading({
    title:'正在加载数据'
  })
}
$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif



/* 
1.自定义的组件不需要注册，直接在页面中用就行了
2. <view class='my-search-container' :style="{backgroundColor: 'red'}"> 要么还可以  
  <view class='my-search-container' :style="{'background-color': 'red'}">
  还有个class样式的写法：:class="['left-scroll-view-item', i === active ? 'active' : '']"
3.position: sticy； 配合设定一个top: XXXpx 表示这个元素滚动到top == XXpx 的时候，这个元素就会固定不动了
4.一个应用场景： 当在一个选项卡往下浏览的时候，切换到另一个选项卡，需要置顶，那么就需要设置scroll-top
  但是如果前后的值是一样的，是不会发生变化的。所以让scroll-top的值，在等于0的时候为1，1的时候为0，就能避免
5.吸顶效果：
    position: stiky;
    top: 0; // 吸顶的位置
    z-index: 999; //防止被其他元素覆盖
6.防抖的功能实现，例如500ms类，不会重复发送请求 在search.vue的input函数中实现
7.uni-tag margin-top不生效，是因为里面是个text文本
  解决方法一：display: block
**8.在goods_list.vue页面中，getGoodsList需要上拉刷新，也需要下拉刷新。而上拉刷新需要人为结束，做法是传递了一个回调函数，然后用了cd && cd()来执行这个回调函数，这个写法很妙！！！
9.在goods_list.vue页面，要注意做两个判断，一个是通过Loading节流阀控制多次发送请求，二是判断数据是否加载完毕，从而不发送网络请求

 */

