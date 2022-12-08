import { fetchStoreMenuApi } from "../../apis/homePageApi"

Page({
  data: {
    menuList: <CategoryWithProduct[]>[]
  },
   async fetchMenuList(){
    const menuList = await fetchStoreMenuApi('11') 
    this.setData({
      menuList
    })
  },
  onLoad(){
    this.fetchMenuList()
  }
})