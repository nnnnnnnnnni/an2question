import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import _ from 'lodash';


export default (ctx: Context) => {
  const user = ctx.session.user;
  return ctx.body = Response(1, '', user as any)
}