import { ObjectId, Document, Schema, model, SchemaTypes } from "mongoose";
import { IUser } from "./userSchema";

const messageSchema = new Schema(
  {
    from: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    to: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    message: String,
    needconfirm: Boolean,
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export interface IMessage extends Document {
  from?: IUser | ObjectId;
  to?: IUser | ObjectId;
  message: string;
  needConfirm: boolean;
  createAt: Date | string | number;
  updateAt: Date | string | number;
}

export default model<IMessage>("message", messageSchema);
