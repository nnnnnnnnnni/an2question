import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import bindModel from "../../mongo/bindSchema";
import _ from "lodash";
import moment from "moment";

export default async (ctx: Context) => {
  const { page, count }: any = ctx.request.query;
  const userId = ctx.session.user._id;

  const conds = {
    inviter: userId,
  };

  const _page = page ? Number(page) : 1;
  const _count = count ? Number(count) : 10;

  const binds = await bindModel
    .find(conds)
    .populate("bindUser", "name avator email phone")
    .sort({ createAt: -1 })
    .skip((Number(_page) - 1) * Number(_count))
    .limit(Number(_count));

  const _binds = binds.map((bind) => {
    return {
      createAt: moment(bind.createAt).format('YYYY-MM-DD HH:mm:ss'),
      ..._.omit(bind.toJSON().bindUser, '_id')
    };
  });

  const total = await bindModel.countDocuments(conds);

  return (ctx.body = Response(1, "", {binds: _binds, total: total}));
};
