import { getSwiperListApi } from "../../apis/homePageApi"

Page({
  data: {
    swiperList: <SwiperData[]>[],
  },
  async onLoad() {
    const { swiper } = await getSwiperListApi()
    this.setData({ swiperList: swiper })
  },
  onShow() {
    this.getTabBar().init()
  },
})