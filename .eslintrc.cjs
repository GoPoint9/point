/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    // 'prettier',
    // 'plugin:prettier/recommended',
    // '@vue/eslint-config-prettier'
  ],

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest',
    parserOpts: {
      plugins: ['jsx'],
    },
  },
  rules: {
    // 'prettier/prettier': ['error'],
    'no-var': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
    '@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
    '@typescript-eslint/no-use-before-define': 'off', // 禁止在变量定义之前使用它们
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型

    // vue (https://eslint.vuejs.org/rules)
    'vue/no-v-html': 'off', // 禁止使用 v-html
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
    'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/custom-event-name-casing': 'off', // 为自定义事件名称强制使用特定大小写
    // 'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
    'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
    // 'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
    // 'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
    // 'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符

    'space-before-function-paren': [2, 'always'],
    // 'vue/order-in-components': ['error'], // NOTE: Enforce order of properties in components
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
    // 'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/no-multi-spaces': ['error', { ignoreProperties: false }],
    camelcase: 'off', // 強制實施駝峰命名約定
    'max-len': ['error', {
      code: 130, // 最大長度
      ignoreTemplateLiterals: true, // 忽略包含模板字符串的行
      ignoreStrings: true, //  忽略包含雙引號或單引號字串的行
      ignorePattern: 'd="([\\s\\S]*?)"', // 忽略 svg d 屬性
      ignoreRegExpLiterals: true, // 忽略包含 RegExp 文本的行
      ignoreComments: true, // 忽略所有尾隨註釋和各自行上的註釋
    }],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'space-before-blocks': [2, 'always'],
    'keyword-spacing': [2, {
      before: true,
      after: true,
    }],
    // 尾隨逗號
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    // 逗号/空格
    'comma-spacing': [2, {
      before: false,
      after: true,
    }],
    // 'comma-style': ['error', 'first'],
    // indent: ['error', 2],
    'semi-spacing': [2, {
      before: false,
      after: true,
    }],
    'space-before-blocks': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      words: true,
      nonwords: false,
    }],
    'spaced-comment': [2, 'always', {
      markers: ['/', 'global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','],
    }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside', // 單行第一個屬性不換行
      multiline: 'below', // 多行第一個屬性必須換行
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 3 },
      multiline: { max: 1 },
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'always',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
  },
}
