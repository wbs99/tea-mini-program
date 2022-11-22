import { getPhoneNumber } from './../../apis/homePageApi';
import { appStore } from './../../store/app';

Page({
  data: {
    mobile: appStore.me?.mobile,
    gender: appStore.me?.gender,
    birthDay: appStore.me?.birthDay,
    loading: false
  },
  onLoad() {
    if (!appStore.me) { wx.navigateBack() }
    this.setData({
      mobile: appStore.me?.mobile,
      gender: appStore.me?.gender,
      birthDay: appStore.me?.birthDay
    })
  },
  async onMobileChange(event: { detail: { code: string } }) {
    const mobile = await getPhoneNumber(event.detail.code)
    this.setData({
      mobile
    })
  },
  onGenderChange(event: { detail: Gender }) {
    this.setData({ gender: event.detail })
  },
  onBirthDayChange(event: { detail: { value: string } }) {
    this.setData({ birthDay: event.detail.value })
  },
  async save() {
    this.setData({ loading: true })
    await appStore.updateMe({
      mobile: this.data.mobile,
      gender: this.data.gender,
      birthDay: this.data.birthDay
    })
    this.setData({ loading: false })
    wx.showToast({ title: '保存完成' })
  },
  onLogout() {
    appStore.logout()
    wx.navigateBack()
  }
})