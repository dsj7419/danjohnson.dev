import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'node_modules/**',
    'next-env.d.ts',
    '.forensics/**',
  ]),

  ...nextCoreWebVitals,

  // Type-aware strictness for every TypeScript file; the project service picks up tsconfig.json.
  ...tseslint.configs.strictTypeChecked,
  {
    name: 'project/typed-lint',
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Numbers interpolate predictably; everything else still has to be a string.
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      // `onClick={() => setOpen(false)}` is idiomatic React, not a confusing void return.
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      // React event-handler props accept async functions; the promise is intentionally dropped.
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },
  {
    name: 'project/untyped-js',
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Accessibility rules at error, overriding the warn level eslint-config-next assigns.
  // The plugin itself is registered by eslint-config-next; only the rule map is applied here.
  {
    name: 'project/a11y',
    files: ['**/*.{jsx,tsx}'],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // `role` on CaseStudyMeta and Quote is a job title prop, not an ARIA role.
      'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
    },
  },

  prettier,

  {
    name: 'project/import-hygiene',
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  {
    name: 'project/custom-rules',
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
])

export default eslintConfig
