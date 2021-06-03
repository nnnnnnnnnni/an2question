import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";

export default async (ctx: Context) => {
  const { id } = ctx.request.params;

  const detail = await questionModel.findOne({ _id: id });

  return (ctx.body = Response(1, "", detail));
};
