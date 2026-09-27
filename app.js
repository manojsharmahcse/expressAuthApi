import express from "express";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/upload", uploadRoutes);

// Routes:public
app.use("/api/contact", contactRoutes);

// auth//login/register
app.use("/api/auth", authRoutes);

// profile:token based
app.use("/api/profile", profileRoutes);


app.get("/", (req, res) => {
  res.send("API is working");
});

export default app;