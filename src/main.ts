import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as ElementUI from 'element-plus'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(createPinia()).mount('#app')

// 声明全局变量属性
declare module 'vue' {
  interface ComponentCustomProperties {
    $confirm: (a: string) => Promise<void>
    $Alert: any
    $Notify: any
    $lee: string
  }
}

//   声明全局变量
app.config.globalProperties.$confirm = ElementUI.ElMessageBox.confirm
app.config.globalProperties.$Alert = ElementUI.ElMessageBox.alert
app.config.globalProperties.$Notify = ElementUI.ElNotification

app.config.globalProperties.$lee = 'LEEVANCEE'
