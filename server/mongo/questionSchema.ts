import mongoose from "mongoose";
import { IQuestion } from "./models";

const questionSchema = new mongoose.Schema(
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
    options: [{
      key: String,
      val: String
    }],
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
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

questionSchema.index({ title: 1, type: 1 });

export default mongoose.model<IQuestion>("question", questionSchema);
