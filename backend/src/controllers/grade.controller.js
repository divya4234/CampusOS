import { gradeService } from '../services/grade.service.js';

export async function submitGrade(req, res) {
  try {
    const result = await gradeService(req).create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentGrades(req, res) {
  try {
    const { studentId } = req.params;
    const result = await gradeService(req).getStudentGrades(studentId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getCourseGrades(req, res) {
  try {
    const { courseId } = req.params;
    const result = await gradeService(req).getCourseGrades(courseId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateGrade(req, res) {
  try {
    const { id } = req.params;
    const result = await gradeService(req).update(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Grade record not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getGradeReport(req, res) {
  try {
    const { courseId, semester } = req.query;
    const result = await gradeService(req).getGradeReport(courseId, semester);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getGradeStatistics(req, res) {
  try {
    const { courseId } = req.params;
    const result = await gradeService(req).getGradeStatistics(courseId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
