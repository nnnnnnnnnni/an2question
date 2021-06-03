import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;

export default async (ctx: Context) => {
  const requestFiles = ctx.request.files;
  const files = requestFiles["files[]"];
  const filesArr = Object.prototype.toString.call(files) == "[object Array]" ? files : [files];
  try {
    const destFiles = await Utils.HandleUpload(filesArr, "question");
    return (ctx.body = Response(1, "", destFiles));
  } catch (error) {
    return (ctx.body = Response(0, "文件保存错误", []));
  }
};
