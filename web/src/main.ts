import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import Store from "./vuex/index";
import "ant-design-vue/es/grid/style/index.css";
const app = createApp(App);
import { Spin, Tooltip, Radio, Button, Layout, Menu, Input, Form, Avatar, Select, Checkbox, Tag, Divider, Table, Pagination, Space, notification, InputNumber, Row, Col } from "ant-design-vue";
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
  .use(InputNumber)
  .use(Row)
  .use(Col)
  .use(Tooltip)
  .use(Spin)
  .use(notification)
  .use(Store)
  .use(Router)
  .mount("#app");
