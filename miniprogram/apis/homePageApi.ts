import { http } from './../shared/http';

export const getSwiperListApi = () => http<SwiperListType>('GET', '/page/home')

export const fetchTokenApi = (code: string) => http<Promise<string>>('POST', '/tokens', { code })

export const fetchMeApi = () => http<Promise<UserType>>('GET', '/users/current')
