import { http } from './../shared/http';

export const getSwiperListApi = () => http<SwiperListType>('GET', '/page/home')

export const fetchToken = (code: string) => http('POST', '/tokens', { code })
