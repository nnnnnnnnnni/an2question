import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import testpaperModel from "../../mongo/testpaperSchema";
import questionModel from "../../mongo/questionSchema";
import bindModel from "../../mongo/bindSchema";
import fs from "fs";
import path from "path";
import { config } from "../../config";
import Logger from "../../logs";
import { ObjectId } from "mongoose";

export default async (ctx: Context) => {
  const { id } = ctx.request.body;

  const testpaper = await testpaperModel.findOne({ _id: id });
  if (!testpaper) {
    return (ctx.body = Response(0, "试卷不存在"));
  } else if (testpaper.status == 3) {
    return (ctx.body = Response(0, "试卷已被使用,无法删除"));
  }
  const binds = await bindModel.aggregate([
    { $match: { question: { $in: testpaper.questions } } },
    { $group: { _id: "$question", total: { $sum: 1 } } }
  ]);
  const delAndUpdateIds: ObjectId[] = [];
  binds.forEach((bind) => {
    if (bind.total == 1) {
      delAndUpdateIds.push(bind._id);
    }
  });
  await Promise.all([
    testpaperModel.remove({ _id: id }),
    bindModel.deleteMany({ testpaper: id, question: { $in: testpaper.questions } }),
    questionModel.updateMany({ _id: { $in: delAndUpdateIds } }, { $set: { status: 2 } }),
  ]);
  if (testpaper.files && testpaper.files.length != 0) {
    testpaper.files.map((file) => {
      const filePath = path.join(config.publicStatic, file.path);
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
