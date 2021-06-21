import { Context } from "koa";
import { IQuestion } from "../../mongo/questionSchema";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import testpaperModel from "../../mongo/testpaperSchema";

export default async (ctx: Context) => {
  const { page, count, options }: any = ctx.request.query;

  const conds = options ? JSON.parse(options) : {};
  conds.creator = ctx.session.user._id;

  if (conds.status == 5) {
    conds.status = { $in: [2, 3] };
  }

  if (conds.title) {
    conds.title = { $regex: conds.title, $options: "i" };
  }
  const _page = page ? Number(page) : 1;
  const _count = count ? Number(count) : 10;

  const testpapers = await testpaperModel
    .find(conds)
    .populate("questions")
    .select("title questions status")
    .sort({ createAt: -1 })
    .skip((Number(_page) - 1) * Number(_count))
    .limit(Number(_count));

  const _testpapers = testpapers.map((item) => {
    const data = {
      choiceCount: 0,
      choiceScore: 0,
      multiCount: 0,
      multiScore: 0,
      blankCount: 0,
      blankScore: 0,
      codeCount: 0,
      codeScore: 0,
    };
    const questions = item.questions as IQuestion[];
    questions.forEach((question) => {
      if (question.type == 1) {
        data.choiceCount += 1
        data.choiceScore += question.score
      } else if (question.type == 2) {
        data.multiCount += 1
        data.multiScore += question.score
      } else if (question.type == 3) {
        data.blankCount += 1
        data.blankScore += question.score
      } else {
        data.codeCount += 1
        data.codeScore += question.score
      }
    });
    return {
      ...data,
      title: item.title,
      status: item.status,
      _id: item._id
    };
  });

  const total = await testpaperModel.countDocuments(conds);

  return (ctx.body = Response(1, "", { testpapers: _testpapers, total }));
};
