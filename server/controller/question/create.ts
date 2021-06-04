import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";

export default async (ctx: Context) => {
  const doc = ctx.request.body;

  const insertData = {
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
    examples: doc.type == 3 ? doc.examples : [],
    type: doc.type,
    level: doc.level,
    status: doc.status,
    files: doc.files??[]
  };

  const newQuestion = await questionModel.create(insertData);

  return (ctx.body = Response(1, "", newQuestion.toJSON()));
};
