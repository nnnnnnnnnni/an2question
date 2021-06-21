import { IRoute } from "../interface/route";
import MultiInsert from "../controller/manager/multiInsert";
import List from "../controller/manager/list";
import Unlink from "../controller/manager/unlink";
import { managerValidation } from "../validation/manager";

export default [
  {
    path: "/manager/insert",
    methods: "POST",
    validation: managerValidation.multiInsert,
    Middlewares: [MultiInsert],
    needLogin: true,
  },
  {
    path: "/manager/list",
    methods: "GET",
    validation: managerValidation.list,
    Middlewares: [List],
    needLogin: true,
  },
  {
    path: "/manager/unlink",
    methods: "DELETE",
    validation: managerValidation.unlink,
    Middlewares: [Unlink],
    needLogin: true,
  },
] as IRoute[];
