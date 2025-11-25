import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import globals from 'globals';

export default tseslint.config(
  // Base ESLint recommended rules
  js.configs.recommended,
  
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  
  // Prettier config (disables conflicting rules)
  prettierConfig,
  
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'build/**',
      '*.config.js',
      'babel.config.js',
      'metro.config.js',
      '.eslintrc.js',
    ],
  },
  
  // Configuration for JavaScript config files
  {
    files: ['*.config.js', 'babel.config.js', 'metro.config.js', 'jest.config.js', 'commitlint.config.js', '.prettierrc.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        module: 'writable',
        exports: 'writable',
        require: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },

  // Configuration for Jest setup and test files
  {
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/__tests__/**/*', 'jest.setup.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        jest: 'readonly',
        require: 'readonly',
        module: 'writable',
        exports: 'writable',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
      '@stylistic/comma-dangle': 'off',
    },
  },
  
  // Configuration for config files 
  {
    files: ['*.config.js', '*.config.mjs', 'jest.setup.js', 'babel.config.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  
  // Main configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        __DEV__: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        XMLHttpRequest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylistic,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // React Native rules
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off', // Allow color literals for now
      'react-native/no-raw-text': 'off',
      
      // Prettier integration
      'prettier/prettier': 'error',
      
      // General JavaScript rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // Configuration for App.tsx (development/testing) - MUST BE AFTER MAIN CONFIG
  {
    files: ['App.tsx', 'App.jsx'],
    rules: {
      'no-console': 'off', // Allow console.log in main App file for testing
    },
  },
  
  // Configuration for JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        __DEV__: 'readonly',
      },
    },
    plugins: {
      '@stylistic': stylistic,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      // JavaScript specific rules
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // React Native rules
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      
      // Prettier integration
      'prettier/prettier': 'error',
      
      // General rules
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // Override for jest.setup.js specifically - MUST BE LAST
  {
    files: ['jest.setup.js'],
    rules: {
      'no-console': 'off',
    },
  },
);