import { Context } from "koa";
import { Session } from "koa-session";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import userModel from "../../mongo/userSchema";
import _ from "lodash";
import { IUser } from "mongo/models";
import crypto from "crypto";

export const setting = async (ctx: Context) => {
  const { name } = ctx.request.body;
  const user = (ctx.session as Session).user;
  const newUser = (await userModel.findOneAndUpdate({ _id: user._id }, { $set: { name: name } }, { new: true })) as IUser;
  (ctx.session as Session).user = _.omit(newUser.toJSON(), ["secret", "password"]);
  return (ctx.body = Response(1, "修改成功", newUser));
};

export const password = async (ctx: Context) => {
  const { oldPass, newPass } = ctx.request.body;
  const user = (ctx.session as Session).user;
  const _user = (await userModel.findOne({ _id: user._id })) as IUser;
  const _pass = crypto.createHmac("sha512", oldPass).update(_user.secret).digest("hex");
  if (_pass != _user.password) {
    return (ctx.body = Response(0, "旧密码错误,请重新输入"));
  }
  if (newPass.length < 6) {
    return (ctx.body = Response(0, "密码强度过低"));
  }
  await userModel.updateOne({ _id: user._id }, { $set: { password: crypto.createHmac("sha512", newPass).update(_user.secret).digest("hex") } });
  ctx.session = null;
  return (ctx.body = Response(1, "密码修改成功,请重新登录"));
};
