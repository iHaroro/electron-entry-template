const path = require('node:path')
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const {
  FuseV1Options,
  FuseVersion
} = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'images', 'icon.ico')
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // package.json 中的 productName 不能指定为中文，否则同时指定setupIcon时会报错
        // iconUrl: `file://${path.join(__dirname, 'images', 'icon.ico')}`,
        setupIcon: path.join(__dirname, 'images', 'icon.ico'),
        loadingGif: path.join(__dirname, 'images', 'install-spinner.gif')
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // 'build' 可以指定多个入口构建，可以是 Main process、Preload scripts、Worker process 等。
        // 如果你熟悉 Vite 配置，它看起来会非常熟悉。
        build: [
          {
            // 'entry' 只是 'config' 对应文件中 'build.lib.entry' 的别名。
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
            target: 'main'
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
            target: 'preload'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs'
          }
        ]
      }
    },
    // Fuse 用于在对应用程序进行代码签名之前，在打包时启用/禁用各种 Electron 功能
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
};
