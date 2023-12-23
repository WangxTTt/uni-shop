<template>
  <view class="cartbuttom">
    <view class="allselectc">
       <radio color="#C00000" :checked="isCheckAll" @click="changeAllSelect"></radio>
       <view>全选</view>
    </view>
    <view >合计:
      <text class="price">￥{{goodsCountSum}}</text>
    </view>
    <view>
       <button type="primary" class="sumbtn">结算({{checkedCount}})</button>
    </view>
   
  </view>
</template>

<script>
  import {mapMutations,mapState,mapGetters} from 'vuex'
  export default {
    name:"my-sum",
    computed:{
      ...mapState('m_cart',['cart']),
      ...mapGetters('m_cart',['checkedCount','total','goodsCountSum']),
      isCheckAll(){
        return this.total===this.checkedCount
      }
    },
    data() {
      return {
      };
    },
    onLoad(){

    },
  
    methods:{
      ...mapMutations('m_cart',['updateaAllGoodsState']),
      changeAllSelect(){
        console.log(!this.isCheckAll)
        this.$store.commit('m_cart/updateaAllGoodsState',!this.isCheckAll)
      }
      // getCartLength(){
      //     this.cartLength = this.cart.reduce((count, item) => {
      //         if (item.goods_state) {
      //           count++;
      //         }
      //         return count;
      //       }, 0)
      //       console.log(this.cartLength)
      // }
    }
  }
</script>

<style lang="scss">
.cartbuttom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  width: 100%;
  .allselectc{
    display: flex;
  }
  .price{
    color: #C00000;
  }
  .sumbtn{
    background-color: #C00000;
  }
}
</style>