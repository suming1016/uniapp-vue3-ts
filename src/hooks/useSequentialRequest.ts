import { ref, onUnmounted } from "vue";
/**
 * 创建一个可以顺序执行请求的函数（不适用于小程序）
 * 当一个请求正在进行时，再次调用该函数会取消当前请求并发起新的请求
 *
 * @template Args - 请求参数的类型
 * @template Data - 请求成功时返回的数据类型
 * @param requestFn - 请求函数，接收一个 AbortSignal 和其他参数，并返回一个 Promise
 * @returns 一个新的请求函数，其行为与原始函数相同，但可以顺序执行
 */
function createSequentialRequest<Args extends unknown[], Data>(
  requestFn: (signal: AbortSignal, ...args: Args) => Promise<Data>
): (...args: Args) => Promise<Data> {
  // 标识当前请求是否正在执行
  const running = ref(false);

  // 保存当前请求的 AbortController，初始化为 null
  let abortController: AbortController | null = null;

  return async (...args: Args) => {
    // 如果当前请求正在执行，取消当前请求
    if (running.value) {
      abortController?.abort();
      abortController = null;
    }

    // 标记为请求正在执行
    running.value = true;

    // 获取当前的 AbortController，若没有则新建一个
    const controller = abortController ?? new AbortController();
    // 更新 AbortController 为当前controller
    abortController = controller;

    try {
      // 使用新的 AbortController 发起请求
      return await requestFn(controller.signal, ...args);
    } finally {
      // 判断当前正在进行的请求是否是最后一次请求
      if (controller === abortController) {
        // 请求结束，重置状态
        running.value = false;
      }
    }
  };
}
/**
 * 使用给定的请求函数创建一个可顺序执行的请求
 * 当有新的请求进来时，会取消当前正在执行的请求（如果有），并启动新的请求
 * 清理逻辑会在组件卸载时执行
 *
 * @template Args - 请求函数的参数类型
 * @template Data - 请求函数返回的数据类型
 * @param { (signal: AbortSignal,...args: Args) => Promise<Data> } requestFn - 一个请求函数
 * @returns { (...args: Args) => Promise<Data> } 一个新的请求函数，可以顺序执行
 */
export function useSequentialRequest<Args extends unknown[], Data>(
  requestFn: (signal: AbortSignal, ...args: Args) => Promise<Data>
): (...args: Args) => Promise<Data> {
  const abortController = ref<AbortController | null>(null);

  const sequentialRequest = createSequentialRequest(requestFn);

  onUnmounted(() => {
    abortController.value?.abort();
    abortController.value = null;
  });

  return sequentialRequest;
}
