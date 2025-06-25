// @ts-nocheck
function getHashParams () {
  let fragment = window.location.hash
  if (!fragment.includes('?')) fragment = location.search
  function parseHashParams (fragment) {
    if (fragment) {
      const queryStart = fragment.indexOf('?')

      if (queryStart !== -1) {
        // 如果存在问号，则截取问号后的部分
        fragment = fragment.substring(queryStart + 1)
      }
      const queryParams = fragment.split('&')
      const params = {}

      queryParams.forEach(function (param) {
        const keyValue = param.split('=')
        params[keyValue[0]] = decodeURIComponent(keyValue[1])
      })

      return params
    } else {
      return {}
    }
  }

  return parseHashParams(fragment)
}
const query = getHashParams()
const pointObj = {
  '91club': () => {
    const map = {
      356634288423: '749293993830590',
    }
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  yjlottery: () => {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', '865606625239361')
    fbq('track', 'PageView')
  },
  '66lottery': () => {
    if (query.gtagId) localStorage.setItem('gtagId', query.gtagId)
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', query.fb_dynamic_pixel)
    const gtagId = query.gtagId || localStorage.getItem('gtagId') || 'AW-11352382371'
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || ''
    ;(function () {
      window.dataLayer = window.dataLayer || []
      function gtag () {
        dataLayer.push(arguments)
      }
      window.gtag = gtag
      const hm = document.createElement('script')
      hm.src = 'https://www.googletagmanager.com/gtag/js?id=' + gtagId
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
      gtag('js', new Date())
      gtag('config', gtagId)
    })()
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  lottery7: () => {
    const map = {
      18685100001: '749293993830590',
    }
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  pakgames: () => {
    const map = {
      28187260351: '1611788192994065',
    }
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  fb999: () => {
    const map = {
      17837762: '1544377389683477',
    }
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  ar006: () => {
    const map = {
      8281440027: '946249607200818',
      38316220667: '2061590324241394',
      42318414899: '893342322790796',
    }
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  tc: () => {
    const map = {
      782836509244: '726754589391410',
    }
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  lottery82: () => {
    const newMetaTag1 = document.createElement('meta')
    newMetaTag1.name = 'description'
    newMetaTag1.content =
      '82Lottery - is an online lottery platform in India that allows users in exciting lottery games and have a chance to big prizes and be lucky winners at 82Lottery!'
    document.head.appendChild(newMetaTag1)
    const newMetaTag2 = document.createElement('meta')
    newMetaTag2.name = 'keywords'
    newMetaTag2.content = '82Lottery, 82bet, play india lottery'
    document.head.appendChild(newMetaTag2)
  },
  fb: (map: any = {}) => {
    const invitationCode = query.invitationCode || sessionStorage.getItem('invitecode')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || map[invitationCode] || ''
    if (query.fb_dynamic_pixel) localStorage.setItem('fb_dynamic_pixel', queryfb_dynamic_pixel)
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    const fb_dynamic_pixel = query.fb_dynamic_pixel || localStorage.getItem('fb_dynamic_pixel') || map[invitationCode]
    if (fb_dynamic_pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', fb_dynamic_pixel)
      fbq('track', 'PageView')
    }
  },
  fbNew: (list = []) => {
    if (!list?.length) return
    const map = {}
    list.forEach((item) => {
      map[item.domainUrl] = item.pixelId
    })
    // 获取完整路径
    const currentURL = window.location.href
    // 当前页面的主机名和端口部分
    const currentOrigin = window.location.origin
    // 当前页面的主机名和端口部分（如果有的话），但不包括协议部分
    const currentDomain = window.location.host
    // 存储在会话中的pixel
    const lock = sessionStorage.getItem('pixel') || sessionStorage.getItem('fb_dynamic_pixel')
    const queryfb_dynamic_pixel = query.fb_dynamic_pixel || ''
    if (query.invitationCode) sessionStorage.setItem('invitecode', query.invitationCode)
    if (queryfb_dynamic_pixel) sessionStorage.setItem('fb_dynamic_pixel', query.fb_dynamic_pixel)
    // 先获取完整路径的像素id，域名，主机名，会话缓存的像素id。
    const pixel = map[currentURL] || map[currentOrigin] || map[currentDomain] || lock
    if (pixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      fbq('init', pixel)
      fbq('track', 'PageView')
      // 更新最新匹配到的像素id在当前会话中；
      sessionStorage.setItem('pixel', pixel)
    }
  },
}
export default pointObj
