import { IRoute } from "../interface/route";
import Create from "../controller/question/create";
import List from "../controller/question/list";
import { publish } from "../controller/question/update";
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
  {
    path: "/question/publish",
    methods: "PUT",
    validation: questionValidation.publish,
    Middlewares: [publish],
    needLogin: true,
  },
] as IRoute[];
