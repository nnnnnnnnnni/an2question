import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;

export default async (ctx: Context) => {
  if(ctx.session.user) {
    console.log(ctx.session.user)
  } else {
    console.log('no login')
    ctx.session.user = {
      name: 'ok',
      email: '123123123@qq.com'
    }
  }
  return (ctx.body = Response(1, `TEST TIME: ${new Date()}`));
};
