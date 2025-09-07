import { createFeeService, getFeesByStudent, getDuesByStudent } from "../services/fee.service.js";
import Fee from "../models/Fee.js";

export const createFeeController = async (req, res) => {
  try {
    const fee = await createFeeService(req.body, req.tenantId);
    res.status(201).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFees = async (req, res) => {
  try {
    const fees = await getFeesByStudent(req.params.studentId, req.tenantId);
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDues = async (req, res) => {
  try {
    const dues = await getDuesByStudent(req.params.studentId, req.tenantId);
    res.json(dues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
