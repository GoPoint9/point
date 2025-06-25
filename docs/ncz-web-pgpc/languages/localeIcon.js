/* eslint-disable no-var */
// images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/IN.svg

var imgList = [
  'CN',
  'US',
  'JP',
  'TH',
  'VN',
  'MM',
  'MX',
  'IN',
  'ID',
  'KH',
  'KR',
  'MY',
  'BR',
  'HK',
  'PK',
  'TLG',
  'TR',
  'CC',
  'BD',
  'UZ',
  'RU',
  'IR',
  'LO',
  'NP',
  'FR',
]

async function download (imagePath) {
  const sleep = ms => new Promise(OK => setTimeout(OK, ms))
  async function toDataURL (url) {
    const blob = await fetch(url).then(res => res.blob())
    return URL.createObjectURL(blob)
  }
  const a = document.createElement('a')
  a.href = await toDataURL(imagePath)
  a.download = imagePath.split('/').at(-1)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  await sleep(160) // 延遲一些，避免瀏覽器停止下載
}

const BASE_URL_CIRCLE = 'https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/RECT'

for (const path of imgList) {
  await download(`${BASE_URL_CIRCLE}/${path}.svg`)
}

const flagType = this.type === '1' ? 'RECT' : 'CIRCLE'

// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/AR.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/BN.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/CN.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/EN.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/ES.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/FA.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/FR.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/HI.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/ID.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/JA.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/KK.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/KM.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/KO.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/LO.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/MS.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/MY.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/NE.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/PT-BR.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/PT.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/RU.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/TA.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/TH.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/TR.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/TW.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/TY.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/UR-LA.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/UR.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/UZ.svg
// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/CIRCLE/VI.svg

// https://images.11029984.com//TCG_PROD_IMAGES/COUNTRY_FLAG/RECT/UZ.svg
