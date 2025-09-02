import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();
app.use(express.json());

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://handykruu.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
