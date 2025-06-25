// const autoprefixer = require('autoprefixer')
// const px2viewport = require('postcss-px-to-viewport-8-plugin')

// arg: [ { cwd: '/Users/rd03wcs/Documents/BDG/h5', env: 'ncz-web-pgpc' } ]
module.exports = (...arg) => {
  const { file, env } = arg[0]
  let remUnit = 32

  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    // console.warn('file.dirname ', file.dirname)
    remUnit = 37.5
  } else if (env.endsWith('-web-pgpc')) {
    // web 版 pgpc 競品
    remUnit = 16
  } else {
    remUnit = 75
  }

  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
      },
      'postcss-pxtorem': {
        // 根节点的 fontSize 值
        // rootValue: remUnit,
        propList: ['*'],
        selectorBlackList: [':root'],
      },
    },
  }
}
