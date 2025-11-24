import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
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

  numOfApiCallsLeft: {
    type: Number,
    default: 20,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  apiKey: {
    type: String,
    default: null,
  }
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
