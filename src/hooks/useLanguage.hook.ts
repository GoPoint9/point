import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalStore } from '@/stores'
import { getIcons, getLocal, setHtmlLang } from '@/utils'
import languages from '@/languages/languages'
import i18n, { setGlobalLocale } from '@/languages'
import { useRouter } from 'vue-router'
import { changeLange } from '@/utils/selectArr/rootConfig'
const show = ref(false)

const settingState = ref(null)
const stateLanguages = ref(null)

fetchLanguagesList()

// NCZ/BDG: 根據不同環境使用 store
async function fetchLanguagesList () {
  if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
    const { useSiteStore } = await import('@/stores')
    settingState.value = useSiteStore()
  } else {
    const { SettingStore } = await import('@/stores')
    settingState.value = SettingStore()
  }
  stateLanguages.value = settingState.value.getLanguage
}

export function useLang () {
  const { locale } = useI18n()
  const globalStore = GlobalStore()
  const router = useRouter()

  // type：1个人中心 2登陆
  async function onClick (key: string, type: number) {
    setHtmlLang(key)
    // // ToDoA 仅有中文文本翻译
    locale.value = key
    globalStore.updateLanguage(key)
    await setGlobalLocale(key)
    changeLange(i18n.global.t)
    localStorage.setItem('needUpd', '1')
    if (type === 1) {
      goBack()
    } else {
      show.value = false
    }
  }

  const goBack = () => {
    router.back()
  }

  const languagesList = computed(() => {
    let index = 0
    const list: any[] = []
    if (stateLanguages.value) {
      const languagesN = stateLanguages.value?.replace('th', 'tha').split('|')
      languagesN?.forEach((j: string) => {
        languages.forEach(i => {
          if (j.toLowerCase().indexOf(i.key.toLowerCase()) !== -1) {
            list.push(i)
            index++
          } else if (i.key.toLowerCase().indexOf(j.toLowerCase()) !== -1) {
            list.push(i)
            index++
          }
        })
      })
    }
    if (!globalStore.language) globalStore.updateLanguage(getLocal())
    if (index == 0) return languages
    return list
  })

  const getLangName = (key: string) => {
    const nameObj = languagesList.value.find(item => {
      return item.key === key
    })
    return nameObj?.key.toLocaleUpperCase() || ''
  }

  return { onClick, languagesList, getIcons, locale, goBack, getLangName, show }
}
