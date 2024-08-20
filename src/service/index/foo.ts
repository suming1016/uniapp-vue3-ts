// import { IFooItem } from "./foo";
import { getUrlObj } from "./../../utils/index";
import { http } from "@/utils/http";
export interface IFooItem {
  id: string;
  name: string;
}
type getUrlObj = Record<string, IFooItem[keyof IFooItem]>;
/** GET 请求 */
export const getFooAPI = (name: string) => {
  return http.get<IFooItem>("/foo", { name });
};

/** POST 请求 */
export const postFooAPI = (name: string) => {
  return http.post<IFooItem>("/foo", { name }, { name });
};
