import { fetchToken } from "../../apis/homePageApi"

Page({
  data: {
  },

  // 个人微信号不能成功调用此接口
  getPhoneNumber(e: { detail: { code: string } }) {
    fetchToken(e.detail.code)
  }
})