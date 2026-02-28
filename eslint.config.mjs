import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Project currently contains a lot of editorial French copy in JSX.
      "react/no-unescaped-entities": "off",
      // Keep flexibility while progressively tightening typings.
      "@typescript-eslint/no-explicit-any": "warn",
      // Existing animation code uses randomized values in render.
      "react-hooks/purity": "warn",
      // Some UI components still read refs during render and need refactoring.
      "react-hooks/refs": "warn",
      // Legacy simulation components still compute derived state in effects.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
