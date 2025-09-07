import { createPaymentForStudent, getPaymentHistoryByStudent } from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const payment = await createPaymentForStudent(req.body, req.tenantId);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await getPaymentHistoryByStudent(req.params.studentId, req.tenantId);
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
