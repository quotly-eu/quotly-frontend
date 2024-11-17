import eslint from "@eslint/js";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  jsdoc.configs["flat/recommended-typescript"],
  {
    settings: {
      react: {
        version: "detect"
      },
      jsdoc: {
        contexts: [
          "ClassProperty",
          "TSInterfaceDeclaration",
          "TSTypeAliasDeclaration",  
          "TSEnumDeclaration",
        ],
      },
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      jsdoc,
      '@stylistic/ts': stylisticTs,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true
          },
        }
      ],
      "@stylistic/ts/semi": ["error", "always"],
      "jsdoc/check-tag-names": ["off"],
      "jsdoc/require-description": ["error"],
      "jsdoc/require-returns": ["error"],
      "jsdoc/require-example": ["error"],
      "jsdoc/check-types": ["error"],
      "jsdoc/valid-types": ["error"],
      "react-hooks/exhaustive-deps": ["off"]
    }
  },
);