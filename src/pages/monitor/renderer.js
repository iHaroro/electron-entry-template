import 'animate.css'
import '@/pages/monitor/assets/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'dayjs/locale/zh-cn'
// 注册指令
import registerDirectives from '@/pages/monitor/directive'

if (import.meta.env.DEV) {
  import('mockjs')
}

const app = createApp(App)

// 注册全局方法
app.use(createPinia())
app.use(router)

registerDirectives(app)

app.mount('#app')
