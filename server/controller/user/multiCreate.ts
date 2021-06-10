import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import crypto from "crypto";
import userModel from "../../mongo/userSchema";
import _ from "lodash";

export default async (ctx: Context) => {
  const { name, password, total } = ctx.request.body;
  const usernames: string[] = [];
  for (let i = 1; i <= total; i++) {
    usernames.push(`${name}${i}@qq.com`);
  }
  const users = await userModel.find({ email: { $in: usernames } });
  if (users && users.length > 0) {
    return (ctx.body = Response(0, "账号重复,请重新输入"));
  }
  const insertData = usernames.map((name: string) => {
    const secret = Utils.randomString();
    return {
      secret: secret,
      email: name,
      avator: `/default_avator${Utils.random(6)}.png`,
      password: crypto.createHmac("sha512", password).update(secret).digest("hex"),
      name: `name`,
      creator: ctx.session.user._id
    };
  });

  const newusers = await userModel.insertMany(insertData);
};
