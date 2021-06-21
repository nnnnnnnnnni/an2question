import { ObjectId, Document, SchemaTypes, Schema, model } from "mongoose";
import { IQuestion } from "./questionSchema";
import { ITestPaper } from "./testpaperSchema";
import { IUser } from "./userSchema";

const bindSchema = new Schema(
  {
    exam: {
      type: SchemaTypes.ObjectId,
      ref: "exam",
    },
    testpaper: {
      type: SchemaTypes.ObjectId,
      ref: "testpaper",
    },
    question: {
      type: SchemaTypes.ObjectId,
      ref: "question",
    },
    inviter: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    bindUser: {
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

export interface IBind extends Document {
  exam?: ObjectId;
  testpaper?: ObjectId | ITestPaper;
  question?: ObjectId | IQuestion;
  inviter?: ObjectId | IUser;
  bindUser?: ObjectId | IUser;
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default model<IBind>("bind", bindSchema);
