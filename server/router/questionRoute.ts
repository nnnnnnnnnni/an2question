import { IRoute } from "../interface/route";
import Create from "../controller/question/create";
import List from "../controller/question/list";
import { questionValidation } from "../validation/question";

export default [
  {
    path: "/question",
    methods: "POST",
    validation: questionValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
  {
    path: "/question",
    methods: "GET",
    validation: questionValidation.list,
    Middlewares: [List],
    needLogin: true,
  },
] as IRoute[];
