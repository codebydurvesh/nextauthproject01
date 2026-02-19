import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpirt: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true },
);



export const User = mongoose.models.users || mongoose.model("users", userSchema);

// instead of User, we write users as nextjs runs on edge
// nextjs doesn't know that he is requesting the backend for the first time or not
// For dedicated backend we write User only!