import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Main API
app.use("/api", apiRoutes);

app.get("/", (_, res) => res.send("Shift Scheduling API"));

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
