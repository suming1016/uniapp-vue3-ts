<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useI18n } from "vue-i18n";
import { tabBar } from "@/pages.json";

const { t } = useI18n();
onLaunch(() => {
  console.log("App Launch");
  // #ifdef MP-WEIXIN
  const setTabbarText = () => {
    const tabbarTexts = tabBar.list.map(item => item.text.replace(/(^%|%$)/g, ""));
    console.log(tabBar, tabbarTexts);
    tabbarTexts.forEach((transKey: string, index: number) => {
      console.log(transKey, index, t(transKey));
      uni.setTabBarItem({
        index,
        text: t(transKey)
      });
    });
  };
  // fix 微信小程序需要手动调用 api 设置一次国际化tabbar text。
  setTabbarText();
  uni.onLocaleChange(setTabbarText);
  // #endif
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
