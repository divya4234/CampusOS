import { connectDB } from './src/config/db.js';
import app from './src/server.js';
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
