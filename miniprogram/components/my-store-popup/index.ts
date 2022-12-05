import { Store } from "../../apis/types"
import { MapMarker } from "../../pages/store/types"

Component({
  properties: {
    store: {
      type: null,
      value: <Store | null>null,
      observer(value: Store | null) {
        if (value) {
          this.getTabBar().hide()
        } else {
          this.getTabBar().show()
        }
      }
    },
    markers: {
      type: Array,
      value: <MapMarker[]>[]
    }
  },
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    toMenuPage() {
      wx.navigateTo({
        url: '/pages/store/menu'
      })
    }
  }
})
