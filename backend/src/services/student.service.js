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
      return s.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true }
      );
    },
    
    delete: (id) => s.findOneAndDelete({ _id: id }),
    
    listByDepartment: (department) => s.find({ department }),
    
    listByYear: (year) => s.find({ year }),
    
    updateStatus: (id, status) => s.findOneAndUpdate(
      { _id: id },
      { $set: { status } },
      { new: true }
    )
  };
}

