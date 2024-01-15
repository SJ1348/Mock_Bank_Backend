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
import { generateRandomNumber } from "../utils/generateRandomNumber.js";
import { prisma } from "../prisma/index.js";
import { pinSchema } from "../zod/types.js";
const router = Router();
// User Routes
router.get("/signup", (req, res) => {
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank Account PIN Setup</title>
    <style>
      body {
        background-color: #3498db;
        color: #fff;
        font-family: 'Arial', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column; /* Align items in a column */
        height: 100vh;
        margin: 0;
      }
  
      div {
        background-color: #2980b9;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px; /* Added margin for spacing */
        text-align: center; /* Center text */
      }
  
      form {
        background-color: #2980b9;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
  
      label {
        display: block;
        margin-bottom: 10px;
      }
  
      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
      }
  
      button {
        background-color: #2ecc71;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
  
      button:hover {
        background-color: #27ae60;
      }
    </style>
  </head>
  <body>
    <div>You will get your account number once you set your pin!</div>
    <form action="/user/signup" method="post">
      <label for="pin">Enter PIN:</label>
      <input type="number" id="pin" name="pin" required>
      <button type="submit">Submit</button>
    </form>
  </body>
  </html>  
    `;
    res.send(htmlContent);
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pin = req.body.pin;
    const accountNumber = generateRandomNumber();
    try {
        pinSchema.parse(pin);
        const accountData = {
            accountNumber: accountNumber,
            pin: pin,
            balance: 100000,
        };
        yield prisma.accounts.create({
            data: accountData,
        });
        res.status(200).json({ accountData });
    }
    catch (error) {
        res.status(401).json({ message: error.issues[0].message });
    }
}));
export { router };
