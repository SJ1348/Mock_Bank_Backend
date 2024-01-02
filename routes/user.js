import { Router } from "express";

const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  res.send("Hello from signup route");
});

export { router };
