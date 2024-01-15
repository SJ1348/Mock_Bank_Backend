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

// Did not use .min(0) so that I could throw custom error message.
export const amountSchema = z.number().refine((data) => data >= 0, {
  message: "Amount must be greater than or equal to 0",
});

export const operationSchema = z.string().refine(
  (value) => {
    return value === "credit" || value === "debit";
  },
  {
    message: "Invalid operation",
  }
);
