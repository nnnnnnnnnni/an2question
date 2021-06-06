import mongoose, { ObjectId, Document } from "mongoose";
import { IQuestion } from "./questionSchema";
import { ITestPaper } from "./testpaperSchema";
const { ObjectId } = mongoose.Types;

const bindSchema = new mongoose.Schema(
  {
    competition: {
      type: ObjectId,
      ref: "competition",
    },
    testpaper: {
      type: ObjectId,
      ref: "testpaper",
    },
    question: {
      type: ObjectId,
      ref: "question",
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export interface IBind extends Document {
  competition?: ObjectId;
  testpaper?: ObjectId | ITestPaper;
  question?: ObjectId | IQuestion;
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default mongoose.model("bind", bindSchema);