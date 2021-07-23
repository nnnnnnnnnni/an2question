import { IRoute } from "../interface/route";
import Create from "../controller/exam/create";
import List from "../controller/exam/LIST";
import Delete from "../controller/exam/delete";
import Detail from "../controller/exam/detail";
import { publish } from "../controller/exam/update";
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
  {
    path: "/exam/:id",
    methods: "GET",
    validation: examValidation.detail,
    Middlewares: [Detail],
    needLogin: true,
  },
  {
    path: "/exam/publish",
    methods: "PUT",
    validation: examValidation.publish,
    Middlewares: [publish],
    needLogin: true,
  },
  {
    path: "/exam",
    methods: "DELETE",
    validation: examValidation.delete,
    Middlewares: [Delete],
    needLogin: true,
  },
] as IRoute[];
