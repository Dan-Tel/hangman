import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: { globals: globals.browser },
    ignores: ["node_modules"],
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": ["warn"],
    },
  },

  pluginJs.configs.recommended,
];
