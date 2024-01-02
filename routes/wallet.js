import { Router } from "express";
import { Account } from "../db/index.js";
import { userInputvalidation } from "../middleware/userInputValidation.js";

const router = Router();

// Wallet Routes
router.post("/getBalance", userInputvalidation, async (req, res) => {
  const accountNumber = req.body.accountNumber;
  let account = await Account.findOne({ accountNumber: accountNumber });
  res.json({
    balance: account.balance,
  });
});

router.post("/updateBalance", userInputvalidation, async (req, res) => {});

export { router };
