import { IExam, IExamSchema } from "@/mongo/examSchema";
import { Context } from "koa";
import { model } from "mongoose";
import utils from "../../lib/utils";
const Response = utils.generateResponse;

export default async (ctx: Context) => {
  const { title, type, testpaper, participants, times, startAt, closeAt, note, status } = ctx.request.body;
  const userId = ctx.session.user._id;
  const insertData: IExamSchema = {
    title: title ?? "",
    type: type ?? 1,
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

  console.log(insertData);
};
