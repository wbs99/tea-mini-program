import { Location, Paging, Store } from '../../apis/types';
import { StoreStatus } from '../../enums/StoreStatus';
import { fetchStoreListApi } from './../../apis/store';
import { MapMarker } from './types';
const computedBehavior = require('miniprogram-computed').behavior
import QQMapWX from "@jonny1994/qqmap-wx-jssdk";
const mapKey = "TKGBZ-FEQL4-3PKUL-XER3K-774R2-3FBZ6"
const chooseLocation = requirePlugin('chooseLocation');

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
    distance: 0,
    mapVisible: true,
    selectedStore: <Store | null>null
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
      key: mapKey,
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
  goToChooseLocation() {
    const referer = '王本爽';
    const location = JSON.stringify(this.data.currentLocation);
    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${mapKey}&referer=${referer}&location=${location}`
    });
  },
  // 获取店铺数据
  async fetchStoreList() {
    const { paging, data } = await fetchStoreListApi({
      ...this.data.paging,
      ...this.data.currentLocation
    })
    data.length && this.calculateDistanceAndSetStoreList(data)
    this.setData({
      paging,
      storeList: data
    })
  },
  // 获取当前经纬度
  async fetchCurrentLocation() {
    const { latitude, longitude } = await wx.getLocation({ type: 'wgs84' })
    this.setData({
      currentLocation: {
        latitude, longitude
      }
    })
  },
  // 显示或隐藏地图
  toggleMap() {
    this.setData({
      mapVisible: !this.data.mapVisible
    })
  },
  // 点击门店列表页面的地址 icon 调用微信内置导航
  goToLocation(event: DataSetEvent<{ location: Location }>) {
    const { latitude, longitude } = event.currentTarget.dataset.location
    wx.openLocation({
      latitude,
      longitude,
    })
  },
  // 点击地图的右下角小图标回归到当前位置
  goToCurrentLocation() {
    wx.createSelectorQuery().select('#store-map').context(res => {
      res.context.moveToLocation()
    }).exec()
  },
  onCallPhone(event: DataSetEvent<{ phone: string }>) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone
    })
  },
  async onLoad() {
    this.initMapSdk()
    await this.fetchCurrentLocation()
    this.fetchStoreList()
  },
  onShow() {
    const location = chooseLocation.getLocation();
    if (location) {
      this.setData({
        currentLocation: { latitude: location.latitude, longitude: location.longitude }
      })
      this.fetchStoreList()
    }
    this.getTabBar().init()
  },
  onUnload() {
    chooseLocation.setLocation(null);
  },
  // 店铺点击
  selectStore(event: DataSetEvent<{ store: Store }>) {
    this.setData({
      selectedStore: event.currentTarget.dataset.store
    })
  },
  // 关闭点击店铺之后的弹窗
  onStorePopupClose() {
    this.setData({
      selectedStore: null
    })
  }
})