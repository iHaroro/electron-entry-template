import 'animate.css'
import '@/pages/demo/assets/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册全局方法
app.use(createPinia())
app.use(router)

app.mount('#app')
