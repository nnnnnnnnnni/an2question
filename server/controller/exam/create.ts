import examModel, { IExam, IExamSchema } from "../../mongo/examSchema";
import bindModel from "../../mongo/bindSchema";
import { Context } from "koa";
import utils from "../../lib/utils";
const Response = utils.generateResponse;

export default async (ctx: Context) => {
  const { title, type, testpaper, participants, times, startAt, closeAt, note, status, visible } = ctx.request.body;
  const userId = ctx.session.user._id;
  const insertData: IExamSchema = {
    title: title ?? "",
    type: type ?? 1,
    visible: visible ?? 1,
    testpaper: testpaper,
    participants: participants && participants.length ? participants : [],
    times: times,
    note: note ?? "",
    status: type == 1 ? utils.checkStatus(startAt, closeAt) : status,
    creator: userId,
  };
  if (type == 1) {
    insertData.startAt = startAt;
    insertData.closeAt = closeAt;
  }

  const newExam = await examModel.create(insertData);
  await bindModel.create({
    exam: newExam._id,
    testpaper: testpaper,
  });
  return ctx.body = Response(1, '创建成功', newExam)
};
