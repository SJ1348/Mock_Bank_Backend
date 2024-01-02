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

router.put("/updateBalance", userInputvalidation, async (req, res) => {
  const accountNumber = req.body.accountNumber;
  const amount = req.body.amount;
  const operation = req.body.operation;
  if (operation === "credit") {
    let account = await Account.updateOne(
      { accountNumber: accountNumber },
      { $inc: { balance: amount } }
    );
    res.json({
      message: "Balance Updated",
    });
  } else if (operation === "debit") {
    let account = await Account.findOne({ accountNumber: accountNumber });

    if (account.balance < amount) {
      res.status(500).json({
        message: "Insufficient funds",
      });
    } else {
      await Account.updateOne(
        { accountNumber: accountNumber },
        { $inc: { balance: -amount } }
      );
      res.json({
        message: "Balance Updated",
      });
    }
  }
});

export { router };
