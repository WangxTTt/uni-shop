 import {mapGetters} from 'vuex'
export default {
   
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    watch:{
      total(){
        this.getCartCount()
      }
    },
    onShow(){
      this.getCartCount()
    },
    methods:{
      getCartCount(){
        uni.setTabBarBadge({
          index:2,
          text:this.total+''//text的值必须是字符串，不能是数字
        })
      }
    }
    
}