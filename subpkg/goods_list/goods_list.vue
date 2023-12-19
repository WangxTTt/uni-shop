<template>
  <view class="goodslist">
    <navigator v-for="(item,i) in goodsList" :key="i" class="goodsitem" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
      <!-- <view class="goodsimgbox">
         <image :src="item.goods_small_logo" class="goodsimg"></image>
      </view>
      <view class="goodstext">
        <view class="goodsname">{{item.goods_name}}</view>
        <view class="goodsprice">￥{{item.goods_price}}</view>
      </view> -->
      <goods-item :goods="item"></goods-item>
    </navigator>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          // 查找关键字
          query:'',
          cid:'',
          pagenum:1,
          pagesizea:10
        },
        total:0,
        //列表页数据
        goodsList:[],
        //节流阀
        isLoading:false,
      };
    },
    onLoad(options){
      console.log(options)
      this.queryObj.query = options.query||''
      this.queryObj.cid = options.cid||''
      this.getGoodsList()
    },
    methods:{
      //获取列表页数据
      async getGoodsList(){
        this.isLoading=true
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
         this.isLoading=false
         //只要数据请求完毕，就立即按需调用cd回调函数
         // cb&cb()
        if(res.meta.status!==200) return uni.$showMsg()
        console.log('这是列表页数据',res.message)
        console.log('这是goodsList数据',this.goodsList)
         this.goodsList = [...this.goodsList,...res.message.goods]
         this.total = res.message.total
        
      }
    },
    onReachBottom(){
      //判断是否还有数据可加载
       if(this.queryObj.pagenum*this.queryObj.pagesizea>=this.total) return uni.$showMsg("数据已加载完毕")
       //如果请求还没完成不可以再次发送请求
      if(this.isLoading) return
      //让页码自增加1
      this.queryObj.pagenum+=1
      this.getGoodsList()
    },
    onPullDownRefresh(){
      this.queryObj.pagenum=1
      this.total=0
      this.isLoading=false
      this.goodsList=[]
      //重新发起请求
      this.getGoodsList().then(()=>uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
.goodslist{
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
}
</style>
