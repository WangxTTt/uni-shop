<template>
  <view class="goodsitem">
    <!-- <radio v-if="showRadio" :checked="goods.goods_state" color="#C00000" @click="radioClickHandler"></radio> -->
    <!-- 勾选框的插槽 -->
    <slot name="radio"></slot>
    <view class="goodsimgbox">
       <image :src="goods.goods_small_logo||defaultPic" class="goodsimg"></image>
    </view>
    <view class="goodstext">
      <view class="goodsname">{{goods.goods_name}}</view>
      <view  class="goodsprice">
        <view>￥{{goods.goods_price|tofixed}}</view>
        <!-- 商品数量的插槽 -->
        <slot name="goodscount" class="count"></slot>
      </view>
      
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
      },
      showRadio:{
        type:Boolean,
        default:false
      }
    },
    filters:{
      //把价格处理为带两位小数点的
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    methods:{
    //   radioCh(){
    //     //radioChange
    //    this.$emit('radio-change', {
    //    // 商品的 Id
    //    goods_id: this.goods.goods_id,
    //    // 商品最新的勾选状态
    //    goods_state: !this.goods.goods_state
    //    })
    // },
    // radio 组件的点击事件处理函数
   // radioClickHandler() {
      //console.log("子组件点击之前的state",this.goods.goods_state)
    // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
    // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
   // this.$emit('radio-change', {
    // 商品的 Id
    //goods_id: this.goods.goods_id,
    // 商品最新的勾选状态
    // goods_state: this.goods.goods_state?false:true
    // })
    // console.log('子组件点击之后:', this.goods.goods_state);
    // }
  },
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
          display: flex;
          justify-content: space-between;
          .count{
           
          }
        }
    }
    
  }
</style>