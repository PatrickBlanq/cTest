import { createApp } from 'vue'
import './global.css'
/* import App from './components/Annual.vue' */
/* import App from './views/index.vue' */
import App from './views/t.vue'
import store from './views/store'
import ElementPlus from 'element-plus'; 
import 'element-plus/dist/index.css'

const app = createApp(App)  
app.use(store)  
app.use(ElementPlus)
app.mount('#app')
