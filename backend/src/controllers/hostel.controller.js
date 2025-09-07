import { hostelService } from '../services/hostel.service.js';

// Hostel Management
export async function createHostel(req, res) {
  try {
    const result = await hostelService(req).createHostel(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateHostel(req, res) {
  try {
    const { id } = req.params;
    const result = await hostelService(req).updateHostel(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listHostels(req, res) {
  try {
    const result = await hostelService(req).listHostels();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Room Management
export async function addRoom(req, res) {
  try {
    const result = await hostelService(req).addRoom(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateRoom(req, res) {
  try {
    const { id } = req.params;
    const result = await hostelService(req).updateRoom(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listRooms(req, res) {
  try {
    const { hostelId } = req.params;
    const result = await hostelService(req).listRooms(hostelId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Room Allocation
export async function allocateRoom(req, res) {
  try {
    const result = await hostelService(req).allocateRoom(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deallocateRoom(req, res) {
  try {
    const { allocationId } = req.params;
    const result = await hostelService(req).deallocateRoom(allocationId);
    if (!result) {
      return res.status(404).json({ error: "Allocation not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentAllocation(req, res) {
  try {
    const { studentId } = req.params;
    const result = await hostelService(req).getStudentAllocation(studentId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Complaints
export async function fileComplaint(req, res) {
  try {
    const result = await hostelService(req).fileComplaint(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateComplaint(req, res) {
  try {
    const { id } = req.params;
    const result = await hostelService(req).updateComplaint(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listComplaints(req, res) {
  try {
    const { hostelId, status } = req.query;
    const result = await hostelService(req).listComplaints(hostelId, status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentComplaints(req, res) {
  try {
    const { studentId } = req.params;
    const result = await hostelService(req).getStudentComplaints(studentId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
