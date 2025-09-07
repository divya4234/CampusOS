import Teacher from "../models/Teacher.js";
import { scoped } from "../utils/scoped.js";

export function teacherService(req) {
  const s = scoped(Teacher, req);

  return {
    list: () => s.find(),

    getById: (id) => s.findOne({ _id: id }),

    create: async (data) => {
      const teacher = new Teacher({ ...data, collegeId: req.tenantId });
      if (data.password) {
        await teacher.setPassword(data.password);
      }
      return teacher.save();
    },

    update: async (id, data) => {
      const updateData = { ...data };
      if (data.password) {
        const teacher = new Teacher();
        await teacher.setPassword(data.password);
        updateData.passwordHash = teacher.passwordHash;
        delete updateData.password;
      }
      return Teacher.findOneAndUpdate(
        { _id: id, collegeId: req.tenantId }, // enforce tenant scope
        { $set: updateData },
        { new: true }
      );
    },

    delete: async (id) => {
      return Teacher.findOneAndDelete(
        { _id: id, collegeId: req.tenantId } // enforce tenant scope
      );
    },

    listByDepartment: (department) => s.find({ department }),

    updateStatus: async (id, status) => {
      return Teacher.findOneAndUpdate(
        { _id: id, collegeId: req.tenantId }, // enforce tenant scope
        { $set: { status } },
        { new: true }
      );
    }
  };
}
