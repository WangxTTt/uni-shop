<template>
  <!-- 如果商品名称不存在，也就是数据还没有请求回来，则不显示,解决页面闪烁问题 -->
  <view v-if="goods_info.goods_name" class="contain">
    <!-- 详情页轮播图 -->
    <swiper :indicator-dots="true" :interval="3000" circular="true" :autoplay="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="item.pics_id">
          <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品价格以及名称等信息文字 -->
    <view class="detailtext">
        <view class="goodprice">￥{{goods_info.goods_price}}</view>
        <view class="goodnamebox">
          <view class="goodname">{{goods_info.goods_name}}</view>
          <view class="starbox">
            <uni-icons type="star" size="18" color="gray"></uni-icons>
            <view class="star">收藏</view>
          </view>
        </view>
        <view class="yf">快递：免运费</view>
    </view>
    <!-- 详情下面的图片 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 详情页的底部导航区域 -->
    <view class="buttom">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick"></uni-goods-nav>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'

  export default {
    computed:{
      ...mapState('m_cart',[]),
      ...mapGetters('m_cart',['total'])
    },
    watch:{
      total(newval){
      //查找options数组的每一项,返回第一个查找到的xtext===购物车，然后将那一项赋值给findResult
       const findResult = this.options.find(x=>x.text==="购物车")
       if(findResult){
         findResult.info = newval
       }
      }
      
    },
    data() {
      return {
        goods_id:0,
        goods_info:{},
        //左侧按钮
        options: [{
        icon: 'shop',
        text: '店铺'
        }, {
        icon: 'cart',
        text: '购物车',
        info: 0
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
        text: '加入购物车',
        backgroundColor: '#ff0000',
        color: '#fff'
        },
        {
        text: '立即购买',
        backgroundColor: '#ffa200',
        color: '#fff'
        }
        ],
      };
    },
    onLoad(option){
      this.goods_id = option
      this.options[1].info=this.total
      console.log(this.total)
      this.getGoodsDetail()
    },
    methods:{
      async getGoodsDetail(){
        const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',this.goods_id)
        if(res.meta.status!==200) return uni.$showMsg()
        // 解决详情页下面的图片间隙问题(有一条空白间隙)
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g,'jpg')
        this.goods_info = res.message
        // console.log('这是goods_info',this.goods_info)
      },
      preview(i){
        // 调用previewImage方法来预览图片
        uni.previewImage({
          current:i,
          urls:this.goods_info.pics.map(x=>x.pics_big)
        })
      },
      onClick(e){
        // console.log(e)
        if(e.content.text==="购物车"){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      //获取到cartVuex里面的方法,然后将good加入购物车
      ...mapMutations('m_cart',['addGoodToCart']),
      
      buttonClick(e) {
      // 1. 判断是否点击了 加入购物车 按钮
      if (e.content.text === '加入购物车') {// 2. 组织一个商品的信息对象
        const goods = {
        goods_id: this.goods_info.goods_id, // 商品的Id
        goods_name: this.goods_info.goods_name, // 商品的名称
        goods_price: this.goods_info.goods_price, // 商品的价格
        goods_count: 1, // 商品的数量
        goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
        goods_state: true // 商品的勾选状态
        }
        // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
        this.addGoodToCart(goods)
        }
},

    },
    
  }
</script>

<style lang="scss">
  .contain{
    padding-bottom: 50px;
  }
  swiper{
      height: 750rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
.detailtext{
  .goodprice{
    font-size: 20px;
    color:#C00000;
    margin:10px 0 8px 14px;
  }
  .goodnamebox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .goodname{
      width: 80%;
      margin:8px 0 8px 10px;
      font-size: 16px;
    }
    .starbox{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 9px;
     .star{
        margin-right: 10px;
     }
    }
  }
  .yf{
    color: grey;
     margin:10px 0 9px 16px;
  }
}
.buttom{
 position: fixed;
 bottom: 0%;
 left: 0;
 width: 100%;
 }
</style>
