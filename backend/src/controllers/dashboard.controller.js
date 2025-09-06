// src/controllers/dashboard.controller.js
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import { scoped } from "../utils/scoped.js";

export async function dashboard(req, res, next) {
  try {
    // use scoped counts to enforce tenancy
    const sTeacher = scoped(Teacher, req);
    const sStudent = scoped(Student, req);

    const [teacherCount, studentCount] = await Promise.all([
      sTeacher.count(),
      sStudent.count()
    ]);

    res.json({ teachers: teacherCount, students: studentCount });
  } catch (err) {
    next(err);
  }
}

/**
 * Rule-based recommendations - tiny AI demo
 * Returns simple "study tips" or "recommended courses" based on year/department.
 */
export async function recommendations(req, res, next) {
  try {
    const { department, year } = req.query;
    const tips = [];

    if (!department) {
      tips.push("Provide department to get better recommendations.");
    } else {
      if (department.toLowerCase().includes("cse")) {
        tips.push("Focus on Data Structures & Algorithms for strong fundamentals.");
        tips.push("Try building a small MERN project and deploy it.");
      } else if (department.toLowerCase().includes("ece")) {
        tips.push("Brush up on Signals & Systems and Embedded C.");
      } else {
        tips.push(`Study core subjects of ${department}.`);
      }
    }

    if (year) {
      const y = Number(year);
      if (y <= 1) tips.push("Strengthen mathematics and programming basics.");
      else if (y === 2) tips.push("Start small projects and contribute to open-source.");
      else tips.push("Focus on internships and domain projects.");
    }

    res.json({ recommendations: tips });
  } catch (err) {
    next(err);
  }
}
