const languages = [
  { name: 'English', key: 'en' }, // 英語 (en)
  { name: '中文', key: 'zh' }, // 中文 (zh)
  { name: 'Tiếng Việt', key: 'vi' }, // 越南語 (vi)
  { name: 'Bahasa Melayu', key: 'my' }, // 馬來語 (ms)
  { name: 'Bahasa Indonesia', key: 'id' }, // 印尼語 (id)
  { name: 'ภาษาไทย', key: 'th' }, // 泰語 (th)
  { name: 'မြန်မာဘာသာ', key: 'md' }, // 緬甸語 (my)
  { name: 'Português', key: 'bra' }, // 葡萄牙語 (pt)
  { name: 'हिंदी', key: 'hd' }, // 印地語 (hi)
  { name: 'русский', key: 'rus' }, // 俄語 (ru)
  { name: 'Filipino', key: 'ph' }, // 菲律賓語 (fil)
  { name: 'বাংলা', key: 'bd' }, // 孟加拉語 (bn)
  { name: 'اردو', key: 'pk' }, // 烏爾都語 (ur)
  { name: 'عربي', key: 'ar' }, // 阿拉伯語
] as const

// 轉成 Object { key: name, ... }
export const languagesMap = languages.reduce((acc, curr) => ((acc[curr.key] = curr.name), acc), {})

export default languages
