import { createI18n } from 'vue-i18n'
import { getLocal, setLocal, extractFileName } from '@/utils'
import { changeLange } from '@/utils/selectArr/rootConfig'
import { setNativeLang } from './modules/native'
import { ref } from 'vue'
import en from './modules/en'
import rus from './modules/rus'
import vi from './modules/vi'
import id from './modules/id'
import hd from './modules/hd'
import tha from './modules/tha'
import md from './modules/md'
import bra from './modules/bra'
import my from './modules/my'
import bd from './modules/bdt'
import zh from './modules/zh'
import pk from './modules/pak'
import ar from './modules/ar'
// ph 沒有使用

const locale = localStorage.getItem('language') || import.meta.env.VITE_BASE_LANGUAGE
const messages: any = ref({
  en,
  rus,
  vi,
  id,
  hd,
  th: tha,
  tha,
  md,
  bra,
  my,
  bd,
  zh,
  pk,
  ar,
})

const disabledWarningConfig = {
  missingWarn: false,
  fallbackWarn: false,
}

const i18n = createI18n({
  // web 開發禁止噴警告。
  ...(import.meta.env.VITE_APP_IS_WEB_PGPC ? disabledWarningConfig : {}),
  legacy: false, // 如果要支持 compositionAPI，此项必须设置为 false
  locale, // 设置语言类型
  fallbackLocale: 'en',
  globalInjection: true, // 全局挂载
  warnHtmlMessage: false, // 停止警告报错
  messages: messages.value,
  silentTranslationWarn: true, // 禁止警告
  datetimeFormats: {
    zh: {
      // 根据需求自定义
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    rus: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    vi: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    my: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    id: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    hd: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    th: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    md: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    bra: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    bd: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    pk: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    ar: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
  },
})
changeLange(i18n.global.t)
export const setGlobalLocale = async (langStr: string) => {
  const lang = langStr || getLocal()
  setLocal(lang)
  setNativeLang(lang)
}

// NOTE: 如果是 web-pgpc 的建置，則載入 modules/web-pgpc 底下的語言包
setWebLocles()
async function setWebLocles () {
  if (!import.meta.env.VITE_APP_IS_WEB_PGPC) return

  // // i18n (使用別方式取代)
  // const languangeLocale = import.meta.glob('./modules/web-pgpc/i18n.ts', { import: 'default', eager: true })
  // console.warn('languangeLocale ', languangeLocale)

  // 額外的語言包
  const extendLocales = Object.entries(
    import.meta.glob('./modules/web-pgpc/json/*.json', { import: 'default', eager: true })
  ).reduce((acc, [currPath, currModule]) => {
    const faileName = extractFileName(currPath)
    acc[faileName] = currModule
    return acc
  }, {})

  const metaGlobWebLocales = import.meta.glob('./modules/web-pgpc/*.ts', { import: 'default' })
  for (const path in metaGlobWebLocales) {
    const localeCode = extractFileName(path)
    const localeObj = await metaGlobWebLocales[path]()

    // setLocaleMessage: 覆蓋
    // i18n.global.setLocaleMessage(localeCode, localeObj)
    // if (localeCode === 'tha') i18n.global.setLocaleMessage('th', localeObj)
    // NOTE: 改成合併，以便使用原有翻譯。
    if (localeCode === 'tha') i18n.global.mergeLocaleMessage('th', localeObj)
    else i18n.global.mergeLocaleMessage(localeCode, localeObj)

    // 如果有額外的語言包，再附加上去。
    const extendLocale = extendLocales[localeCode]
    if (extendLocale) i18n.global.mergeLocaleMessage(localeCode, extendLocale)
  }
}

export default i18n

export const $t = i18n.global.t
