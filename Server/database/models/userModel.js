import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    token_left: {
        type: Number,
        default: 20
    },

    user_type: {
        type: String,
        enum: ['regular', 'admin'],
        default: 'regular'
    }
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;



