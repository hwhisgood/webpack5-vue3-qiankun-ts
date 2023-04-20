import App from './index.vue'
import { createApp } from 'vue'
import './qiankun'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// import zhCN from 'antd/locale/zh_CN'
// import 'antd/dist/reset.css'

dayjs.locale('zh-cn')
console.log(createApp)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)

// 全局错误捕获
app.config.errorHandler = (err: any) => {
  console.error(err)
}

app.use(pinia).mount('#app')
