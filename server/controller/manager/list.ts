import { Context } from "koa";
import Utils from "../../lib/utils";
const Response = Utils.generateResponse;
import bindModel from "../../mongo/bindSchema";
import userModel from "../../mongo/userSchema";
import _ from "lodash";
import moment from "moment";

export default async (ctx: Context) => {
  const { page, count, key }: any = ctx.request.query;
  const userId = ctx.session.user._id;

  const conds = {
    inviter: userId,
  };

  const _page = page ? Number(page) : 1;
  const _count = count ? Number(count) : 10;

  if (key) {
    const allBindUsers = await bindModel.distinct("bindUser", conds);
    const filterUser = await userModel
      .find({
        _id: { $in: allBindUsers },
        $or: [{ name: { $regex: key, $options: "i" } }, { email: { $regex: key, $options: "i" } }],
      })
      .select("name avator email phone createAt")
      .sort({ createAt: -1 })
      .skip((Number(_page) - 1) * Number(_count))
      .limit(Number(_count));
    const total = await userModel.countDocuments({
      _id: { $in: allBindUsers },
      $or: [{ name: { $regex: key, $options: "i" } }, { email: { $regex: key, $options: "i" } }],
    });
    return (ctx.body = Response(1, "", { binds: filterUser, total: total }));
  } else {
    const binds = await bindModel
      .find(conds)
      .populate("bindUser", "name avator email phone createAt")
      .sort({ createAt: -1 })
      .skip((Number(_page) - 1) * Number(_count))
      .limit(Number(_count));

    const _binds = binds.map((bind) => {
      return {
        createAt: moment(bind.createAt).format("YYYY-MM-DD HH:mm:ss"),
        ...bind.toJSON().bindUser,
      };
    });

    const total = await bindModel.countDocuments(conds);

    return (ctx.body = Response(1, "", { binds: _binds, total: total }));
  }
};
