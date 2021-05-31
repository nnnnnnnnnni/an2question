import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;

export default (ctx: Context) => {
  const files = ctx.request.files;
  // console.log(files);
  return ctx.body = Response(1, '', files)
};
