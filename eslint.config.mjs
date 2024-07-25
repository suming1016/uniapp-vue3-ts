import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginPrettierRecommendedConfigs from "eslint-plugin-prettier/recommended";
import parserVue from "vue-eslint-parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    ignores: ["**/*.config.js", "!**/eslint.config.js", "node_modules/*", "dist/*", "build/**/*"]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        $t: true,
        uni: true,
        UniApp: true,
        wx: true,
        WechatMiniprogram: true,
        getCurrentPages: true,
        UniHelper: true,
        Page: true,
        App: true,
        NodeJS: true
      },
      parser: parserVue
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  eslintConfigPrettier,
  pluginPrettierRecommendedConfigs,
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  {
    rules: {
      "no-undef": ["off"],
      "no-console": ["off"],
      "no-redeclare": ["off"],
      "prettier/prettier": [
        "warn",
        {
          singleQuote: false,
          semi: true,
          printWidth: 160,
          trailingComma: "none",
          endOfLine: "auto"
        }
      ],
      "vue/multi-word-component-names": ["off"],
      "vue/no-setup-props-destructure": ["off"],
      "vue/no-deprecated-html-element-is": ["off"],
      "@typescript-eslint/no-unused-vars": ["off"]
    }
  }
];
