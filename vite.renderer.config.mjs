import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import zipPack from 'vite-plugin-zip-pack'
import viteCompression from 'vite-plugin-compression'
import copy from 'rollup-plugin-copy'

const root = process.cwd();

function pathResolve(dir) {
  return resolve(root, '.', dir);
}

// 多页面配置
const pages = [
  {
    name: 'index',
    htmlName: 'index.html',
    htmlPath: 'src/pages/index/',
    outPagePath: 'pages/index/'
  },
  {
    name: 'monitor',
    htmlName: 'index.html',
    htmlPath: 'src/pages/monitor/',
    outPagePath: 'pages/monitor/'
  }
]
pages.forEach((page) => page.path = pathResolve(page.htmlPath + page.htmlName))

const getEntryInput = () => pages.reduce((res, cur) => {
  res[cur.name] = cur.path;
  return res;
}, {})

const multiplePagePlugin = () => ({
  name: "multiple-page-plugin",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // 处理多页面路由
      for (let page of pages) {
        if (req.url.startsWith(`/${page.name}`)) {
          req.url = `/${page.htmlPath}${page.htmlName}`
          break
        }
      }
      next()
    })
  }
})

// 处理html输出路径
const htmlPlugin = () => {
  return {
    name: "html-path-manual",
    generateBundle(options, bundle) {
      console.log('generateBundle options', options)
      console.log('generateBundle bundle', bundle)
      for (let page of pages) {
        const htmlFile = bundle[page.htmlPath + page.htmlName]
        if (htmlFile) {
          htmlFile.fileName = page.outPagePath + page.htmlName
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      multiplePagePlugin(),
      vueJsx(),
      vueDevTools(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          })
        ]
      }),
      //默认压缩gzip，生产.gz文件
      viteCompression({
        deleteOriginFile: false //压缩后是否删除源文件
      }),
      zipPack(),
      copy({
        targets: [
          {
            src: 'node_modules/@liveqing/liveplayer-v3/dist/component/liveplayer-lib.min.js',
            dest: 'public/js'
          }
        ]
      })
    ],
    build: {
      rollupOptions: {
        input: getEntryInput(),
        output: {
          // 自定义输出目录和文件名
          entryFileNames: (chunkInfo) => {
            // 尝试通过chunk名匹配多页面路径 若匹配到则放置在对应目录 否则放置在根目录
            const page = pages.find((p) => p.name === chunkInfo.name);
            return page
                   ? `${page.outPagePath.replace(/^\//, "")}assets/[name].[hash].js`
                   : "assets/[name].[hash].js";
          },
          chunkFileNames: (chunkInfo) => {
            // 通过chunk的facadeModuleId匹配多页面路径
            if (chunkInfo.facadeModuleId) {
              const chunk = pages.find((p) => chunkInfo.facadeModuleId?.includes(p.outPagePath));
              return chunk
                     ? `${chunk.outPagePath.replace(/^\//, "")}assets/[name].[hash].js`
                     : "assets/[name].[hash].js";
            }
            return "assets/[name].[hash].js";
          },
          assetFileNames: (assetInfo) => {
            // 处理 CSS、图片等资源
            // 优先按照原始文件名处理 若匹配到多页面路径则放置在对应目录 否则放置在根目录assets
            if (assetInfo.originalFileName) {
              const page = pages.find((p) => assetInfo.originalFileName?.includes(p.outPagePath));
              return page
                     ? `${page.outPagePath.replace(/^\//, "")}assets/[name].[hash][extname]`
                     : "assets/[name].[hash][extname]";
            } else {
              // 如果没有原始文件名，通过name匹配
              const page = pages.find((p) => assetInfo.name?.includes(p.name));
              return page
                     ? `${page.outPagePath.replace(/^\//, "")}assets/[name].[hash][extname]`
                     : "assets/[name].[hash][extname]";
            }
          }
        },
        plugins: [htmlPlugin()]
      }
    },
    optimizeDeps: {
      include: ['qs', 'echarts', 'lodash', 'dayjs'],
      exclude: []
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.info', 'console.error', 'console.warn']
    },
    resolve: {
      extensions: ['.js', 'jsx', '.vue', '.json'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      // 全局配置 utils.scss
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/pages/index/assets/styles/sizeUtils.scss" as *;`
        },
        less: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    },
    server: {
      port: 8888,
      host: '0.0.0.0',
      proxy: {
        '/djysConfig': {
          // target: 'http://192.168.2.18:8062',
          // target: 'https://djys-api.dajvision.com',
          target: 'http://djys-test-api.dajvision.com',
          changeOrigin: true
        },
        '/djys': {
          // target: 'http://192.168.2.18:8082',
          target: 'https://djys-api.dajvision.com',
          changeOrigin: true
        }
      }
    }
  }
})
