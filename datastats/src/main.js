import { createApp } from 'vue'
import './global.css'
/* import App from './components/Annual.vue' */
/* import App from './views/index.vue' */
import App from './views/t.vue'
import store from './views/store'
import ElementPlus from 'element-plus'; 
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)  
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store)  
app.use(ElementPlus)
app.mount('#app')
