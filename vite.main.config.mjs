import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config
export default defineConfig({
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'ship-tools', //项目名，也是生成的安装文件名
        //copyright: "Copyright © 2019",//版权信息
        // win: {
        //   icon: './images/icon.png',
        //   // 以管理员权限运行
        //   requestedExecutionLevel: 'requireAdministrator',
        //   target: [{
        //     target: "nsis", //利用nsis制作安装程序
        //     arch: [
        //       "x64", //64位
        //     ]
        //   }],
        // },
        // nsis: {
        //   oneClick: false, // 是否一键安装
        //   allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        //   allowToChangeInstallationDirectory: true, // 允许修改安装目录
        //   installerIcon: "./images/icon.png", // 安装图标
        //   uninstallerIcon: "./images/icon.png", //卸载图标
        //   installerHeaderIcon: "./images/icon.png", // 安装时头部图标
        //   createDesktopShortcut: true, // 创建桌面图标
        //   createStartMenuShortcut: true, // 创建开始菜单图标
        //   shortcutName: "MIES", // 图标名称
        // },
        // directories: {
        //   output: "./MIES_SETUP" //输出文件路径
        // },
        /**** 注意这里 配置config.json ****/
        extraResources: [
          { "from": "./config.json", "to": "../" }
        ],
      }
    }
  },
  resolve: {
    extensions: ['.js', 'jsx', '.vue', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
