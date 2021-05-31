import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;

export default async (ctx: Context) => {
  const { type, level, title, body, score, answerTime } = ctx.request.body;

  console.log(type, level, title, body, score, answerTime)
  return (ctx.body = Response(1, ""));
};
