import mongoose from "mongoose";
import { IQuestion } from "./models";

const testPaper = new mongoose.Schema(
  {
    name: String,
    questions: [String],
    allSocre: Number,
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

export default mongoose.model<IQuestion>("testPaper", testPaper);
