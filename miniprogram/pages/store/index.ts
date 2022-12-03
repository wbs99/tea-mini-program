import { Location, Paging, Store } from '../../apis/types';
import { StoreStatus } from '../../enums/StoreStatus';
import { fetchStoreListApi } from './../../apis/store';
import { MapMarker } from './types';
const computedBehavior = require('miniprogram-computed').behavior


Page({
  behaviors: [computedBehavior],
  data: {
    paging: <Paging>{
      page: 1,
      size: 10,
      total: 0
    },
    storeList: <Store[]>[],
    storeStatusMap: StoreStatus,
    currentLocation: <Location | null>null,
    markers: <MapMarker[]>[]
  },
  computed: {
    markers(data: { storeList: Store[] }): MapMarker[] {
      return data.storeList.map((item, index) => {
        return {
          id: index + 1,
          title: item.name,
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          iconPath: '../../assets/images/logo.JPG',
          width: '55rpx',
          height: '55rpx'
        }
      })
    }
  },

  async fetchStoreList() {
    const { paging, data } = await fetchStoreListApi()
    this.setData({
      paging,
      storeList: data
    })
  },

  onLoad() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const { latitude, longitude } = res
        this.setData({
          currentLocation: {
            latitude, longitude
          }
        })
      }
    })
    this.fetchStoreList()
  },
  onShow() {
    this.getTabBar().init()
  },
})