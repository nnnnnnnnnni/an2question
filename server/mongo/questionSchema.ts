import { ObjectId, Document, model, SchemaTypes, Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: String,
    body: String,
    score: Number,
    answerTime: {
      type: Number,
      default: 1,
    },
    factor: {
      isSpace: Boolean,
      isCase: Boolean,
      isKeywords: Boolean,
      isWidth: Boolean,
    },
    options: [
      {
        key: String,
        val: String,
      },
    ],
    answer: String,
    examples: [
      {
        input: String,
        output: String,
      },
    ],
    type: Number,
    level: Number,
    status: Number,
    files: [
      {
        name: String,
        path: String,
      },
    ],
    creator: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
questionSchema.index({ title: 1, type: 1 });

export interface IQuestion extends Document {
  title: string; // 题目标题
  body: string; // 正文描述
  score: number; // 分数
  answerTime: {
    // 可答题次数
    type: number;
    default: 1;
  };
  factor: {
    // 判题因素
    isSpace: boolean;
    isCase: boolean;
    isKeywords: boolean;
    isWidth: boolean;
  };
  options: [
    // 选择题选项
    {
      key: string;
      val: string;
    }
  ];
  answer: string; // 正确答案
  examples: [
    // 代码题代码示例
    {
      input: string;
      output: string;
    }
  ];
  type: number; // 1: 选择   2: 多选   3: 填空   4: 代码
  level: number; // 1: 初级   2: 普通   3: 困难
  status: number; // 1: 未发布 2: 已发布  3: 已使用
  files: { name: string; path: string }[]; //  题目附件
  creator: ObjectId; // 题目创建者
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default model<IQuestion>("question", questionSchema);
