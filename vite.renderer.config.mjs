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

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    
    plugins: [
      vue(),
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
          additionalData: `@use "@/assets/styles/sizeUtils.scss" as *;`
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
        '/djys': {
          // target: 'http://192.168.2.18:8082',
          target: 'https://djys-api.dajvision.com',
          changeOrigin: true
        }
      }
    }
  }
})
