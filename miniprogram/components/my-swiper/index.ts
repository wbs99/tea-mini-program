import { to } from "../../shared/navigator";

Component({
  properties: {
    list: {
      type: Array,
      value: <SwiperData[]>[]
    }
  },
  data: {
    current: 0
  },
  methods: {
    onChange(event: { detail: { current: number } }) {
      this.setData({ current: event.detail.current })
    },
    onItemTap(event: ItemParam) {
      const currentItem = event.currentTarget.dataset.item
      to(currentItem.type, currentItem.target)
    }
  }
})