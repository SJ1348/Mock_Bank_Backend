var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../prisma/index.js";
import { accountNumberSchema, pinSchema } from "../zod/types.js";
function userInputvalidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountNumber = parseInt(req.body.accountNumber);
        const pin = req.body.pin;
        try {
            pinSchema.parse(pin);
            accountNumberSchema.parse(accountNumber);
            const account = yield prisma.accounts.findUnique({
                where: {
                    accountNumber: accountNumber,
                    pin: pin,
                },
            });
            if (account) {
                next();
            }
            else {
                res.status(401).json({
                    message: "Invalid Credentials",
                });
            }
        }
        catch (error) {
            res.status(401).json({ message: error.issues[0].message });
        }
    });
}
export { userInputvalidation };
