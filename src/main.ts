import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
const app = createApp(App)
import { Button, Layout, Menu, Input, Form, Avatar, Select, Checkbox  } from 'ant-design-vue';
app.use(Button);
app.use(Layout)
app.use(Menu);
app.use(Input)
app.use(Form)
app.use(Avatar)
app.use(Select)
app.use(Checkbox)

app.use(Router).mount('#app')
