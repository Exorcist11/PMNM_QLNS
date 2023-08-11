import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      require: [true, "Require role name"],
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", roleSchema);
