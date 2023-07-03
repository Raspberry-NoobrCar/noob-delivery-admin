import { Package } from "@/interfaces";
import fetcher from "../fetcher";

type GetListResponse = Common.Response<{
  list: Array<Omit<Package, "status">>,
  count: number
}>

const getList = () => {
  return fetcher<GetListResponse, null>("/api/package", {
    method: "GET",
    data: undefined
  });
}

export default getList;