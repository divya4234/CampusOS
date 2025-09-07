import mongoose from "mongoose";
import tenantPlugin from "./plugins/tenant.plugin.js";

const PaymentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    method: { type: String, enum: ["cash", "card", "netbanking", "upi"], required: true }

  },
  { timestamps: true }
);

PaymentSchema.plugin(tenantPlugin);
export default mongoose.model("Payment", PaymentSchema);
