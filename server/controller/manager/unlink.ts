import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import bindModel from "../../mongo/bindSchema";
import _ from "lodash";

export default async (ctx: Context) => {
  const { id } = ctx.request.body;
  const userId = ctx.session.user._id;

  const link = await bindModel.findOne({ inviter: userId, bindUser: id });
  if (!link) return (ctx.body = Response(0, "对应人员不存在"));
  await bindModel.deleteOne({ inviter: userId, bindUser: id });
  return (ctx.body = Response(1, "对应人员解绑成功"));
};
