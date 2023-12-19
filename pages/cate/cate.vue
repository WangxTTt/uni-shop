<template>
  <view>
    <!-- 自定义搜索组件 -->
      <my-search @gotoSearch="gotoSearch"></my-search>
  <view class="cateList">
    <!-- 左侧滑动分类区域 -->
    <scroll-view	scroll-y class="leftcate" :style="{height: wh
+ 'px'}">
      <block  v-for="(item,i) in cateList" :key="item.cat_id">
        <view :class="['leftlist',i===active?'active':'']" @click="activeChange(i)">{{item.cat_name}}</view>
      </block>
    </scroll-view>
    <!-- 右侧导航栏区域 -->
    <scroll-view scroll-y class="rightcate" :style="{height: wh
+ 'px'}" :scroll-top="scrollTop">
      <!-- 右侧导航 二级分类 -->
      <view v-for="item in cateLevel2" :key="item.cat_id">
        <view class="c2name">/{{item.cat_name}}/</view>
        <!-- 右侧导航三级分类 -->
        <view class="c3-list">
          <view class="c3-item" v-for="(c3,index) in item.children" :key="index">
            <!-- 三级分类图片 -->
            <image :src="c3.cat_icon.replace('ugo-dev','hmugo-web')" mode="widthFix" @click="goToDetail(c3)"></image>
            <text class="c3-text">{{c3.cat_name}}</text>
          </view>
        </view>
      </view>
      
    </scroll-view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,
        cateList:[],
        //左侧导航栏默认激活项
        active:0,
        //二级分类列表
        cateLevel2:[],
        scrollTop:0,
      };
    },
    onLoad(){
      //获取屏幕的可用高度，用来渲染分类页面的滑动导航
      uni.getSystemInfo().then((res) => {
        // 在Promise的回调中获取系统信息,不知道为什么res[0]是null,需要res[1]里面才有高度，不然列表是渲染不出来的
        const sysInfo = res[1];
        this.wh = sysInfo.windowHeight-50;
        // console.log('这是屏幕高度',this.wh)
      }).catch((err) => {
        console.error('获取系统信息失败', err);
      })
      this.getCateList()
    },
    methods:{
      //获取分类页面右侧的分类数据
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status!==200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = this.cateList[0].children
        // console.log('这是cateList',this.cateList)
        // console.log('这是二级分类列表',this.cateLevel2)
      },
      activeChange(i){
        this.active=i
        //重新为二级斐裂赋值
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop=this.scrollTop===0?1:0
      },
      goToDetail(c3){
         uni.navigateTo({
           url:'/subpkg/goods_list/goods_list?cid='+c3.cat_id
          })
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
  .cateList{
    display: flex;
    .leftcate{
      width: 120px;
      background-color: #f7f7f7;
      .leftlist{
        font-size: 30rpx;
        line-height: 60px;
        text-align: center;
        &.active{
          background-color: #FFFFFF;
          position: relative;
          &::before{
            content: '';
            display: block;
            width: 3px;
            height: 50px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0%;
            transform: translateY(-50%);
          }
        }
      }
    }
   .rightcate{
     .c2name{
       font-size: 12px;
       font-weight: bold;
       text-align: center;
       padding: 15px 0;
      }
      .c3-list{
        display: flex;
        flex-wrap: wrap;
        .c3-item{
          width: 33%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          image{
            width: 60px;
            height: 60px;
          }
          text{
            font-size: 12px;
          }
        }
      }
   }
  }

</style>
