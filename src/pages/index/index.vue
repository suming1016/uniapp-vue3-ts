<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    // navigationStyle: "custom",
    navigationBarTitleText: "%tabbar.home%"
  }
}
</route>
<template>
  <view :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="text-center mt-8">
      当前平台是：
      <text class="text-green-500">{{ PLATFORM.platform }}</text>
    </view>
    <wd-button @click="setUserInfo">测试pinia持久化</wd-button>
    <wd-button type="success" @click="safeFetchData">测试取消请求</wd-button>
    <wd-button type="success" @click="testDown">测试</wd-button>
  </view>
  <wd-tabs v-model="tab">
    <block v-for="item in 4" :key="item">
      <wd-tab :title="`标签${item}`">
        <view class="content">内容{{ item }}</view>
      </wd-tab>
    </block>
  </wd-tabs>
</template>

<script lang="ts" setup>
import PLATFORM from "@/utils/platform";
import { useUserStore } from "@/store";
// import { useSequentialRequest } from "@/hooks/useSequentialRequest";
import { http } from "@/utils/http";
defineOptions({
  name: "Home"
});
const userStore = useUserStore();
const setUserInfo = () => {
  userStore.setUserInfo({ nickname: "菲鸽", avatar: "", token: "abcdef" });
};
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();
const tab = ref<number>(0);
// 测试 uni API 自动引入
onLoad(() => {});
async function fetchData(signal: AbortSignal) {
  const data = await fetch("https://pcapi-xiaotuxian-front-devtest.itheima.net/home/banner", { signal });
  console.log(await data.json());
}

// const safeFetchData = useSequentialRequest(fetchData);
const safeFetchData = () => {
  http.get("https://pcapi-xiaotuxian-front-devtest.itheima.net/home/banner").then(res => {
    console.log(res);
  });
};
const testDown = () => {
  http({
    url: "http://172.27.240.129:8093/api/a/tDyWages/template",
    method: "POST",
    responseType: "arraybuffer"
  }).then(res => {
    console.log(res);
  });
  // fetch(`http://172.27.240.129:8093/api/a/tDyWages/template`, { method: "post", headers: { "content-type": "application/json" } })
  //   .then(response => {
  //     console.log(response);
  //     return response.blob();
  //   })
  //   .then(res => {
  //     console.log(res);
  //   });
};
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
