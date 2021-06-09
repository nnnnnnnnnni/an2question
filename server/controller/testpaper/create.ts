import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import testpaperModel from "../../mongo/testpaperSchema";
import questionModel from "../../mongo/questionSchema";
import bindModel from "../../mongo/bindSchema";

export default async (ctx: Context) => {
  const doc = ctx.request.body;

  const insertData = {
    title: doc.title,
    status: doc.status,
    questions: doc.questions || [],
    files: doc.files || [],
    creator: ctx.session.user._id
  };
  const newTestpaper = await testpaperModel.create(insertData);
  const testpaperId = newTestpaper._id;
  const bindData = doc.questions.map((key: string) => {
    return { testpaper: testpaperId, question: key };
  });
  await Promise.all([
    bindModel.insertMany(bindData),
    questionModel.updateMany({ _id: { $in: doc.questions } }, { $set: { status: 3 } })
  ]);

  return (ctx.body = Response(1, "", newTestpaper.toJSON()));
};
