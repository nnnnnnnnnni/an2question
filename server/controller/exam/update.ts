import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import examModel from "../../mongo/examSchema";

export const publish = async (ctx: Context) => {
  const { id, status } = ctx.request.body;

  const exam = await examModel.findOne({ _id: id });
  if ([3, 4].includes(exam.status)) {
    return (ctx.body = Response(0, "取消发布失败:考试已经开始"));
  }

  await examModel.updateOne(
    { _id: id },
    {
      $set: {
        status: status,
      },
    }
  );

  return (ctx.body = Response(1, "发布成功"));
};

// export const update = async (ctx: Context) => {
//   const doc = ctx.request.body;
//   const userId = ctx.session.user._id;

//   const updateData = {
//     title: doc.title,
//     body: doc.body,
//     score: doc.score,
//     answerTime: doc.answerTime,
//     factor:
//       doc.type == 3
//         ? doc.factor
//         : {
//             isCase: false,
//             isKeywords: false,
//             isSpace: false,
//             isWidth: false,
//           },
//     options: [1, 2].includes(doc.type) ? doc.options : [],
//     answer: doc.type == 4 ? "" : doc.answer,
//     examples: doc.type == 4 ? doc.examples : [],
//     type: doc.type,
//     level: doc.level,
//     status: doc.status,
//     files: doc.files ?? [],
//   };
//   const oldexam = await examModel.findOne({ _id: doc._id });
//   if (String(oldexam.creator) != userId) {
//     return (ctx.body = Response(0, "非法更新"));
//   }

//   const newexam = await examModel.findOneAndUpdate({ _id: doc._id }, { $set: updateData }, { new: true });

//   return (ctx.body = Response(1, "", newexam.toJSON()));
// };
