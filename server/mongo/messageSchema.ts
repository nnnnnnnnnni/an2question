import mongoose, { ObjectId, Document } from "mongoose";
import { IUser } from "./userSchema";
const { ObjectId } = mongoose.Types;

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: ObjectId,
      ref: 'user'
    },
    to: {
      type: ObjectId,
      ref: 'user'
    },
    message: String,
    needconfirm: Boolean
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export interface IMessage extends Document {
  from?: (IUser | ObjectId);
  to?: (IUser | ObjectId);
  message: string;
  needConfirm: boolean;
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default mongoose.model<IMessage>("message", messageSchema);