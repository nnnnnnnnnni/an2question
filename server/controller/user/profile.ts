import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import _ from "lodash";
import { Session } from "koa-session";
import userModel from "../../mongo/userSchema";

export default (ctx: Context) => {
  const user = (ctx.session as Session).user;
  userModel.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });
  return (ctx.body = Response(1, "", user as any));
};
