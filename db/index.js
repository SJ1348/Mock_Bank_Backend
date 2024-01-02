import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//Define Schemas
const AccountSchema = new mongoose.Schema({
  accountNumber: Number,
  pin: Number,
  balance: Number,
});

const Account = mongoose.model("Account", AccountSchema);

export { Account };
