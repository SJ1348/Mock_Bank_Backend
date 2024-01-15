import { prisma } from "../prisma/index.js";
import { accountNumberSchema, pinSchema } from "../zod/types.js";
import { Request, Response, NextFunction } from "express";

async function userInputvalidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accountNumber = parseInt(req.body.accountNumber);
  const pin = req.body.pin;
  try {
    pinSchema.parse(pin);
    accountNumberSchema.parse(accountNumber);

    const account = await prisma.accounts.findUnique({
      where: {
        accountNumber: accountNumber,
        pin: pin,
      },
    });

    if (account) {
      next();
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error: any) {
    res.status(401).json({ message: error.issues[0].message });
  }
}

export { userInputvalidation };
