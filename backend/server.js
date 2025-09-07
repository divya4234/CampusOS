import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { notFound, onError } from './src/middleware/errors.js';
import { authRequired, tenantFromHeader } from "./src/middleware/auth.js";
import Admin from "./src/models/Admin.js";
import { createCollegeWithAdmin } from "./src/services/college.service.js";


const app = express();

// Root route for browser visits
app.get('/', (_req, res) => {
  res.send('Backend is running 🚀');
});

// Optional: ignore favicon requests to prevent 404 noise
app.get('/favicon.ico', (_req, res) => res.status(204));

//testing
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


// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://vercel.app',
      process.env.CORS_ORIGIN
    ].filter(Boolean);
    
    // Check if origin is in allowed list or is a vercel.app subdomain
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-College-Id']
};

app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
import collegeRoutes from "./src/routes/college.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import teacherRoutes from "./src/routes/teacher.routes.js";
import studentRoutes from "./src/routes/student.routes.js";
import feeRoutes from "./src/routes/fee.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";

app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);

app.use("/api", authRequired, feeRoutes);
app.use("/api", authRequired, paymentRoutes);


// Error handling
app.use(notFound);
app.use(onError);

export default app;