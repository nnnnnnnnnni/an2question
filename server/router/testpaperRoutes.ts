import { IRoute } from "../interface/route";
import Upload from "../controller/testpaper/upload";
import Create from "../controller/testpaper/create";
import List from "../controller/testpaper/list";
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
    path: "/testpaper",
    methods: "POST",
    validation: testpaperValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
  {
    path: "/testpaper/upload",
    methods: "POST",
    Middlewares: [Upload],
    needLogin: true,
  },
] as IRoute[];
