
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const saleRouter = require("./routes/sale");
const orderRouter = require("./routes/order");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const connectDB = require("./config/db");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", saleRouter);
app.use("/api", categoryRouter);
app.use("/api", adminRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
