import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import crypto from "crypto";
import userModel, { IUserSchema } from "../../mongo/userSchema";
import bindModel from "../../mongo/bindSchema";
import _ from "lodash";

export default async (ctx: Context) => {
  const { name, count, password } = ctx.request.body;
  const accounts = [];
  for (let i = 0; i < count; i++) {
    accounts.push(`${name}${i}@qq.com`);
  }

  const ownedAccounts = await userModel.countDocuments({ email: { $in: accounts } });
  if (ownedAccounts > 0) {
    return (ctx.body = Response(0, "含有已存在账号,建议更换前缀"));
  }

  const insertUsers: IUserSchema[] = [];
  accounts.forEach((mail) => {
    const secret = Utils.randomString();
    insertUsers.push({
      secret: secret,
      avator: `/default_avator${Utils.random(7)}.png`,
      password: crypto.createHmac("sha512", password).update(secret).digest("hex"),
      name: `ys_${ctx.session.user.name}_${Utils.randomString(10)}`,
      email: mail,
    });
  });

  const newUsers = await userModel.insertMany(insertUsers);
  const interBinds = newUsers.map((user) => {
    return {
      inviter: ctx.session.user._id,
      bindUser: user._id
    }
  });
  await bindModel.insertMany(interBinds)

  return (ctx.body = Response(1, "新建成功，请刷新页面！"));
};
