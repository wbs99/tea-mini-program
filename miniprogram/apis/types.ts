type SwiperListType = {
  swiper: SwiperData[],
  iconNavigations: SwiperData[]
}

type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN' | null

type UserType = {
  id: string;
  mobile: number;
  gender?: Gender,
  birthDay?: string;
}