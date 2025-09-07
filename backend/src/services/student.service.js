import Student from "../models/Student.js";
import { scoped } from "../utils/scoped.js";

export function studentService(req) {
  const s = scoped(Student, req);

  return {
    list: () => s.find(),

    getById: (id) => s.findOne({ _id: id }),

    create: async (data) => {
      const student = new Student({ ...data, collegeId: req.tenantId });
      if (data.password) {
        await student.setPassword(data.password);
      }
      return student.save();
    },

    update: async (id, data) => {
      const updateData = { ...data };

      if (data.password) {
        const student = new Student();
        await student.setPassword(data.password);
        updateData.passwordHash = student.passwordHash;
        delete updateData.password;
      }

      return Student.findOneAndUpdate(
        { _id: id, collegeId: req.tenantId }, // ✅ enforce tenant scope
        { $set: updateData },
        { new: true }
      );
    },

    delete: async (id) => {
      return Student.findOneAndDelete(
        { _id: id, collegeId: req.tenantId } // ✅ enforce tenant scope
      );
    },

    listByDepartment: (department) => s.find({ department }),

    listByYear: (year) => s.find({ year: Number(year) }),

    updateYear: async (id, year) => {
      return Student.findOneAndUpdate(
        { _id: id, collegeId: req.tenantId },
        { $set: { year } },
        { new: true }
      );
    }
  };
}
