import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import crypto from "crypto";
import userModel from "../../mongo/userSchema";
import jwt from "../../lib/jwt";
import { config } from "../../config";
import _ from "lodash";

export default async (ctx: Context) => {
  const { email, phone, password } = ctx.request.body;
  if (password.length < 6) {
    return (ctx.body = Response(0, "密码强度过低"));
  }
  const secret = Utils.randomString();
  const registerUser: any = {
    secret: secret,
    avator: "/default_avator.png",
    password: crypto.createHmac("sha512", password).update(secret).digest("hex"),
  };
  if (email && Utils.isEmail(email)) {
    const count = await userModel.countDocuments({email: email});
    if(count > 0) {
      return ctx.body = Response(0, '邮箱已被注册')
    }
    registerUser.email = email;
  } else if (phone && Utils.isPhone(phone)) {
    const count = await userModel.countDocuments({phone: phone});
    if(count > 0) {
      return ctx.body = Response(0, '手机号已被注册')
    }
    registerUser.phone = phone;
  } else {
    return ctx.body = Response(0, '注册失败: 缺少必要参数');
  }
  const user = await userModel.create(registerUser);
  const _user = _.omit(user.toJSON(), ['secret','password'])
  if (config.jwtOrSession.authFunc == "jwt") {
    const token = jwt.generate(_user as any);
    return (ctx.body = Response(1, "注册成功", { token: token }));
  } else {
    ctx.session.user = registerUser;
    return (ctx.body = Response(1, "注册成功", _user));
  }
};
