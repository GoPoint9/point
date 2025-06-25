import { readFileSync, readdirSync, type PathLike } from 'fs'
import { Plugin, ResolvedConfig } from 'vite'
import { glob } from 'glob'
import fse from 'fs-extra'
import path from 'path'
import * as process from 'node:process'
const CONFIG_FILE_NAME = 'app.config.js'
const idPrefix = 'icon'
const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g

const hasViewBox = /(viewBox="[^>+].*?")/g

const clearReturn = /(\r)|(\n)/g

function findSvgFile (dir: PathLike): string[] {
  const svgRes = []
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + '/'))
    } else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2) => {
          // console.log(++i)
          // console.log(dirent.name)
          let width = 0
          let height = 0
          let content = $2.replace(clearHeightWidth, (s1: any, s2: string, s3: number) => {
            if (s2 === 'width') {
              width = s3
            } else if (s2 === 'height') {
              height = s3
            }
            return ''
          })
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`
          }
          return `<symbol id="${idPrefix}-${dirent.name.replace('.svg', '')}" ${content}>`
        })
        .replace('</svg>', '</symbol>')
      svgRes.push(svg)
    }
  }
  return svgRes
}

export const VitePluginHtml = (dir: string): Plugin => {
  const res = findSvgFile(dir)
  let config: ResolvedConfig
  return {
    name: 'vite-plugin-html',
    configResolved (resolvedConfig) {
      config = resolvedConfig
    },
    transformIndexHtml (html) {
      const isBuild = config.command === 'build'
      const tags: any[] = [
        {
          tag: 'svg',
          injectTo: 'body-prepend',
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            style: 'position: absolute; width: 0; height: 0',
          },
          children: res.join(''),
        },
      ]
      if (isBuild) {
        tags.push({
          tag: 'script',
          injectTo: 'head-prepend',
          attrs: {
            src: `/${CONFIG_FILE_NAME}?v=${new Date().getTime()}`,
          },
        })
      }
      return tags
    },
    async closeBundle () {
      const filePath = path.join(config.publicDir, CONFIG_FILE_NAME)
      const outputPath = path.join(config.build.outDir, CONFIG_FILE_NAME)
      const isExists = await fse.pathExists(filePath)
      const configStr = `window.CONFIG = Object.freeze(${JSON.stringify(config.env, null, 2)});`.replace(/\s/g, '')
      if (!isExists) {
        await fse.writeFile(outputPath, configStr, 'utf-8')
        return
      }
      const file = await fse.readFile(filePath, 'utf-8')
      await fse.writeFile(outputPath, `${configStr}\n${file}`, 'utf-8')
    },
  }
}
export const VitePluginAssets = (): Plugin => {
  const virtualModuleId = 'vite:assets'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  const styleVirtualModuleId = 'vite:style'
  const styleResolvedVirtualModuleId = '\0' + styleVirtualModuleId
  let config: ResolvedConfig
  const getCode = (files: any[], { MAINCOLOR, cwd, isBuild }) => {
    const code = []
    const importCodes = []
    files.forEach((item, index) => {
      const name = `Assets${MAINCOLOR}${index}`
      const pathIcon = item.split(path.sep).join('/')
      if (isBuild) {
        importCodes.push(`import ${name} from "@/assets/${MAINCOLOR}/${pathIcon}";`)
        code.push(`"../assets/${MAINCOLOR}/${pathIcon}":${name},`)
      } else {
        importCodes.push(`import ${name} from "@/assets/${MAINCOLOR}/${pathIcon}";`)
        code.push(`"../assets/${MAINCOLOR}/${pathIcon}":${name},`)
      }
    })
    return {
      code: code.join('\n'),
      import: importCodes.join('\n'),
    }
  }
  const getIocns = async (isBuild: boolean) => {
    const MAINCOLOR = config.env?.VITE_MAINCOLOR
    const root = path.join(process.cwd(), 'src/assets/')
    const cwd = path.join(root, MAINCOLOR)
    const files = await glob('**/**/*.{png,svg}', {
      ignore: ['node_modules'],
      cwd,
    })
    const common = await glob('**/**/*.{png,svg}', {
      ignore: ['node_modules'],
      cwd: path.join(root, 'icons'),
    })
    const themeFile = getCode(files, { MAINCOLOR, cwd, isBuild })
    const commonFile = getCode(common, { MAINCOLOR: 'icons', cwd: path.join(root, 'icons'), isBuild })
    return `${themeFile.import}\n${commonFile.import}\nexport default{\nMAINCOLOR:"${MAINCOLOR}",\n${themeFile.code}${commonFile.code}};`
  }
  const getStyle = () => {
    const MAINCOLOR = config.env?.VITE_MAINCOLOR
    const VITE_HOME = config.env.VITE_HOME
    return `${VITE_HOME ? `import "@/assets/styles/other/${VITE_HOME}/reset.scss"\n` : ''}
      import "@/assets/${MAINCOLOR}/reset.scss"\n
      import "@/assets/${MAINCOLOR}/root.scss"`
  }
  return {
    name: 'vite-plugin-assets',
    configResolved (resolvedConfig) {
      config = resolvedConfig
    },
    resolveId (id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      if (id === styleVirtualModuleId) return styleResolvedVirtualModuleId
      return null
    },
    async load (id) {
      const isBuild = config.command === 'build'
      if (id === resolvedVirtualModuleId) {
        return getIocns(isBuild)
      }
      if (id === styleResolvedVirtualModuleId) {
        return getStyle()
      }
      return null
    },
  }
}
