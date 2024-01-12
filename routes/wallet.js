import { Router } from "express";
import { prisma } from "../prisma/index.js";
import { userInputvalidation } from "../middleware/userInputValidation.js";
import { amountSchema, operationSchema } from "../zod/types.js";

const router = Router();

// Wallet Routes
router.get("/getBalance", userInputvalidation, async (req, res) => {
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

router.post("/updateBalance", userInputvalidation, async (req, res) => {
  const accountNumber = parseInt(req.body.accountNumber);
  const amount = parseInt(req.body.amount);
  const operation = req.body.operation;

  try {
    amountSchema.parse(amount);
    operationSchema.parse(operation);

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
        res.status(200).json({
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
  } catch (error) {
    res.status(200).json({ message: error.issues[0].message });
  }
});

router.post("/checkAccount", userInputvalidation, async (req, res) => {
  res.status(200).json({
    message: "Bank account and pin matches",
  });
});

export { router };
