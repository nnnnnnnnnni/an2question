import { IRoute } from "../interface/route";
import Upload from "../controller/testpaper/upload";
import Create from "../controller/testpaper/create";
import Detail from "../controller/testpaper/detail";
import List from "../controller/testpaper/list";
import { publish, update } from "../controller/testpaper/update";
import Delete from "../controller/testpaper/delete";
import { testpaperValidation } from "../validation/testpaper";

export default [
  {
    path: "/testpaper",
    methods: "GET",
    validation: testpaperValidation.list,
    Middlewares: [List],
    needLogin: true,
  },
  {
    path: "/testpaper/:id",
    methods: "GET",
    validation: testpaperValidation.detail,
    Middlewares: [Detail],
    needLogin: true,
  },
  {
    path: "/testpaper",
    methods: "POST",
    validation: testpaperValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
  {
    path: "/testpaper",
    methods: "PUT",
    validation: testpaperValidation.update,
    Middlewares: [update],
    needLogin: true,
  },
  {
    path: "/testpaper/publish",
    methods: "PUT",
    validation: testpaperValidation.publish,
    Middlewares: [publish],
    needLogin: true,
  },
  {
    path: "/testpaper",
    methods: "DELETE",
    validation: testpaperValidation.delete,
    Middlewares: [Delete],
    needLogin: true,
  },
  {
    path: "/testpaper/upload",
    methods: "POST",
    Middlewares: [Upload],
    needLogin: true,
  },
] as IRoute[];
