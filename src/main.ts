import { createApp } from 'vue'

// unocss
import 'virtual:uno.css'

// 全局样式
import './styles/index.css'

// 路由
import router from './router'

// dataV
import DataVVue3 from '@kjgl77/datav-vue3'

// Element-plus部分组件
import { setupElementPlus } from './plugins/elementPlus'

import App from './App.vue'

createApp(App).use(router).use(setupElementPlus).use(DataVVue3).mount('#app')
