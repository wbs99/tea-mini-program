import { http } from './../shared/http';
import { SwiperListType, UserType, UserUpdateRequest } from './types';

export const getSwiperListApi = () => http<SwiperListType>('GET', '/page/home')

export const fetchTokenApi = (code: string) => http<Promise<string>>('POST', '/tokens', { code })

export const fetchMeApi = () => http<Promise<UserType>>('GET', '/users/current')

export const getPhoneNumber = (code: string) => http<number>('GET', `/mobile/${code}`)

export const updateMeApi = (userUpdateRequest: UserUpdateRequest) => http<UserType>('PUT', '/users/current')

export const fetchStoreMenuApi = (id:string) => http<CategoryWithProduct[]>('GET', `/stores/${id}/menu`)