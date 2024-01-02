import { Router } from "express";
import { Account } from "../db/index.js";

const router = Router();

// Wallet Routes
router.post("/getBalance", async (req, res) => {
  const pin = req.body.pin;

  Account.create({
    pin: pin,
  });

  res.json({
    message: "Account created successfully",
  });
});

router.post("/updateBalance", async (req, res) => {
  const pin = req.body.pin;
});

export { router };
