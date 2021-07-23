import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import testpaperModel from "../../mongo/testpaperSchema";
import examModel from "../../mongo/examSchema";
import bindModel from "../../mongo/bindSchema";

export default async (ctx: Context) => {
  const { id } = ctx.request.body;

  const exam = await examModel.findOne({ _id: id });
  if (!exam) {
    return (ctx.body = Response(0, "考试不存在"));
  } else if ([3, 4].includes(exam.status)) {
    return (ctx.body = Response(0, "考试已被使用,无法删除"));
  }
  const binds = await bindModel.find({ testpaper: exam.testpaper, exam: { $exists: true } });
  let bindId = "";
  binds.forEach((bind) => {
    if (bind.exam == id) {
      bindId = bind._id;
    }
  });
  let shouldUpdateTestpaper = true;
  if (bindId && binds.length == 1) {
    shouldUpdateTestpaper = false;
  }
  await Promise.all([
    examModel.remove({ _id: id }),
    bindModel.deleteOne({ _id: bindId }),
    testpaperModel.updateOne({ _id: exam.testpaper }, { $set: { status: shouldUpdateTestpaper ? 3 : 2 } })
  ]);

  return (ctx.body = Response(1, "删除成功"));
};
