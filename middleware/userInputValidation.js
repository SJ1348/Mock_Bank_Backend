import { Account } from "../db/index.js";

async function userInputvalidation(req, res, next) {
  const accountNumber = req.body.accountNumber;
  const pin = req.body.pin;
  let account = await Account.findOne({
    accountNumber: accountNumber,
    pin: pin,
  });
  if (account) {
    next();
  } else {
    res.status(500).json({
      message: "Invalid Credentials",
    });
  }
}

export { userInputvalidation };
