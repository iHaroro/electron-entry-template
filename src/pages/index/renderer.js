/**
 * 此文件将由 vite 自动加载并在 “renderer” 上下文中运行。
 * 要了解有关 “main” 和 “renderer” 上下文之间差异的更多信息，请参阅
 * Electron，请访问：
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * 默认情况下，此文件中的Node.js集成处于禁用状态。启用 Node.js 集成时
 * 在 Renderer 进程中，请注意潜在的安全隐患。您可以阅读
 * 有关安全风险的更多信息，请点击此处：
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * 要在此文件中启用 Node.js 集成，请打开“main.js”并启用“nodeIntegration”
 *
 *
 * ```
 *  // 创建浏览器窗口。
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import 'animate.css'
import '@/pages/index/assets/styles/main.scss'
// 全局通用样式
import '@/pages/index/assets/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'dayjs/locale/zh-cn'
// 注册指令
import registerDirectives from '@/pages/index/directive'
// 工具方法。
import { fitChartSize } from '@/pages/index/assets/js/dataUtils.js'

const app = createApp(App)

// 注册全局方法
app.config.globalProperties.fitChartSize = fitChartSize
app.use(createPinia())
app.use(router)

registerDirectives(app)

app.mount('#app')
