import { Document } from "mongoose";
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
  options: {
    // 选择题选项
    isSpace: boolean;
    isCase: boolean;
    isKeywords: boolean;
  };
  answer: string; // 正确答案
  examples: [
    // 代码示例
    {
      input: string;
      output: string;
    }
  ];
  type: number; // 1: 选择   2: 多选   3: 填空   4: 代码
  level: number; // 1: 初级   2: 普通   3: 困难
  status: number; // 1: 未发布 2: 已发布  3: 未使用 4: 已使用
}