Page({

  data: {
    paddingTop: 0,
    menuList: [
      {
        title: '兑换码',
        icon: 'qr'
      },
      {
        title: '隐私协议',
        icon: 'shield-o'
      }, {
        title: '用户服务协议',
        icon: 'records'
      },
      {
        title: '经营信息公示',
        icon: 'notes-o'
      }
    ]
  },

  onLoad() {
    // 设置页面顶部的安全距离
    const { bottom } = wx.getMenuButtonBoundingClientRect()
    this.setData({
      paddingTop: bottom
    })
  },
  onShow() {
    this.getTabBar().init()
  },
})