import { IRoute } from "../interface/route";
import MultiInsert from "../controller/user/multiInsert";
import ManagerList from "../controller/user/managerList";
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
    validation: managerValidation.managerList,
    Middlewares: [ManagerList],
    needLogin: true,
  },
] as IRoute[];
