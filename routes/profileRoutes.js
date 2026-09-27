import express from "express";

import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);

router.post("/", protect, createProfile);

router.put("/", protect, updateProfile);

router.delete("/", protect, deleteProfile);

export default router;