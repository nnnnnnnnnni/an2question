import mongoose, { ObjectId, Document } from "mongoose";
import { IQuestion } from "./questionSchema";
import { ITestPaper } from "./testpaperSchema";
const { ObjectId } = mongoose.Types;

const bindSchema = new mongoose.Schema(
  {
    exam: {
      type: ObjectId,
      ref: "exam",
    },
    testpaper: {
      type: ObjectId,
      ref: "testpaper",
    },
    question: {
      type: ObjectId,
      ref: "question",
    },
    inviter: {
      type: ObjectId,
      ref: "user",
    },
    bindUser: {
      type: ObjectId,
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

export interface IBind extends Document {
  exam?: ObjectId;
  testpaper?: ObjectId | ITestPaper;
  question?: ObjectId | IQuestion;
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default mongoose.model<IBind>("bind", bindSchema);
