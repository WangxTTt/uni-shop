<template>
  <view class="goodsitem">
    <view class="goodsimgbox">
       <image :src="goods.goods_small_logo||defaultPic" class="goodsimg"></image>
    </view>
    <view class="goodstext">
      <view class="goodsname">{{goods.goods_name}}</view>
      <view class="goodsprice">￥{{goods.goods_price|tofixed}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"goods-item",
    data() {
      return {
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    filters:{
      //把价格处理为带两位小数点的
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goodsitem{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    height: 170px;
    .goodsimgbox{
      width: 135px;
      height: 135px;
      .goodsimg{
        width: 135px;
        height: 135px;
      }
    }
    .goodstext{
      height: 135px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
        .goodsname{
          
        }
        .goodsprice{
          font-size: 19px;
          color: #C00000;
        }
    }
    
  }
</style>