import eslint from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";
import reactplugin from "eslint-plugin-react";

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
    ...reactplugin.configs.flat.recommended,
    plugins: {
      jsdoc,
    },
    rules: {
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
      "jsdoc/check-tag-names": ["off"],
      "jsdoc/require-description": ["error"],
      "jsdoc/require-returns": ["error"],
      "jsdoc/require-example": ["error"],
      "jsdoc/check-types": ["error"],
      "jsdoc/valid-types": ["error"],
    }
  },
);