import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenant.plugin.js';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  copies: {
    type: Number,
    required: true,
    min: 0
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    shelf: String,
    row: String,
    section: String
  }
}, {
  timestamps: true
});

const bookIssueSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: Date,
  fine: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['issued', 'returned', 'overdue'],
    default: 'issued'
  }
}, {
  timestamps: true
});

bookSchema.plugin(tenantPlugin);
bookIssueSchema.plugin(tenantPlugin);

export const Book = mongoose.model('Book', bookSchema);
export const BookIssue = mongoose.model('BookIssue', bookIssueSchema);
