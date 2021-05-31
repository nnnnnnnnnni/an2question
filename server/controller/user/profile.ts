import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import _ from 'lodash';
import { Session } from "koa-session";

export default (ctx: Context) => {
  const user = (ctx.session as Session).user;
  return ctx.body = Response(1, '', user as any)
}