import { Context } from "koa";
import { IQuestion } from "../../mongo/questionSchema";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import testpaperModel from "../../mongo/testpaperSchema";

export default async (ctx: Context) => {
  const { id } = ctx.request.params;

  const detail = await testpaperModel.findOne({ _id: id }).populate("questions", 'title score level type status');
  const data = {
    choiceCount: 0,
    choiceScore: 0,
    multiCount: 0,
    multiScore: 0,
    blankCount: 0,
    blankScore: 0,
    codeCount: 0,
    codeScore: 0,
    allScore: 0
  };
  detail.questions.forEach((question: IQuestion) => {
    if (question.type == 1) {
      data.choiceCount += 1;
      data.choiceScore += question.score;
    } else if (question.type == 2) {
      data.multiCount += 1;
      data.multiScore += question.score;
    } else if (question.type == 3) {
      data.blankCount += 1;
      data.blankScore += question.score;
    } else {
      data.codeCount += 1;
      data.codeScore += question.score;
    }
    data.allScore += question.score;
  });

  return (ctx.body = Response(1, "", { ...detail.toJSON(), ...data }));
};
