import { IRoute } from "../interface/route";
import Upload from "../controller/public/upload";

export default [
  {
    path: "/upload",
    methods: "POST",
    Middlewares: [Upload],
    needLogin: false,
  },
] as IRoute[];
