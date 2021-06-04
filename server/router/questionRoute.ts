import { IRoute } from "../interface/route";
import Create from "../controller/question/create";
import List from "../controller/question/list";
import { publish } from "../controller/question/update";
import Detail from "../controller/question/detail";
import Upload from "../controller/question/upload";
import { questionValidation } from "../validation/question";

export default [
  {
    path: "/question",
    methods: "GET",
    validation: questionValidation.list,
    Middlewares: [List],
    needLogin: true,
  },
  {
    path: "/question",
    methods: "POST",
    validation: questionValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
  {
    path: "/question/publish",
    methods: "PUT",
    validation: questionValidation.publish,
    Middlewares: [publish],
    needLogin: true,
  },
  {
    path: "/question/:id",
    methods: "GET",
    validation: questionValidation.detail,
    Middlewares: [Detail],
    needLogin: false,
  },
  {
    path: "/question/upload",
    methods: "POST",
    Middlewares: [Upload],
    needLogin: true,
  },
] as IRoute[];
