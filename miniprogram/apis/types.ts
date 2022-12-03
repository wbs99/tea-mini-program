import { StoreStatus } from "../enums/StoreStatus";

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

type UserUpdateRequest = {
  mobile?: number;
  gender?: Gender,
  birthDay?: string;
}

export interface Paging {
  page: number;
  size: number;
  total: number;
}

export type ListResult<T> = {
  paging: Paging,
  data: Array<T>
}

export type Location = {
  latitude: number;
  longitude: number;
}

export type Store = {
  id: string;
  name: string;
  address: string;
  openingTime: {
    start: string;
    end: string;
  };
  status: keyof typeof StoreStatus;
  location: Location;
  phone: string;
  distance?: number;
}