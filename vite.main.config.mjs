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
        // squirrelWindows: {
        //   iconUrl: './images/icon.ico',
        //   setupIcon: './images/icon.ico', // 安装程序图标
        //   loadingGif: './images/install-spinner.gif',
        //   // remoteReleases: "https://your-update-server.com",
        //   msi: true // 同时生成.msi安装包
        // },
        // nsis: {
        //   // oneClick: false, // 是否一键安装 (默认true)
        //   // perMachine: false, // 是否为所有用户安装 (默认false)
        //   // allowElevation: true, // 允许权限提升 (默认true)
        //   // allowToChangeInstallationDirectory: true, // 允许修改安装目录 (默认false)
        //   // include: "script/installer.nsi", // 自定义NSIS脚本
        //   // deleteAppDataOnUninstall: false, // 卸载时删除应用数据
        //   // runAfterFinish: true, // 安装完成后运行应用 (默认true)
        //   // menuCategory: false, // 是否创建开始菜单目录 (字符串或false)
        //   // displayLanguageSelector: false, // 是否显示语言选择器
        //   shortcutName: "云视船舶-船端", // 图标名称
        //   installerIcon: "./images/icon.ico", // 安装图标
        //   uninstallerIcon: "./images/icon.ico", //卸载图标
        //   installerHeaderIcon: "./images/icon.ico", // 安装时头部图标
        //   // license: "license.txt", // 许可协议文件路径
        //   createDesktopShortcut: true, // 创建桌面图标
        //   createStartMenuShortcut: true, // 创建开始菜单图标
        //   artifactName: "${productName}-Setup-${version}.${ext}", // 安装包文件名格式
        //   uninstallDisplayName: "${productName} ${version}" // 卸载程序显示名称
        // },
        // directories: {
        //   output: "./MIES_SETUP" //输出文件路径
        // },
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
