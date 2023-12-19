<template>
  <view>
    <!-- 搜索框 -->
   <view class="search">
      <view class="inp">
          <uni-search-bar @input="input" cancelButton="none"></uni-search-bar>
      </view>
    </view>
    <!-- 搜索结果 -->
    <view class="searchlist" v-if="searchList.length!==0">
      <view v-for="(item,index) in searchList" :key="index" class="searchitem" @click="gotoDetail(item)">
        <view class="searchnamebox">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史记录 -->
    <view class="searchhistory" v-else="searchList.length===0">
        <view class="searchtextbox">
          <view class='searchtext'>搜索记录</view>
          <uni-icons type="trash" size="20" @click="deleteSearch"></uni-icons>
        </view>
        <!-- 搜索记录的展示 -->
        <view class="searchconentbox">
          <uni-tag :text="item" v-for="item in history" :key="index" @click="goToDetail(item)"></uni-tag>
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //防抖的标识点
        timer:null,
        //输入框的数据
        kw:'',
        searchList:[],
        //搜索历史的记录
        searchHistory:[],
      };
    },
    onLoad(){
     this.searchHistory = JSON.parse(uni.getStorageSync('kw')||'[]') 
    },
    methods:{
    input(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.kw = e;
        console.log(e);
      }, 500);
      if(e===''){
        return this.searchList=''
      }
      this.getSearch()
    },
    //根据搜索关键字，获取搜索结果
    async getSearch(){
      const {data:res} = await uni.$http.get('/api/public/v1/goods/search',{query:this.kw})
      if(res.meta.status!==200) return uni.$showMes()
      this.searchList = res.message.goods
      // console.log(this.searchList)
      this.saveSearchHistory()
    },
    gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
    },
    //搜索后追加历史记录
    saveSearchHistory(){
      //this.searchHistory.push(this.kw)
      const set = new Set(this.searchHistory)
      //调用set方法移除对应的元素，也就是先删除重复的元素
      set.delete(this.kw)
      //调用add方法添加元素，这样可以将原先删除的重复的元素再次添加，为的就是能够排在第一位
      set.add(this.kw)
      //转化为数组
      this.searchHistory = Array.from(set)
      //搜索记录持久化存储
      uni.setStorageSync('kw',JSON.stringify(this.searchHistory))
    },
    //清空历史记录
    deleteSearch(){
      this.searchHistory=[]
      uni.removeStorageSync('kw')
    },
    //点击搜索记录跳转到商品列表
    goToDetail(item){
      uni.navigateTo({
        url:'/subpkg/goods_list/goods_list?query='+item
      })
    },
    
   
  },
  //追加后的历史记录要进行翻转将最新的记录排在第一位
  computed:{
    history(){
      return [...this.searchHistory].reverse()
    }
  }
  }
</script>

<style lang="scss">
.search{
  width: 100%;
  height: 50px;
  background-color: #C00000;
  display: flex;
  align-items: center;
  .inp{
    width: 80%;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 18px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.searchlist{
  padding: 0 5px ;
  .searchitem{
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .searchnamebox{
      //文本不允许换行，=
      white-space: nowrap;
      //溢出文本隐藏
      overflow: hidden;
      //文本溢出后用...代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.searchhistory{
  .searchtextbox{
    display: flex;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
    .searchtext{
    }
  }
  .searchconentbox{
    .uni-tag{
      margin-right: 10px;
      margin-top: 20px;
      background-color: #ddd;
      }  
  }
}


</style>
