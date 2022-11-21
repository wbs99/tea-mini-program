import { getSwiperListApi } from "../../apis/homePageApi"
import { storeBehavior } from "../../behavior/storeBehavior"
import { to } from "../../shared/navigator"

Page({
  behaviors: [storeBehavior],
  data: {
    swiperList: <SwiperData[]>[],
    iconNavigations: <SwiperData[]>[]
  },

  async onLoad() {
    const { swiper, iconNavigations } = await getSwiperListApi()
    this.setData({ swiperList: swiper, iconNavigations })
  },

  onIconNavigationTap(event: ItemParam) {
    const { type, target } = event.currentTarget.dataset.item
    to(type, target)
  },
  goToLogin() {
    wx.navigateTo({ url: '/pages/login/index' })
  },
  goToStore() {
    wx.switchTab({ url: '/pages/store/index' })
  },
  onShow() {
    this.getTabBar().init()
  },
})