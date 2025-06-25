// NCZ 專用

export const BDF_TO_NCZ_LOCALE_MAP = {
  'zh-CN': 'zh-CN',
  zh: 'zh-CN',
  en: 'en-US',
  hd: 'hi-IN', // 應該是吧
  vi: 'vi-VN',
  th: 'th-TH',
}

export const NCZ_TO_BDF_LOCALE_MAP = {
  // 'zh-CN': 'zh-CN',
  'zh-CN': 'zh',
  'en-US': 'en',
  'hi-IN': 'hd', // 應該是吧
  'vi-VN': 'vi',
  'th-TH': 'th',
}

// 將 NCZ 格式轉成 BDG 格式。 e.g. zh-CN => zh
export const getLanguageBDG = localeNCZ => {
  const localeBDG = NCZ_TO_BDF_LOCALE_MAP[localeNCZ]
  if (!localeBDG) console.error(' Check it, localeBDG is  ', localeBDG)
  return localeBDG
}

// 將 NCZ 格式轉成 BDG 格式。 e.g. ['hi-IN', 'en-US', 'zh-CN'] => 'hd|en|zh'
export const getLanguagesBDG = langSet => {
  const result = langSet.map(lang => NCZ_TO_BDF_LOCALE_MAP[lang]).join('|')
  return result
}

export const getLocalNCZ = () => {
  const localCode = localStorage.getItem('language') || import.meta.env.VITE_BASE_LANGUAGE || 'en'
  const result = BDF_TO_NCZ_LOCALE_MAP[localCode]
  if (result === undefined) return BDF_TO_NCZ_LOCALE_MAP[import.meta.env.VITE_BASE_LANGUAGE]
  return result
}

export const utilsNCZ = {
  getLanguageBDG,
  getLanguagesBDG,
  getLocalNCZ,
}
