import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { notFound, onError } from './middleware/errors.js';
import { authRequired, tenantFromHeader } from "./middleware/auth.js";
import Admin from "./models/Admin.js";
import { createCollegeWithAdmin } from "./services/college.service.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import authRoutes from "./routes/auth.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import gradeRoutes from "./routes/grade.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import hostelRoutes from "./routes/hostel.routes.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Register all routes
app.use("/api/auth", authRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Academic Management Routes
app.use("/api", attendanceRoutes);
app.use("/api", gradeRoutes);
app.use("/api", libraryRoutes);

// Hostel Management Routes
app.use("/api", hostelRoutes);

// Development-only routes
if (process.env.NODE_ENV === 'development') {
  app.get("/test-tenant", tenantFromHeader, (req, res) => {
    res.json({ tenantId: req.tenantId });
  });

  app.post("/test-create-admin", async (req, res) => {
    try {
      const admin = new Admin({
        name: "Test Admin",
        email: "test@iwe.edu",
        collegeId: "abc123"
      });
      await admin.setPassword("pass123");
      await admin.save();
      res.json({ id: admin._id, email: admin.email, collegeId: admin.collegeId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/test-create-college", async (req, res) => {
    try {
      const result = await createCollegeWithAdmin({
        name: "Indian Web Engg College",
        code: "IWE",
        adminName: "Vineeth",
        adminEmail: "vineeth@iwe.edu",
        adminPassword: "admin123"
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}


// Error handling
app.use(notFound);
app.use(onError);

export default app;