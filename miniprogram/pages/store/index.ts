import { Paging, Store } from '../../apis/types';
import { StoreStatus } from '../../enums/StoreStatus';
import { fetchStoreListApi } from './../../apis/store';
Page({

  data: {
    paging: <Paging>{
      page: 1,
      size: 10,
      total: 0
    },
    storeList: <Store[]>[],
    storeStatusMap: StoreStatus,
  },

  async fetchStoreList() {
    const { paging, data } = await fetchStoreListApi()
    this.setData({
      paging,
      storeList: data
    })
  },

  onLoad() {
    this.fetchStoreList()
  },
  onShow() {
    this.getTabBar().init()
  },
})