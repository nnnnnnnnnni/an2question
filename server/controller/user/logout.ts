import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;

export default async (ctx: Context) => {
  ctx.session = null;
  return ctx.body = Response(1, '退出登录成功')
};
