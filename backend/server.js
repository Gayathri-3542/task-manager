require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const tasksRoutes = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// routes
app.use("/api/tasks", tasksRoutes);

// health check
app.get("/", (req, res) => res.send("Task Manager API running"));

// error handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
