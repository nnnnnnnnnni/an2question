import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import './components/index'
import { Button, message } from 'ant-design-vue';
const app = createApp(App)

app.use(Button)

app.use(Router).mount('#app')
