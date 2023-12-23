<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
      <button type="primary" class="btn" @click="gotoSelectAddress">请选择收货地址+</button>
    </view>
    <view class="selectaddress" v-else @click="gotoSelectAddress">
      <view class="addressinfo">
        <view class="pepleinfo">
          <view class="peplename">收件人：{{address.userName}}</view>
          <view class="phone">电话：{{address.telNumber}}</view>
        </view>
        <view class="address">收货地址：{{addstr}}</view>
      </view>
      <view class="right" @click="gotoSelectAddress">></view>
    </view>
    <!-- 底部的分割线 -->
    <image src='../../static/cart_border@2x.png' class="address-border"></image>
  </view>
</template>

<script>
  import {mapMutations,mapState,mapGetters} from 'vuex'
  export default {
    name:"my-address",
    computed:{
      ...mapState('m_user',['address']),
     ...mapGetters('m_user',['addstr'])
    },
    data() {
      return {
       // address:{},
      };
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
     async gotoSelectAddress(){
        // uni.navigateTo({
        //   url:'/subpkg/address/address'
        // })
        const [err,succ] = await uni.chooseAddress().catch(err=>err)
        if(err===null && succ.errMsg==='chooseAddress:ok'){
          //this.address = succ
          this.$store.commit('m_user/updateAddress', succ);
           console.log(this.address)
        }
        
      }
    }
  }
</script>

<style lang="scss">
  .address-choose-box{
    height: 235rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn{
    }
  }
.address-border{
  display: block;
  height: 5px;
  width: 100%;
}
.selectaddress{
  display: flex;
  justify-content: space-between;
  height: 235rpx;
  align-items: center;
  .right{
    margin-bottom:43px;
    margin-right: 10px;
  }
}

.addressinfo{
  display: flex;
  flex-direction: column;
  .pepleinfo{
    display: flex;
    justify-content: space-between;
     margin-left: 8px;
    .peplename{
    }
    .phone{
      
    }
  }
  .address{
    margin-top: 20px;
    margin-left: 8px;
  }
}
</style>