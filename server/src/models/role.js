import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      require: [true, "Require role name"],
    },
    wage: { 
      type: Number, 
      require: [true, "Require wage"] 
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", roleSchema);
