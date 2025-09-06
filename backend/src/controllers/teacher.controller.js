import { teacherService } from "../services/teacher.service.js";

export async function listTeachers(req, res) {
  try {
    const result = await teacherService(req).list();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function createTeacher(req, res) {
  try {
    const result = await teacherService(req).create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTeacherById(req, res) {
  try {
    const { id } = req.params;
    const result = await teacherService(req).getById(id);
    if (!result) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateTeacher(req, res) {
  try {
    const { id } = req.params;
    const result = await teacherService(req).update(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;
    const result = await teacherService(req).delete(id);
    if (!result) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTeachersByDepartment(req, res) {
  try {
    const { department } = req.query;
    const result = await teacherService(req).listByDepartment(department);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateTeacherStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await teacherService(req).updateStatus(id, status);
    if (!result) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
