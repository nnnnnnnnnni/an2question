import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;

export default async (ctx: Context) => {
  const requestFiles = ctx.request.files;
  const files = requestFiles['files[]'];
  console.log(files)
  await Utils.HandleUpload(files, 'question')
  return ctx.body = Response(1, '', files)
};
