<template>
  <view>
    <view v-if="cart.length===0" class="emptycartbox">
      <image src="../../static/cart_empty@2x.png" class="emptycart"></image>
      <view class="emptytext">空空如也~</view>
    </view>
    <view v-else="cart.length!==0">
    <my-address></my-address>
    <!-- 购物车页面顶部 -->
    <view class="carttopbox">
      <uni-icons type="shop" size="23" class="shop"></uni-icons>
      <view class="carttop">购物车</view>
    </view>
    <!-- 购物车的商品项 -->
    <!-- uni-swiper-action是滑动删除的效果 -->
    <uni-swipe-action>
    <block v-for="goods in cart" :key="goods.goods_id">
    <!-- <goods-item :goods="goods" :showRadio="true" @radio-change="radioChangeHandle"></goods-item> -->
    <uni-swipe-action-item :right-options="options" @click="deleteGoodFromCart(goods.goods_id)">
    <goods-item :goods="goods">
      <block v-slot:radio>
        <radio :checked="goods.goods_state" color="#C00000" @click="radioChange(goods.goods_id)"></radio>
      </block>
      <block v-slot:goodscount>
        <uni-number-box :min="1" :value="goods.goods_count" @change.prevent="changeGoodCount($event,goods.goods_id)"></uni-number-box>
      </block>
    </goods-item>
    </uni-swipe-action-item>
    </block>
    </uni-swipe-action>
    <my-sum></my-sum>
  </view>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import {mapState,mapMutations} from 'vuex'
  export default {
   mixins:[badgeMix],
   computed:{
     ...mapState('m_cart',['cart']),
     ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','deleteGood'])
   },
    data() {
      return {
        options:[{
          text:'删除',
          style:{
            backgroundColor:'#C00000'
          }
        }]
      };
    },
   
    methods:{
     // radioChangeHandle(e){
     //  console.log(e)
     //   this.$nextTick(() => {
     //        console.log('父组件After click:', e.goods_state);
     //        // 这里执行其他操作，确保在 DOM 更新后获取到正确的状态
     //      });
     //  // this.updateGoodsState({goods_state:!e.goods_state,goods_id:e.goods_id})
     // }
     //将点击的那个商品的id作为参数传递过来，然后调用vuex里面的方法去修改该商品的goods_state值
     radioChange(id){
       console.log(id)
      this.$store.commit('m_cart/updateGoodsState', id);
     },
     //修改商品数量的方法
     changeGoodCount(e,id){
       console.log('goodscount',e,id)//输出的点击后商品的数量
       // e.stopImmediatePropagation()
       const goods={count:e,goods_id:id}
     this.$store.commit('m_cart/updateGoodsCount', goods);
     },
     deleteGoodFromCart(goods_id){
       this.$store.commit('m_cart/deleteGood',goods_id)
     }
    }
  }
</script>

<style lang="scss">
  .emptycartbox{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50%;
    .emptycart{
      width: 100px;
      height: 100px;
    }
    .emptytext{
      color:gray;
    }
  }
.carttopbox{
  display: flex;
  height: 90rpx;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ddd;
  .shop{
    margin-left: 10rpx;
  }
  .carttop{
    margin-left: 20px;
  }
  }
</style>
