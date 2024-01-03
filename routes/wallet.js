import { Router } from "express";
import { prisma } from "../prisma/index.js";
import { userInputvalidation } from "../middleware/userInputValidation.js";

const router = Router();

// Wallet Routes
router.post("/getBalance", userInputvalidation, async (req, res) => {
  const accountNumber = parseInt(req.body.accountNumber);
  let account = await prisma.accounts.findUnique({
    where: {
      accountNumber: accountNumber,
    },
  });
  res.status(200).json({
    balance: account.balance,
  });
});

router.put("/updateBalance", userInputvalidation, async (req, res) => {
  const accountNumber = parseInt(req.body.accountNumber);
  const amount = parseInt(req.body.amount);
  const operation = req.body.operation;
  if (operation === "credit") {
    await prisma.accounts.update({
      where: {
        accountNumber: accountNumber,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    res.status(200).json({
      message: "Balance Updated",
    });
  } else if (operation === "debit") {
    let account = await prisma.accounts.findUnique({
      where: {
        accountNumber: accountNumber,
      },
    });

    if (account.balance < amount) {
      res.status(402).json({
        message: "Insufficient funds",
      });
    } else {
      await prisma.accounts.update({
        where: {
          accountNumber: accountNumber,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });
      res.status(200).json({
        message: "Balance Updated",
      });
    }
  }
});

export { router };
