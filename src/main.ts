import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
const app = createApp(App);
import { Button, Layout, Menu, Input, Form, Avatar, Select, Checkbox, Tag, Divider, Table, Pagination } from "ant-design-vue";
app
  .use(Button)
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
  .use(Router)
  .mount("#app");
