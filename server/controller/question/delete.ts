import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import questionModel from "../../mongo/questionSchema";
import fs from "fs";
import path from "path";
import { config } from "../../config";
import Logger from "../../logs";

export default async (ctx: Context) => {
  const { id } = ctx.request.body;

  const question = await questionModel.findOne({ _id: id });
  if (!question) {
    return (ctx.body = Response(0, "题目不存在"));
  } else if (question.status == 3) {
    return (ctx.body = Response(0, "题目已被使用,无法删除"));
  }
  await questionModel.remove({ _id: id });
  if (question.files && question.files.length != 0) {
    question.files.map((file) => {
      const filePath = path.join(config.publicStatic, "questionFiles", file.path);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(`删除文件失败: ${filePath}`);
          Logger.log("APP", err.stack, "error");
        }
      });
    });
  }

  return (ctx.body = Response(1, "删除成功"));
};
