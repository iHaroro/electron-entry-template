import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config
export default defineConfig({
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'ship-tools-app', //项目名，也是生成的安装文件名
        copyright: 'Copyright©2025 云视船舶 All Rights Reserved', // 版权信息
        win: {
          icon: './images/icon.ico',
          // 以管理员权限运行
          requestedExecutionLevel: 'requireAdministrator',
          target: [{
            // target: "nsis", // 利用nsis制作安装程序
            target: 'squirrel', // 利用squirrel制作安装程序
            arch: ['x64']
          }]
        },
        /**** 注意这里 配置config.json ****/
        extraResources: [
          {
            from: './config.json',
            to: '../'
          }
        ]
      }
    }
  },
  resolve: {
    extensions: ['.js', 'jsx', '.vue', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@electron': fileURLToPath(new URL('./electron', import.meta.url))
    }
  }
});
