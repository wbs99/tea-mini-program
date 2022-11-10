type SwiperData = {
  image: string;
  type: 'webview' | 'path',
  target: string;
}

type ItemParam = { currentTarget: { dataset: { item: SwiperData } } }