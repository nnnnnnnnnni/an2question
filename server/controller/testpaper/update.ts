import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";
import bindModel from "../../mongo/bindSchema";
import testpaperModel from "../../mongo/testpaperSchema";
import { Types } from "mongoose";
import ObjectId = Types.ObjectId;

export const publish = async (ctx: Context) => {
  const { id, status } = ctx.request.body;

  const testpaper = await testpaperModel.findOne({ _id: id });
  if (testpaper.status == 3) {
    return (ctx.body = Response(0, "发布失败:试卷已经被使用"));
  }

  await testpaperModel.updateOne(
    { _id: id },
    {
      $set: {
        status: status,
      },
    }
  );

  return (ctx.body = Response(1, "发布成功"));
};

export const update = async (ctx: Context) => {
  const doc = ctx.request.body;
  const userId = ctx.session.user._id;

  const updateData = {
    title: doc.title,
    status: doc.status,
    questions: doc.questions || [],
    files: doc.files || [],
  };

  const removeQuestions: ObjectId[] = [];
  const stillQuestions: ObjectId[] = [];
  const installQuestion: {testpaper: ObjectId, question: ObjectId}[] = [];

  const oldTestpaper = await testpaperModel.findOne({ _id: doc._id });
  if(String(oldTestpaper.creator) != userId) {
    return (ctx.body = Response(0, "非法更新"));
  }
  const oldQuestions = oldTestpaper.questions.map((question) => String(question));
  doc.questions.forEach((question: string) => {
    if (oldQuestions.includes(question)) {
      stillQuestions.push(ObjectId(question));
    } else {
      installQuestion.push({
        testpaper: ObjectId(doc._id),
        question: ObjectId(question)
      });
    }
  });
  oldQuestions.forEach((question) => {
    if (!doc.questions.includes(question)) {
      removeQuestions.push(ObjectId(question));
    }
  });

  const binds = await bindModel.aggregate([{ $match: { question: { $in: removeQuestions } } }, { $group: { _id: "$question", total: { $sum: 1 } } }]);
  const delAndUpdateIds: ObjectId[] = [];
  binds.forEach((bind) => {
    if (bind.total == 1) {
      delAndUpdateIds.push(bind._id);
    }
  });
  await Promise.all([
    questionModel.updateMany({ _id: { $in: delAndUpdateIds } }, { $set: { status: 2 } }),
    testpaperModel.updateOne({ _id: doc._id }, { $set: updateData }),
    bindModel.insertMany(installQuestion),
    questionModel.updateMany({ _id: { $in: doc.questions } }, { $set: { status: 3 } })
  ]);

  return (ctx.body = Response(1, ""));
};
