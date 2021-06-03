import mongoose from "mongoose";
import { IUser } from "./models";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    avator: String,
    password: String,
    secret: String,
    lastLogin: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

userSchema.index({ email: 1, phone: 1 });

export default mongoose.model<IUser>("user", userSchema);
