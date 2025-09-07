import { attendanceService } from '../services/attendance.service.js';

export async function markAttendance(req, res) {
  try {
    const result = await attendanceService(req).create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentAttendance(req, res) {
  try {
    const { studentId } = req.params;
    const result = await attendanceService(req).getStudentAttendance(studentId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getCourseAttendance(req, res) {
  try {
    const { courseId } = req.params;
    const result = await attendanceService(req).getCourseAttendance(courseId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTeacherAttendance(req, res) {
  try {
    const { teacherId } = req.params;
    const result = await attendanceService(req).getTeacherAttendance(teacherId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateAttendance(req, res) {
  try {
    const { id } = req.params;
    const result = await attendanceService(req).update(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAttendanceReport(req, res) {
  try {
    const { courseId, startDate, endDate } = req.query;
    const result = await attendanceService(req).getAttendanceReport(courseId, startDate, endDate);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
