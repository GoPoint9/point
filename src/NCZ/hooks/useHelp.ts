import { helpListMap } from '@entrance/ncz-web-pgpc/config/helpListMap.ts'

export function useHelp () {
  const { locale } = useI18n()

  const helpList = ref([])
  watch(
    () => locale.value,
    currentLanguage => {
      console.log(' currentLanguage ', currentLanguage)
      helpList.value = helpListMap[currentLanguage.toUpperCase()]
    },
    { immediate: true }
  )

  return {
    helpList,
  }
}
