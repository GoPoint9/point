const path = require('path')
const fs = require('fs')

//
const files = fs.readdirSync(__dirname + '/dist/')
// 过滤出.html文件:
const html_files = files.filter((f) => {
  return f.endsWith('.html')
})

console.log('html_files: ', html_files)

// const rep_content = `window.src`;
const rep_contents = ''

html_files.map((v) => {
  const fpro = v
  // fpro = fpro.split('/')
  // fpro = fpro[fpro.length - 1]
  const paths = path.join(__dirname, './dist/', fpro)

  console.log('paths: ', paths)
  const Rand = Math.random()
  const mineId = Math.round(Rand * 100000000)
  console.log('mineId: ', mineId)
  fs.readFile(paths, 'utf8', function (err, data) {
    if (err) return console.log(err)

    const reg = /js\/(.+)\"/g
    const match = data.match(reg)
    // console.log('match: ', match)

    if (match.length > 0) {
      const item = match[0]
      console.log('item: ', item)
      // match.forEach((item) => {
      // console.log(item, JSON.stringify(item))
      const ite = item.slice(0, -1)
      // let itearr = ite.split('/')
      // itearr
      // console.log('ite: ', ite)

      // let new_reg = `/${ite}/`
      // let new_reg = `/js\/index.js/`
      // console.log('new_reg: ', new_reg)

      // ${ite}?v=${mineId}
      data.replace(/html/g, 'index.js1234243')
      // })
      console.log(222222)
    }
    data.replace(/index\.js/, 'index.js1234243')

    console.log('data: ', data)
    // fs.writeFile(paths, data, 'utf8', () => {
    // 	console.dir('缓存替换完成！！！！！！！！！！！！！')
    // })
  })
})

console.log('创建合并请求测试')
