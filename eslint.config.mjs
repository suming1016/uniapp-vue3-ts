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
      globals: { ...globals.browser, ...globals.node },
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
      "no-unused-vars": ["error"],
      "prettier/prettier": ["error"],
      "no-console": ["off"],
      "vue/multi-word-component-names": ["off"],
      "no-redeclare": ["off"]
    }
  }
];
