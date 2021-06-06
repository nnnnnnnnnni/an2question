import { Document, ObjectId } from "mongoose";
export interface IUser extends Document {
  avator: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  secret: string;
  createAt: string;
  updateAt: string;
  lastLogin?: Date;
}
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
  creator: ObjectId;  // 题目创建者
}
