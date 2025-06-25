import path from 'path'
import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import UnoCSS from 'unocss/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import { VitePluginHtml, VitePluginAssets } from './src/plugins/html'
import removeConsole from 'vite-plugin-remove-console'
import { execSync } from 'child_process'
// import { env } from 'process'
// 如果不通过js引入svg，可以通过这个插件来防止svg被打包进js中

function getGitBranch () {
  try {
    // 执行git branch命令，然后通过管道过滤当前分支
    const branchName = process.env.BRANCH_NAM || ''
    const commitId = execSync('git rev-parse HEAD').toString().trim()
    return branchName.toString().trim() + ' commitId:' + commitId
  } catch (err) {
    console.error('无法获取git分支名称:', err)
    return null
  }
}
export default defineConfig(({ mode, command }) => {
  // const AR_ENV = loadEnv(mode, path.resolve(__dirname, `./entrance/${process.env.NODE_ENV}/`))
  // Load app-level env vars to node-level env vars.
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()), // 全局 .env
    ...loadEnv(mode, path.resolve(__dirname, `./entrance/${process.env.NODE_ENV}/`)), // 各站點的環境變數
  }

  const buildTime = new Date().toLocaleString()
  const branchName = getGitBranch()
  console.log('env.BRANCH_NAM', process.env.BRANCH_NAM)
  console.log('branch=======', branchName)
  return {
    plugins: [
      UnoCSS(),
      vueJsx(),
      vue(),
      svgLoader(),
      VitePluginHtml('./src/assets/icons/svg/'),
      VitePluginAssets(),
      splitVendorChunkPlugin(),
      removeConsole({ external: ['development'] }),

      TurboConsole(),
      // 自動引入套件
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        // global imports to register
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'pinia',
          '@vueuse/core',
          {
            '@/stores': [
              'useActivityStore',
              'useCommonStore',
              'GlobalStore',
              'useHomeStore',
              'LorreryStore',
              'useUserStore',
              'userInfo',
              'useWalletStore',
              'SettingStore',
              'useSkinStore',
              'useSiteStore',
              'usePaymentStore',
              'useRecordStore',
            ],
          },
          // 'vitest',
        ],
        resolvers: [ElementPlusResolver()],
        dts: path.resolve(__dirname, 'src/auto-imports.d.ts'),
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
          // eslint-disable-next-line quotes
          additionalData: "@use '@/assets/styles/vars.scss' as *; @use '@/assets/styles/native.scss' as *;",
        },
      },
    },
    root: path.resolve(__dirname, `./entrance/${process.env.NODE_ENV}/`),
    envDir: path.resolve(__dirname, `./entrance/${process.env.NODE_ENV}/`),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@entrance': path.resolve(__dirname, './entrance'),
        '@icon': path.resolve(__dirname, `src/assets/${process.env.VITE_MAINCOLOR}/icons`),

        // ref: https://github.com/intlify/vue-i18n/issues/789
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      proxy: {
        [process.env.VITE_API_BASE_URL]: {
          target: process.env.VITE_API_URL,
          secure: false,
          changeOrigin: true,
          // pathRewrite: {
          //   '^/api': '/api',
          // },
        },
      },
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      filenameHashing: true,
      // assetsInlineLimit: /* 20kb */ 20480,
      minify: 'esbuild',
      chunkSizeWarningLimit: 500 /* 默认500kb 后面会进行分包处理*/,
      assetsInlineLimit: 0 /* 静态文件处理*/,
      rollupOptions: {
        external (id) {
          if (id.includes('Style/icons')) {
            if (!id.includes(process.env.VITE_MAINCOLOR + '/icons')) {
              return true
            }
          }
        },
        plugins: [
          {
            name: 'remove-console-warn',
            renderChunk (code) {
              // 移除 lib-flexible 中的 console.warn 语句
              return code.replace('将根据已有的meta标签来设置缩放比例', '')
            },
          },
        ],
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks (id, { getModuleInfo }) {
            // node_modules
            if (id.includes('node_modules')) {
              return 'modules'
            }
            // languages
            const match = /src\/languages\/modules\/(.+)\.ts/.exec(id)
            if (match) {
              const outputName = match[1]
              return outputName
            }
            const matchPage = /src\/views\/(.+)/.exec(id)
            if (matchPage) {
              const name = matchPage[1].split('/')[0]
              return `page-${name}`
            }
          },
          intro: `window.getBuildInfo = function() {
            const buildTime = '${buildTime}';
            const branch = '${branchName}' || 'main';
            return { buildTime, branch };
          };`,
        },
      },
    },
  }
})
