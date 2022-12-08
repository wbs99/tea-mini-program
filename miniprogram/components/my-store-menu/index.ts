import { cartStore } from "../../store/cart"

Component({
  properties: {
    menuList: {
      type: Array,
      value: <CategoryWithProduct[]> []
    }
  },
  data: {
    selectedSectionIndex: 0,
    scrollIntoIndex: 0,
    titleOffsets: <number[]>[]
  },
    lifetimes: {
    attached(){
      this.createSelectorQuery().selectAll('.section__title').boundingClientRect(rect=>{
        // @ts-ignore
        const titleOffsets = rect.map(item=>item.top)
        this.setData({titleOffsets})
        console.log('titleOffsets')
        console.log(titleOffsets)
      }).exec()
    }
  },
  methods: {
    // 左侧 sideBar 点击
    onSectionTap(event: DataSetEvent<{index: number}>) {
      const {index} = event.currentTarget.dataset
      this.setData({
        selectedSectionIndex:index,
        scrollIntoIndex: index
      })
    },
    onScroll(event: WechatMiniprogram.ScrollViewScroll) {
      const offset = event.detail.scrollTop + event.target.offsetTop
      const index = this.data.titleOffsets.findIndex((item, index)=>item <= offset && this.data.titleOffsets[index + 1] > offset)
      index !== -1 
      && index !== this.data.selectedSectionIndex 
      && this.setData({selectedSectionIndex: index})
    },

    // 加入购物车
    addToCart(){
      const item: CartItem = {
        id: '111',
        productId: '11111',
        productName: '大王奇异果',
        productPrice: 9,
        total: 1,
        attributes: [
          {
            id: '12',
            key: 'test',
            value: '加奶盖',
            price: 2
          },
           {
            id: '12',
            key: 'test',
            value: '加奶昔',
            price: 1
          }
        ]
      }
      cartStore.addItem(item)
    },
  }
})
