const tabBarList = [
  '/pages/index/index',
  '/pages/store/index',
  '/pages/order/index',
  '/pages/me/index'
]

const isSwitchPath = (target: string) => tabBarList.some(item => target.includes(item))


export const to = (type: 'path' | 'webview', target: string) => {
  if (type === 'path') {
    isSwitchPath(target) && wx.switchTab({ url: target })
    wx.navigateTo({ url: target })
  } else {
    wx.navigateTo({ url: `/pages/web-view/index?url=${target}` })
  }
}