import Payment from "../models/Payment.js";
import Fee from "../models/Fee.js";

export async function createPaymentForStudent(data, collegeId) {
  const payment = new Payment({ ...data, collegeId });
  await payment.save();

  // Mark the first pending fee as paid
  await Fee.findOneAndUpdate(
    { studentId: payment.studentId, status: "pending", collegeId },
    { $set: { status: "paid" } }
  );

  return payment;
}

export async function getPaymentHistoryByStudent(studentId, collegeId) {
  return Payment.find({ studentId, collegeId });
}


