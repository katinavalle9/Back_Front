import { connect } from "./config/database.js";
import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;

connect();

const api = express();
api.use(express.json());
api.use(cors());

// Aqui van las rutas
api.use("/api/v1/items", itemRoutes);
api.use("/api/v1", authRoutes);

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});
