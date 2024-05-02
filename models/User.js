import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      enum: ["male", "female"],
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "CUSTOMER"],
      default: "CUSTOMER",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
