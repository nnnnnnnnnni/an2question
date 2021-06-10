import mongoose, { Document, ObjectId } from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
    },
    phone: {
      type: String,
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

export interface IUser extends Document {
  avator: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  secret: string;
  createAt: Date | string | number;
  updateAt: Date | string | number;
  lastLogin?: Date;
}

export default mongoose.model<IUser>("user", userSchema);
