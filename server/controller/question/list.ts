import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";

export default async (ctx: Context) => {
  const { page, count, options }: any = ctx.request.query;

  const conds = options ? JSON.parse(options) : {};

  if (conds.title) {
    conds.title = { $regex: conds.title, $options: "i" };
  }
  const _page = page ? Number(page) : 1;
  const _count = count ? Number(count) : 10;

  const questions = await questionModel
    .find(conds)
    .select("title score type status level answerTime")
    .sort({ createAt: -1 })
    .skip((Number(_page) - 1) * Number(_count))
    .limit(Number(_count));

  const total = await questionModel.countDocuments(conds);

  return (ctx.body = Response(1, "", { questions, total }));
};
