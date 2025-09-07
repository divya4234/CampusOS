import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenant.plugin.js';

const gradeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    required: true,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
  },
  remarks: String,
  submissionDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

gradeSchema.plugin(tenantPlugin);

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;
