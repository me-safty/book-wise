import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import unusedImports from "eslint-plugin-unused-imports"
import reactCompiler from "eslint-plugin-react-compiler"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:tailwindcss/recommended",
    "plugin:react-hooks/recommended-legacy",
    "prettier"
  ),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  reactCompiler.configs.recommended,
  {
    rules: {
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]
