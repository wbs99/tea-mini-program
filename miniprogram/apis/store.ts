import { http } from "../shared/http";
import { ListResult, Store } from "./types";

export const fetchStoreListApi = () => http<ListResult<Store>>('GET', '/stores')