var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { prisma } from "../prisma/index.js";
import { userInputvalidation } from "../middleware/userInputValidation.js";
import { amountSchema, operationSchema } from "../zod/types.js";
const router = Router();
// Wallet Routes
router.get("/getBalance", userInputvalidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountNumber = parseInt(req.body.accountNumber);
    const name = req.body.name;
    let account = yield prisma.accounts.findUnique({
        where: {
            accountNumber: accountNumber,
        },
    });
    res.status(200).json({
        balance: account === null || account === void 0 ? void 0 : account.balance,
    });
}));
router.post("/updateBalance", userInputvalidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountNumber = parseInt(req.body.accountNumber);
    const amount = parseInt(req.body.amount);
    const operation = req.body.operation;
    try {
        amountSchema.parse(amount);
        operationSchema.parse(operation);
        if (operation === "credit") {
            yield prisma.accounts.update({
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
        }
        else if (operation === "debit") {
            let account = yield prisma.accounts.findUnique({
                where: {
                    accountNumber: accountNumber,
                },
            });
            if (!account) {
                throw Error;
            }
            if (account.balance < amount) {
                res.status(401).json({
                    message: "Insufficient funds",
                });
            }
            else {
                yield prisma.accounts.update({
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
    }
    catch (error) {
        res.status(401).json({ message: error.issues[0].message });
    }
}));
router.post("/checkAccount", userInputvalidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Bank account and pin matches",
    });
}));
export { router };
