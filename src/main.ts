import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import 'ant-design-vue/es/grid/style/index.css';
const app = createApp(App);
import { Radio, Button, Layout, Menu, Input, Form, Avatar, Select, Checkbox, Tag, Divider, Table, Pagination, Space } from "ant-design-vue";
app
  .use(Button)
  .use(Radio)
  .use(Layout)
  .use(Menu)
  .use(Input)
  .use(Form)
  .use(Avatar)
  .use(Select)
  .use(Checkbox)
  .use(Tag)
  .use(Divider)
  .use(Table)
  .use(Pagination)
  .use(Space)
  .use(Router)
  .mount("#app");
