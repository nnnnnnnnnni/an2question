import { IRoute } from "../interface/route";
import Create from "../controller/question/create";
import { questionValidation } from "../validation/question";

export default [
  {
    path: "/question",
    methods: "POST",
    validation: questionValidation.create,
    Middlewares: [Create],
    needLogin: true,
  },
] as IRoute[];
