<!-- NationFlag.vue -->
<template>
  <img class="flag-icon" :src="flagIcon" :alt="lang">
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// key 是我們有的圖片， value 是 pgpc 競品的
const transformName = {
  // bd: 'BD',
  // id: 'ID',
  // my: 'MY',
  // pk: 'PK',
  // th: 'TH',
  ar: 'CC',
  bra: 'BR',
  en: 'US',
  hd: 'IN',
  japan: 'JP',
  korea: 'KR',
  md: 'MM',
  ph: 'TLG',
  rus: 'RU',
  vi: 'VN',
  zh: 'CN',

  // NCZ to BDG
  INR: 'IN',
}

// export default {
//   name: 'NationFlag',
const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    validator: value => ['1', '2'].includes(value),
  },
})
const getImageUrl = imageName => {
  // NOTE: result  => http://localhost:5173/undefined  WTF?
  // const result = new URL(`@/assets/web_pgpc/languages/${imageName}.svg`, import.meta.url).href
  const svgFolderPath = new URL('@/assets/web_pgpc/languages/', import.meta.url).href
  return svgFolderPath + imageName
}

const flagIcon = computed(() => {
  const flagType = props.type === '1' ? 'RECT' : 'CIRCLE'
  const fileName = transformName[props.lang]
  const imgName = fileName || props.lang.toUpperCase()

  return getImageUrl(`${flagType}/${imgName}.svg`)
})

// 競品的
//
// const languageMap = {
//   CN: { code: 'CN' },
//   EN: { code: 'US' },
//   JA: { code: 'JP' },
//   TH: { code: 'TH' },
//   VI: { code: 'VN' },
//   MY: { code: 'MM' },
//   ES: { code: 'MX' },
//   HI: { code: 'IN' },
//   ID: { code: 'ID' },
//   KM: { code: 'KH' },
//   KO: { code: 'KR' },
//   KR: { code: 'KR' },
//   MS: { code: 'MY' },
//   PT: { code: 'BR' },
//   TA: { code: 'IN' },
//   TW: { code: 'HK' },
//   UR: { code: 'PK' },
//   TY: { code: 'TLG' },
//   PH: { code: 'TLG' },
//   TR: { code: 'TR' },
//   AR: { code: 'CC' },
//   'PT-BR': { code: 'BR' },
//   BN: { code: 'BD' },
//   UZ: { code: 'UZ' },
//   RU: { code: 'RU' },
//   FA: { code: 'IR' },
//   LO: { code: 'LO' },
//   NE: { code: 'NP' },
//   FR: { code: 'FR' }
// }
</script>
