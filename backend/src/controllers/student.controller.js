import { studentService } from "../services/student.service.js";

export async function listStudents(req, res) {
  try {
    const result = await studentService(req).list();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function createStudent(req, res) {
  try {
    const result = await studentService(req).create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentById(req, res) {
  try {
    const { id } = req.params;
    const result = await studentService(req).getById(id);
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const result = await studentService(req).update(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const result = await studentService(req).delete(id);
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentsByDepartment(req, res) {
  try {
    const { department } = req.query;
    const result = await studentService(req).listByDepartment(department);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentsByYear(req, res) {
  try {
    const { year } = req.query;
    const result = await studentService(req).listByYear(year);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateStudentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await studentService(req).updateStatus(id, status);
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentCourse(req, res) {
  try {
    const { id } = req.params;
    const student = await studentService(req).getById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ course: student.course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentGrade(req, res) {
  try {
    const { id } = req.params;
    const student = await studentService(req).getById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ grade: student.grade });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}