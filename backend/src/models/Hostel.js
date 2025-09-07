import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenant.plugin.js';

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  warden: {
    name: String,
    contact: String,
    email: String
  }
}, {
  timestamps: true
});

const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['single', 'double', 'triple'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  occupiedBeds: {
    type: Number,
    default: 0
  },
  floor: Number,
  status: {
    type: String,
    enum: ['available', 'full', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true
});

const allocationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  fee: {
    amount: Number,
    paid: Boolean,
    lastPaidDate: Date
  }
}, {
  timestamps: true
});

const complaintSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  type: {
    type: String,
    enum: ['maintenance', 'cleanliness', 'security', 'food', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  resolution: String,
  resolvedDate: Date
}, {
  timestamps: true
});

hostelSchema.plugin(tenantPlugin);
roomSchema.plugin(tenantPlugin);
allocationSchema.plugin(tenantPlugin);
complaintSchema.plugin(tenantPlugin);

export const Hostel = mongoose.model('Hostel', hostelSchema);
export const Room = mongoose.model('Room', roomSchema);
export const Allocation = mongoose.model('Allocation', allocationSchema);
export const Complaint = mongoose.model('Complaint', complaintSchema);
