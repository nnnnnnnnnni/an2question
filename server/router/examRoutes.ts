import { IRoute } from "../interface/route";
import Create from "../controller/exam/create";
import { examValidation } from "../validation/exam";

export default [
  {
    path: "/exma",
    methods: "POST",
    validation: examValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
] as IRoute[];
