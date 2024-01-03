import { z } from "zod";

export const pinSchema = z.string().refine((value) => /^\d{6}$/.test(value), {
  message: "PIN must be a int of 6 digits",
});

export const accountNumberSchema = z
  .number()
  .int()
  .refine((value) => value >= 1000000000 && value <= 9999999999, {
    message: "Account Number must be a 10 digit interger",
  });

export const amountSchema = z.number().min(0);

export const operationSchema = z.string().refine(
  (value) => {
    return value === "credit" || value === "debit";
  },
  {
    message: "Invalid operation",
  }
);
