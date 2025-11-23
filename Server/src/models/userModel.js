import mongoose from "mongoose";

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
    enum: ["regular", "admin"],
    default: "regular",
  },

  apiKey: {
    type: String,
    default: null,
  }
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
