import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://manjiripathak01:DbowYNgfWacekh9Y@mockbank.hyvpzb6.mongodb.net/Accounts"
);

//Define Schemas
const AccountSchema = new mongoose.Schema({
  accountNumber: Number,
  pin: Number,
  balance: Number,
});

const Account = mongoose.model("Account", AccountSchema);

export { Account };
