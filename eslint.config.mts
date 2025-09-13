import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from "eslint/config";

export default defineConfig(
  tseslint.configs.recommendedTypeChecked,
  pluginReact.configs.flat.recommended!,
  reactHooks.configs["recommended-latest"],
  { 
    files: ["**/*.{js,mjs,cjs,ts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: { ...globals.node, ...globals.browser, ...globals.es2021, ...globals.serviceworker, ...globals.jest},
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      }, 
    },
  },
  {
    rules: {
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off"
    }
  }
);
