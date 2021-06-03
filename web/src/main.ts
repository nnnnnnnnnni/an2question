import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import Store from "./vuex/index";
import "ant-design-vue/es/grid/style/index.css";
const app = createApp(App);
import {
  Spin,
  Tooltip,
  Radio,
  Button,
  Layout,
  Menu,
  Input,
  Form,
  Avatar,
  Select,
  Checkbox,
  Tag,
  Divider,
  Table,
  Pagination,
  Space,
  notification,
  InputNumber,
  Row,
  Col,
  message,
  Upload,
} from "ant-design-vue";
message.config({
  maxCount: 5,
});
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
  .use(Upload)
  .use(notification)
  .use(Store)
  .use(Router)
  .mount("#app");
