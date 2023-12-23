export default {
  namespaced:true,
  
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address')||'{}'),
  }),
  mutations:{
    updateAddress(state,address){
      state.address=address
      // console.log('成功')
      this.commit('m_user/saveToStorage')
    },
    saveToStorage(state){
      //将state.cart转化为JSON字符串然后本地车存储并命名为cart
      uni.setStorageSync('address',JSON.stringify((state.address)))
    },
  },
  getters:{
    //拼接收货地址
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
}