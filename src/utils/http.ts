import { CustomRequestOptions } from "@/interceptors/request";
// 用于存储每个请求的 map，键为请求的唯一标识（URL + 参数字符串）
const requestMap = new Map<string, UniApp.RequestTask>();
export const http = <T>(options: CustomRequestOptions) => {
  // 生成请求的唯一标识
  let requestKey: string = "";
  const method = options.method.toUpperCase();

  // 根据请求方法决定如何生成唯一标识
  switch (method) {
    case "GET":
      requestKey += `_${JSON.stringify(options.query)}`;
      break;
    case "POST":
    case "PUT":
    case "DELETE":
      requestKey += `_${JSON.stringify(options.data)}`;
      break;
    default:
      // 如果是其他方法，可能不需要额外的参数，或者需要特殊处理
      break;
  }
  // 如果当前有相同请求正在处理，先取消它
  if (requestMap.has(requestKey)) {
    requestMap.get(requestKey).abort();
    requestMap.delete(requestKey);
  }

  return new Promise<IResData<T>>((resolve, reject) => {
    const requestTask = uni.request({
      ...options,
      dataType: "json",
      // #ifndef MP-WEIXIN
      responseType: "json",
      // #endif
      // 响应成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as IResData<T>);
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          // userStore.clearUserInfo()
          // uni.navigateTo({ url: '/pages/login/login' })
          reject(res);
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast &&
            uni.showToast({
              icon: "none",
              title: (res.data as IResData<T>).msg || "请求错误"
            });
          reject(res);
        }
      },
      fail(err) {
        uni.showToast({
          icon: "none",
          title: "网络错误，换个网络试试"
        });
        reject(err);
      },
      complete(res) {
        // 清除当前请求
        requestMap.delete(requestKey);
      }
    });
    // 保存当前请求
    requestMap.set(requestKey, requestTask);
  });
};

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, unknown>) => {
  return http<T>({
    url,
    query,
    method: "GET"
  });
};

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(url: string, data?: Record<string, unknown>, query?: Record<string, unknown>) => {
  return http<T>({
    url,
    query,
    data,
    method: "POST"
  });
};

http.get = httpGet;
http.post = httpPost;
