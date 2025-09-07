import Fee from "../models/Fee.js";

export async function getFeesByStudent(studentId, collegeId) {
  return Fee.find({ studentId, collegeId });
}

export async function getDuesByStudent(studentId, collegeId) {
  return Fee.find({ studentId, collegeId, status: "pending" });
}

export async function createFeeService(data, collegeId) {
  const fee = new Fee({ ...data, collegeId });
  return fee.save();
}

