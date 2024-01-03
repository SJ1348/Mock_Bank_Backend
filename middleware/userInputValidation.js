import { prisma } from "../prisma/index.js";

async function userInputvalidation(req, res, next) {
  const accountNumber = parseInt(req.body.accountNumber);
  const pin = parseInt(req.body.pin);

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
}

export { userInputvalidation };
