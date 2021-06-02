import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";

export const publish = async (ctx: Context) => {
  const { id, status } = ctx.request.body;

  const question = await questionModel.findOne({_id: id});
  if(question.status == 3) {
    return ctx.body = Response(0, '发布失败:题目已经被使用')
  }

  await questionModel.updateOne(
    { _id: id },
    {
      $set: {
        status: status,
      },
    }
  );

  return ctx.body = Response(1, '发布成功')
};
