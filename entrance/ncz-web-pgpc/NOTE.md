
# NOTE

## logic

```js
// 引入彈窗元件
const $modal = inject('$modal')

// 顯示彈窗 $modal.show(MODAL_TYPE)
// 隱藏彈窗 $modal.hide(MODAL_TYPE)

$modal.show("loginPopupModal") // 顯示 登入彈窗
$modal.show('helpModal') // 顯示 帮助中心
$modal.show('promo-details') // 打開當前活動彈窗

```

## TIPS

### watch

```js
const index = ref(index)
watch(
  index, // OK!
  // ...
)
watch(
  () => index.value, // OK!
  // ...
)

// 錯誤寫法
watch(
  () => index, // index: ComputedRefImpl
  val => {
    if (val) { // val: ComputedRefImpl。這邊會返回計算屬性物件(ComputedRefImpl)
      pageState.select = val
      // 如果再去改  pageState.select 可能會造成
      // TypeError: 'set' on proxy: trap returned falsish for property 'select'
    }
  },
)
```

### JSX

ref: https://github.com/vitejs/vite/discussions/13549#discussioncomment-7099784

- 需要加上 `lang="jsx"`

```
<script setup lang="jsx">
```

## TS

- `loginType: string` 相當於 require: true
- `loginType?: string`, 相當於 require: false

```ts

// # 1
const props = withDefaults(
  defineProps<{
    loginType?: string
  }>(),
  { loginType: 'username' }
)


interface Props {
  loginType?: string
}

// #2
const props = withDefaults(defineProps<Props>(), {
  loginType: 'username',
})

// #3
withDefaults(defineProps<Props>(), {
  loginType: 'email',
})

// #4
// https://vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure
const { loginType = 'username' } = defineProps<Props>()
```


```vue
<template>
  <FormItem
    :form-type="FORM_TYPES.CAPTCHA"
    :errors="errors"
    @action="onAction"
  />
</template>
```

## Plugins

### 競品套件們

-  [vue3-perfect-scrollbar](https://www.npmjs.com/package/vue3-perfect-scrollbar)

### vConsole

ref: [Tencent/vConsole - Method 1: Using npm (Recommended)](https://github.com/Tencent/vConsole?tab=readme-ov-file#method-1-using-npm-recommended)

```
import VConsole from 'vconsole';

const vConsole = new VConsole();
// or init with options
const vConsole = new VConsole({ theme: 'dark' });

// call `console` methods as usual
console.log('Hello world');

// remove it when you finish debugging
vConsole.destroy();
```


## Sass - Deprecation Warning

- @import 改成 `@use 'entrance/ncz-web-pgpc/animations.scss' as *;`

- map-get 改成

```
@use 'sass:map';
map.get()
```

- nth 改成

```
@use 'sass:list';
list.nth
```


```shell
--------------------------------------------------------------------
Deprecation Warning [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.

More info and automated migrator: https://sass-lang.com/d/import

  ╷
3 │ @import '@entrance/ncz-web-pgpc/components/MemberCenter/iconinf-m.scss';
  │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
    entrance/ncz-web-pgpc/components/MemberCenter/components/SecurityCenter/components/AccountInformation.vue 3:9  root stylesheet

--------------------------------------------------------------------
Deprecation Warning [global-builtin]: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use list.nth instead.

More info and automated migrator: https://sass-lang.com/d/import

   ╷
38 │       @include icon-style(nth($data, 1), nth($data, 2));
   │                           ^^^^^^^^^^^^^
   ╵
    entrance/ncz-web-pgpc/components/MemberCenter/iconinf-m.scss 38:27                                             @import
    entrance/ncz-web-pgpc/components/MemberCenter/components/SecurityCenter/components/AccountInformation.vue 3:9  root stylesheet
--------------------------------------------------------------------
Deprecation Warning [global-builtin]: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use map.get instead.

More info and automated migrator: https://sass-lang.com/d/import

   ╷
32 │     background-position: -245px nth(map-get($icon-positions, $type), 2);
   │                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ╵
    entrance/ncz-web-pgpc/components/MemberCenter/iconinfo.scss 32:37                                              active-states()
    entrance/ncz-web-pgpc/components/MemberCenter/iconinfo.scss 59:9                                               @import
    entrance/ncz-web-pgpc/components/MemberCenter/components/SecurityCenter/components/AccountInformation.vue 3:9  root stylesheet

```