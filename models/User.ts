import mongoose, { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema({
    name: {
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
    role:
    {
        type: String,
        enum: {
            values: ["client", "admin"],
            message: "{VALUE} is not a valid role",
            default: "client",
            required: true,
        }
    }
}, {
    timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;
