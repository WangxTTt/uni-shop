export default{
  namespaced:true,
 
  state:()=>({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count,
    //goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync('cart')||'[]'),
    
  }),
  
  mutations:{
   addGoodToCart(state, goods) {
   // 根据提交的商品的Id，查询购物车中是否存在这件商品
   // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
   const findResult = state.cart.find((x) => x.goods_id ===goods.goods_id)
   if (!findResult) {
   // 如果购物车中没有这件商品，则直接 push
   state.cart.push(goods)
   } else {
   // 如果购物车中有这件商品，则只更新数量即可
   findResult.goods_count++
   // console.log('这是goods',state.cart)
   }
   // / 是用来分隔模块和具体的 mutation 或 action 的。这是因为在一个 Vuex store 中，可能包含多个模块（module）。使用 / 可以表示模块的层级关系。
   this.commit('m_cart/saveToStorage')
   },
   saveToStorage(state){
     //将state.cart转化为JSON字符串然后本地车存储并命名为cart
     uni.setStorageSync('cart',JSON.stringify((state.cart)))
   },
   updateGoodsState(state,goods_id){
     const findResult = state.cart.find((x)=>x.goods_id===goods_id)
     if(findResult){
       findResult.goods_state = !findResult.goods_state
       this.commit('m_cart/saveToStorage')
     }
     else{
      // console.log("updateGoodsState未找到")
      return
     }
   },
   updateGoodsCount(state,goods){
     const findResult = state.cart.find((x)=>x.goods_id===goods.goods_id)
     if(findResult){
       findResult.goods_count = goods.count
       this.commit('m_cart/saveToStorage')
     }
     else{
       // console.log('updateGoodsCount未找到')
       return
     }
   },
   //从购物车删除商品
   deleteGood(state,goods_id){
     const index = state.cart.findIndex((x)=>x.goods_id===goods_id)
      if(index!==-1){
        //splice会改变原数组
         state.cart.splice(index, 1);
         this.commit('m_cart/saveToStorage')
      }else{
        return 
      }
   },
   //更新购物车中所有商品的勾选状态
   updateaAllGoodsState(state,newState){
     state.cart.forEach(x=>x.goods_state=newState)
     this.commit('m_cart/saveToStorage')
   }
  },
  
  getters:{
    total(state){
      let c = 0
      state.cart.forEach(goods=>c+=goods.goods_count)
      return c
    },
    checkedCount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
    },
    goodsCountSum(state){
     return state.cart.filter(x=>x.goods_state).reduce((sum,item)=>sum+=item.goods_price*item.goods_count,0).toFixed(2)
    }
  }
}