import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default tseslint.config(
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      import: eslintPluginImport,
      'simple-import-sort': eslintPluginSimpleImportSort,
      prettier: prettierPlugin,
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Prettier
      'prettier/prettier': 'error',

      // Import Sorting
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // React and third-party libraries
            ['^react', '^@?\\w'],
            // Relative imports
            ['^\\.'],
            // Styles
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'import/order': 'off',
    },
  },
  {
    ignores: [
      'dist',
      'build',
      'node_modules',
      '.vite',
      '.react-router',
      'eslint.config.js',
      'tsdoc',
      'commitlint.config.js',
    ],
  }
);
