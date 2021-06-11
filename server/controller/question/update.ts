import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";

export const publish = async (ctx: Context) => {
  const { id, status } = ctx.request.body;

  const question = await questionModel.findOne({ _id: id });
  if (question.status == 3) {
    return (ctx.body = Response(0, "发布失败:题目已经被使用"));
  }

  await questionModel.updateOne(
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
    body: doc.body,
    score: doc.score,
    answerTime: doc.answerTime,
    factor:
      doc.type == 3
        ? doc.factor
        : {
            isCase: false,
            isKeywords: false,
            isSpace: false,
            isWidth: false,
          },
    options: [1, 2].includes(doc.type) ? doc.options : [],
    answer: doc.type == 4 ? "" : doc.answer,
    examples: doc.type == 4 ? doc.examples : [],
    type: doc.type,
    level: doc.level,
    status: doc.status,
    files: doc.files ?? [],
  };
  const oldQuestion = await questionModel.findOne({ _id: doc._id });
  if (String(oldQuestion.creator) != userId) {
    return (ctx.body = Response(0, "非法更新"));
  }

  const newQuestion = await questionModel.findOneAndUpdate({ _id: doc._id }, { $set: updateData }, { new: true });

  return (ctx.body = Response(1, "", newQuestion.toJSON()));
};
