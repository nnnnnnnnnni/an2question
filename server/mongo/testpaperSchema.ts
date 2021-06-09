import mongoose, { ObjectId, Document } from "mongoose";
import { IQuestion } from "./questionSchema";
import { IUser } from "./userSchema";
const { ObjectId } = mongoose.Types;

const testpaperShema = new mongoose.Schema(
  {
    title: String,
    questions: [
      {
        type: ObjectId,
        ref: "question",
      },
    ],
    files: [
      {
        name: String,
        path: String,
      },
    ],
    status: Number,
    creator: {
      type: ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export interface ITestPaper extends Document {
  title: string; // 试卷名字
  questions: (ObjectId | IQuestion)[];
  files: { name: string; path: string }[]; // 试卷所有文件
  status: Number; // 1: 未发布 2: 已发布  3: 已使用
  creator: ObjectId | IUser; // 试卷创建者
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default mongoose.model<ITestPaper>("testpaper", testpaperShema);
