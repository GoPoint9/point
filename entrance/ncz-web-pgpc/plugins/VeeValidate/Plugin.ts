// 引入 VeeValidate 元件跟功能
import { Field, Form, ErrorMessage, configure } from 'vee-validate'

// Default values
configure({
  validateOnInput: true, // input event 觸發驗證
})

// 引入 VeeValidate 的驗證規則
// import AllRules from '@vee-validate/rules'
// // 引入 VeeValidate 的 i18n 功能
// import { localize, setLocale } from '@vee-validate/i18n'
// // 引入 VeeValidate 的繁體中文語系檔
// import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// import Modal from './components/Modal.vue'
// import Dialog from './components/Dialog.vue'
// import PluginCore from './PluginCore'

const Plugin = {
  install (app) {
    // // 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
    // Object.keys(AllRules).forEach(rule => {
    //   defineRule(rule, AllRules[rule])
    // })

    // // 將當前 VeeValidate 的語系設定為繁體中文
    // configure({
    //   generateMessage: localize({ zh_TW: zhTW }),
    //   validateOnInput: true
    // })
    // setLocale('zh_TW')

    // 掛載 Global 的 VeeValidate 元件
    app.component('VField', Field)
    app.component('VForm', Form)
    app.component('VErrorMessage', ErrorMessage)
  },
}

export default Plugin
