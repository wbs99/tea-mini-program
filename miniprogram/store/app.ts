import { action, observable } from "mobx-miniprogram";
import { fetchToken } from "../apis/homePageApi";

const TOKEN_STORAGE_KEY = 'token'

export const appStore = observable({
  token: <string>wx.getStorageSync(TOKEN_STORAGE_KEY),

  // 这里只能使用 function 形式，不能使用箭头函数
  fetchToken: action(async function (e: { detail: { code: string } }) {
    console.log('你好啊')
    const token = await fetchToken(e.detail.code)
    console.log('token')
    console.log(token)
    appStore.setToken(token)
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    })
    getCurrentPages().pop() ? wx.navigateBack() : wx.switchTab({
      url: '/pages/index/index'
    })
  }),
  setToken: action(function (token: string) {
    appStore.token = token
    wx.setStorageSync(TOKEN_STORAGE_KEY, token)
  })
})