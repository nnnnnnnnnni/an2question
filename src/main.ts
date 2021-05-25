import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import { Button, Layout, Menu, Breadcrumb  } from 'ant-design-vue';
const app = createApp(App)
app.use(Button);
app.use(Layout)
app.use(Menu);
app.use(Breadcrumb)

app.use(Router).mount('#app')
