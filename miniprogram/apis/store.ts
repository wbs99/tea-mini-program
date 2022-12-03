import { http } from "../shared/http";
import { ListResult, Location, Paging, Store } from "./types";

export const fetchStoreListApi = (storeSearchRequest: Location & Paging) => http<ListResult<Store>>('GET', '/stores', storeSearchRequest)