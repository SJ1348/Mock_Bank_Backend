import { Router } from "express";
import { Account } from "../db/index.js";

const router = Router();

// Wallet Routes
router.post("/getBalance", async (req, res) => {
  const pin = req.body.pin;
  const accountNumber = req.body.accountNumber;

  let account = await Account.find({ accountNumber: accountNumber, pin: pin });

  if (account) {
    await Account.findOne({ pin: pin }).then((acc) => {
      res.json({ balance: acc.balance });
    });
  }
});

router.post("/updateBalance", async (req, res) => {
  const pin = req.body.pin;
});

export { router };
