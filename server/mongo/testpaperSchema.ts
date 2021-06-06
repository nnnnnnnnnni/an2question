import mongoose, { Document } from "mongoose";
import { IQuestion } from "./questionSchema";

const testpaperShema = new mongoose.Schema(
  {
    title: String,
    files: [
      {
        name: String,
        path: String,
      },
    ],
    status: Number,
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
  files: { name: string; path: string }[]; // 试卷所有文件
  status: Number; // 1: 未发布 2: 已发布  3: 已使用
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default mongoose.model<IQuestion>("testpaper", testpaperShema);
