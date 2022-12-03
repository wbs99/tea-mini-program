import { Location, Paging, Store } from '../../apis/types';
import { StoreStatus } from '../../enums/StoreStatus';
import { fetchStoreListApi } from './../../apis/store';
import { MapMarker } from './types';
const computedBehavior = require('miniprogram-computed').behavior
import QQMapWX from "@jonny1994/qqmap-wx-jssdk";


Page({
  behaviors: [computedBehavior],
  mapSdk: <QQMapWX | null>null,
  data: {
    paging: <Paging>{
      page: 1,
      size: 10,
      total: 0
    },
    storeList: <Store[]>[],
    storeStatusMap: StoreStatus,
    currentLocation: <Location>{
      latitude: 0,
      longitude: 0
    },
    markers: <MapMarker[]>[],
    distance: 0
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
  initMapSdk() {
    this.mapSdk = new QQMapWX({
      key: "TKGBZ-FEQL4-3PKUL-XER3K-774R2-3FBZ6",
    });
  },
  // 根据经纬度计算起点终点距离
  calculateDistanceAndSetStoreList(storeList: Store[]) {
    const locationList: Location[] = storeList.map(item => item.location)
    this.mapSdk?.calculateDistance({
      from: this.data.currentLocation,
      to: locationList,
      success: (res) => {
        storeList.forEach((item, index) => {
          // @ts-ignore
          storeList[index]['distance'] = (res.result.elements[index].distance / 1000).toFixed(2)
        })
        this.setData({
          storeList
        })
      }
    })
  },
  async fetchStoreList() {
    const { paging, data } = await fetchStoreListApi()
    data.length && this.calculateDistanceAndSetStoreList(data)
    this.setData({
      paging,
      storeList: data
    })
  },
  async fetchCurrentLocation() {
    const { latitude, longitude } = await wx.getLocation({ type: 'wgs84' })
    this.setData({
      currentLocation: {
        latitude, longitude
      }
    })
  },
  async onLoad() {
    this.initMapSdk()
    await this.fetchCurrentLocation()
    this.fetchStoreList()
  },
  onShow() {
    this.getTabBar().init()
  },
})