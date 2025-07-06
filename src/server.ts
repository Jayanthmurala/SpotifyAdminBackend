import express from "express";
import dotenv from "dotenv";
import initDB from "./db/config/tabesl.init.js";
import adminRoutes from "./routes/route.js";
import redisClient from "./redis/redis.setup.js";
import cors from "cors";
const PORT = process.env.PORT || 9000;
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// Routes
app.use("/api/v1", adminRoutes);

//Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Spotify 🎧 Admin Server🫡.");
});

//Redis connection
redisClient
  .connect()
  .then(() => {
    console.log("Redis connection established successfully.");
  })
  .catch((error) => {
    console.error("Failed to connect to Redis:", error);
  });
// Database connection
initDB()
  .then(() => {
    console.log("Database connection established successfully.");
    app.listen(PORT, () => {
      console.log(`Admin server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the server:", error);
  });
