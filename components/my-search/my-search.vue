<template>
  <view class="search" :style="{'background':bgcolor}" @click="searchHandle">
    <view class="inp" :style="{'border-radius':radius+'px'}">
        <uni-icons type="search" size="20" ></uni-icons>
        <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      //背景颜色
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:18
      }
      //圆角尺寸
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchHandle(){
        this.$emit('gotoSearch')
      },
    
    }
  }
</script>

<style lang="scss">
.search{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  //提高层级，防止滚动的时候被轮播图覆盖
  z-index: 999;
  .inp{
    width: 80%;
    height: 40px;
    background-color: #FFFFFF;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
}
</style>