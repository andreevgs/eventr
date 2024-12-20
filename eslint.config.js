import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintAutoImport from "./.eslintrc-auto-import.json" assert { type: "json" };

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{ts,vue}"],
    plugins: {
      "typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
      ...eslintAutoImport,
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  eslintConfigPrettier
);
