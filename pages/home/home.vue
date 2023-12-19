<template>
  <view>
    <view class="search">
       <my-search @gotoSearch="gotoSearch"></my-search>
    </view>
    <!-- 轮播图 -->
  <swiper class="swiper" 	:indicator-dots="true" 	:autoplay="true" 	:interval='3000'	:circular="true">
    <swiper-item v-for="item in swiperList" :key="item.good_id" >
      <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id" class="swiperimg">
        <image class="swimage" :src="item.image_src"></image>
      </navigator>
    </swiper-item>
  </swiper>
  
  <!-- 分类导航区域 -->
  <view class="nav">
    <view v-for="(item,index) in navList" :key="index">
        <image :src="item.image_src" class="navimg"  @click="navClickHandler(item)"></image>
      </view>
    </view>
    <!-- 楼层视图 -->
    <view class="floor">
      <view v-for="(item,index) in FloorList" :key="index" >
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floortitle"></image>
        
          <!-- 楼层图片 -->
        <view class="floorimg">
          <!-- 左侧大图片 -->
            <image :src="item.product_list[0].image_src" class="floorimg0" mode="widthFix" @click="floorImgGoDetail(index,0)"></image>
          <!-- 右侧小图片 -->
          <view class="floorimg1234">
            <image :src="item.product_list[1].image_src" class="flimg" mode="widthFix" @click="floorImgGoDetail(index,1)"></image>
            <image :src="item.product_list[2].image_src"class="flimg"mode="widthFix" @click="floorImgGoDetail(index,2)"></image>
            <image :src="item.product_list[3].image_src"class="flimg"mode="widthFix"@click="floorImgGoDetail(index,3)"></image>
            <image :src="item.product_list[4].image_src"class="flimg"mode="widthFix"@click="floorImgGoDetail(index,4)"></image>
          </navigator>
        </view>
        </view>
        <!-- <view class="Floorimg" v-for="(Floorimg,index) in item.product_list" :key=index>
          <image :src="Floorimg.image_src"></image>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        //分类导航
        navList:[],
        //首页楼层数据
        FloorList:[]
      };
    },
    onLoad(){
     this.getSwiperList(),
     this.getNavList(),
     this.getFloorList()
    },
    methods:{
      //获取轮播图数据
      async getSwiperList(){
      const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
      // console.log('这是mesage',res.message)
        if(res.meta.status!==200){
          return uni.$showMsg()
        }
          this.swiperList = [...res.message]
          // console.log('这是swiperList',this.swiperList)
      },
     //获取轮播图下面的导航栏数据
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log('这是导航栏',res)
        if(res.meta.status!==200){
          return uni.$showMsg()
        }
        this.navList = res.message
        // console.log('这是navlist',this.navList)
       },
       //点击轮播图下面的导航栏的跳转处理事件
       navClickHandler(item){
         if(item.name==='分类'){
           uni.switchTab({
             url:'/pages/cart/cart'
           })
         }
       },
       //获取楼层的数据
       async getFloorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
         if(res.meta.status!==200){
           return uni.$showMsg()
         }
         res.message.forEach(floor=>{
           floor.product_list.forEach(prod=>{
             prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
           })
         })
         this.FloorList = res.message
         console.log('这是FloorList',this.FloorList)
       },
       floorImgGoDetail(index,num){
         uni.navigateTo({
           url: this.FloorList[index].product_list[num].url
         });
       },
       gotoSearch(){
         uni.navigateTo({
           url:'/subpkg/search/search'
         })
       }
    }
  
  }
</script>

<style lang="scss">
.swiper{
  height: 330rpx;
  .swiperimg{
    height: 100%;
  }
  .swimage {
    width: 100%;
  }
}
.nav{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .navimg{
    width: 128rpx;
    height: 140rpx;
  }
}
.floor{
  .floortitle{
    width: 100%;
    height: 60rpx;
    margin-top: 20rpx;
  }
  .floorimg{
    display: flex;
    .floorimg0{
      width: 430rpx;
      height: 400rpx;
    }
  
  .floorimg1234{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .flimg{
      height: 200rpx;
      width: 240rpx;
    }
    }
  }
}
.search{
  position: sticky;
  top: 0;
  //提高层级，防止滚动的时候被轮播图覆盖
  z-index: 999;
}
</style>
