import { IRoute } from "../interface/route";
import Create from "../controller/exam/create";
import List from "../controller/exam/LIST";
import { examValidation } from "../validation/exam";

export default [
  {
    path: "/exam",
    methods: "POST",
    validation: examValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
  {
    path: "/exam",
    methods: "GET",
    validation: examValidation.list,
    Middlewares: [List],
    needLogin: true,
  },
] as IRoute[];
