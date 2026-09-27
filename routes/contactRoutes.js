import express from "express";
import { createContact } from "../controllers/contactController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.array("resume", 5), createContact);

export default router;