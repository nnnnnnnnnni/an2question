import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import examModel from "../../mongo/examSchema";

export default async (ctx: Context) => {
  const { id } = ctx.request.params;

  const detail = await examModel.findOne({ _id: id }).populate("participants", "avator name").populate("testpaper", "title");

  return (ctx.body = Response(1, "", detail));
};
