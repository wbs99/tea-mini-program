import { http } from './../shared/http';

export const getSwiperListApi = () => http<SwiperListType>('GET', '/page/home')
