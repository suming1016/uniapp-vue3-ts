export default {
  // 继承推荐规范配置
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-html/vue",
    "stylelint-config-recess-order"
  ],
  plugins: ["stylelint-prettier"],
  // 指定不同文件对应的解析器
  overrides: [
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html"
    },
    {
      files: ["**/*.{css,scss}"],
      customSyntax: "postcss-scss"
    }
  ],
  // 自定义规则
  rules: {
    "prettier/prettier": true,
    // 允许 global 、export 、v-deep等伪类
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export", "v-deep", "deep"]
      }
    ],
    "unit-no-unknown": [
      true,
      {
        ignoreUnits: ["rpx", "upx"]
      }
    ],
    // 处理小程序page标签不认识的问题
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["page"]
      }
    ],
    "comment-empty-line-before": "never", // never|always|always-multi-line|never-multi-line
    "custom-property-empty-line-before": "never",
    "no-empty-source": null,
    "comment-no-empty": null,
    "no-duplicate-selectors": null,
    "scss/comment-no-empty": null,
    "selector-class-pattern": null,
    "font-family-no-missing-generic-family-keyword": null
  }
};
