type httpMethod = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined
type RequestData = string | WechatMiniprogram.IAnyObject | ArrayBuffer
type ErrorResponse = {
  code: number;
  message: string;
}


const BASE_URL = 'https://mock.apifox.cn/m1/1646135-0-default'

const onError = (error: ErrorResponse) => {
  if (error.code === 401) {
    //appStore.logout()
  }
  wx.showToast({
    title: error.message,
    icon: 'error'
  })
}

export const http = <T>(method: httpMethod, url: string, data?: RequestData): Promise<T> => {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url: `${BASE_URL}${url}`,
      data,
      // header: {
      //   'Authorization': `BEARER ${appStore.token}`
      // },
      success: (response) => {
        if (response.statusCode !== 200) {
          onError(response.data as ErrorResponse)
          reject(response.data)
        }
        resolve(response.data as T)
      },
      fail: (error) => {
        reject({ code: 500, message: error.errMsg })
      }
    })
  })
}