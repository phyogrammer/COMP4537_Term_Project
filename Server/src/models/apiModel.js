import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const apiStats = new Schema({
  method: {
    type: String,
    required: true,
  },

  endpoint: {
    type: String,
    required: true,
  },

  requests: {
    type: Number,
    default: 0
  },
});

const ApiStats = mongoose.model("api_stats", apiStats);

export default ApiStats;
