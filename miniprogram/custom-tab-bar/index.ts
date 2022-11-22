import { storeBehavior } from "../behavior/storeBehavior";
import { appStore } from "../store/index";

Component({
  behaviors: [storeBehavior],
  data: {
    active: 0,
    list: [
      {
        text: '首页',
        image: '../assets/images/tabbar/home.png',
        selectedImage: '../assets/images/tabbar/home-selected.png',
        path: '/pages/index/index'
      },
      {
        text: '点餐',
        image: '../assets/images/tabbar/store.png',
        selectedImage: '../assets/images/tabbar/store-selected.png',
        path: '/pages/store/index'
      },
      {
        text: '订单',
        image: '../assets/images/tabbar/order.png',
        selectedImage: '../assets/images/tabbar/order-selected.png',
        path: '/pages/order/index'
      },
      {
        text: '我的',
        image: '../assets/images/tabbar/me.png',
        selectedImage: '../assets/images/tabbar/me-selected.png',
        path: '/pages/me/index'
      }
    ]
  },
  methods: {
    onChange(event: { detail: number }) {
      appStore.switchTabBar(event.detail)
      wx.switchTab({ url: this.data.list[event.detail].path });
    },
    init() {
      const currentPage = getCurrentPages().pop()
      if (!currentPage) { throw new Error('内部错误') }
      this.setData(
        { active: this.data.list.findIndex(item => item.path === `/${currentPage.route}`) }
      )
    }
  }
})