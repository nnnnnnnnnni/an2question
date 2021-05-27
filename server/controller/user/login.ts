import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import crypto from "crypto";
import userModel from "../../mongo/userSchema";
import { config } from "../../config";
import jwt from '../../lib/jwt';
import _ from 'lodash';

export default async (ctx: Context) => {
  const { email, password } = ctx.request.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return ctx.body = Response(0, "账号不存在");
  }
  const _password = crypto
    .createHmac("sha512", password)
    .update(user.secret)
    .digest("hex");
  if (_password != user.password) {
    return ctx.body = Response(0, "密码不正确");
  }
  const _user = _.omit(user.toJSON(), ['secret','password']);
  if (config.jwtOrSession.authFunc == "jwt") {
    const token = jwt.generate(_user as any);
    return (ctx.body = Response(1, "登录成功", { token: token }));
  } else {
    ctx.session.user = _user as any;
    return (ctx.body = Response(1, "登录成功", _user));
  }
};
