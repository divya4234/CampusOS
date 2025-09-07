import mongoose from "mongoose";
import tenantPlugin from "./plugins/tenant.plugin.js";

const FeeSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" }
  },
  { timestamps: true }
);

FeeSchema.plugin(tenantPlugin);
export default mongoose.model("Fee", FeeSchema);
