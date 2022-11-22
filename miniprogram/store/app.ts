import { fetchMeApi, updateMeApi } from './../apis/homePageApi';
import { action, observable } from "mobx-miniprogram";
import { fetchTokenApi } from "../apis/homePageApi";

const TOKEN_STORAGE_KEY = 'token'
const ME_STORAGE_KEY = 'me'

export const appStore = observable({
  token: <string>wx.getStorageSync(TOKEN_STORAGE_KEY),
  me: <UserType | null>wx.getStorageSync(ME_STORAGE_KEY) || null,
  activeTabBar: 0,


  // 这里只能使用 function 形式，不能使用箭头函数
  fetchToken: action(async function (e: { detail: { code: string } }) {
    const token = await fetchTokenApi(e.detail.code)
    appStore.setToken(token)
    appStore.fetchMe()
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
  }),

  fetchMe: action(async function () {
    const me = await fetchMeApi()
    appStore.setMe(me)
  }),
  setMe: action(function (me: UserType) {
    appStore.me = me
    wx.setStorageSync(ME_STORAGE_KEY, me)
  }),

  logout: action(function () {
    appStore.token = ''
    appStore.me = null
    wx.setStorageSync(TOKEN_STORAGE_KEY, '')
    wx.setStorageSync(ME_STORAGE_KEY, null)
  }),

  switchTabBar: action(function (value: number) {
    appStore.activeTabBar = value
  }),

  updateMe: action(async function (userUpdateRequest: UserUpdateRequest) {
    const updatedUser = await updateMeApi(userUpdateRequest)
    appStore.setMe(updatedUser)
  })
})