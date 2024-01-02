// Importing required modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router as userRouter } from "./routes/user.js";
import { router as walletRouter } from "./routes/wallet.js";

// Initializing Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Body parsing middleware

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the worlds best bank!");
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/wallet", walletRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
