import { ObjectId, Document, Schema, model, SchemaTypes } from "mongoose";
import { ITestPaper } from "./testpaperSchema";
import { IUser } from "./userSchema";

const bindSchema = new Schema(
  {
    title: String,
    creator: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    status: Number,
    type: Number,
    testpaper: {
      type: SchemaTypes.ObjectId,
      ref: "testpaper",
    },
    participants: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    times: Number,
    startAt: Date,
    closeAt: Date,
    note: String,
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export interface IBind extends Document {
  title: string; // 标题
  status: number; // 1: 未发布 2: 待开始  3: 进行中  4: 已结束
  type: number; // 1: 固定时间点  2: 固定时间段
  testpaper: ITestPaper | ObjectId; // 所用试卷
  participants: (ObjectId | IUser)[]; // 参赛者
  note: string; // 备注
  creator: ObjectId | IUser; // 比赛创建者
  times: number; // 固定时间段的持续时间
  startAt?: Date | string | number;
  closeAt?: Date | string | number;
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default model<IBind>("bind", bindSchema);