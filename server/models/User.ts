import mongoose, { Schema, Document} from "mongoose";
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  role: string
}
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
