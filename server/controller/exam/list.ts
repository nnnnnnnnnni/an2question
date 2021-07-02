import examModel from "../../mongo/examSchema";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import { Context } from "koa";

export default async (ctx: Context) => {
  const { page, count, options }: any = ctx.request.query;

  const conds = options ? JSON.parse(options) : {};
  conds.creator = ctx.session.user._id;

  if (conds.title) {
    conds.title = { $regex: conds.title, $options: "i" };
  }
  const _page = page ? Number(page) : 1;
  const _count = count ? Number(count) : 10;

  const exams = await examModel
    .find(conds)
    .sort({ createAt: -1 })
    .skip((Number(_page) - 1) * Number(_count))
    .limit(Number(_count))
    .populate("testpaper", "title");

  const promiseArr = [];

  exams.forEach((exam) => {
    if (exam.type == 2) {
      const newStatus = Utils.checkStatus(exam.startAt, exam.closeAt);
      if (exam.status != newStatus) {
        promiseArr.push(examModel.updateOne({ _id: exam._id }, { $set: { status: newStatus } }));
      }
    }
  });

  const total = await examModel.countDocuments(conds);

  return (ctx.body = Response(1, "", { exams, total }));
};
