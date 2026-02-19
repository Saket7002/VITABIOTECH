// ===============================
// External Modules
// ===============================
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRouter");

const app = express();

// ===============================
// Environment Variables
// ===============================
const DB_PATH = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!DB_PATH) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

if (!process.env.SESSION_SECRET) {
  console.error("❌ SESSION_SECRET is not defined in environment variables");
  process.exit(1);
}

// ===============================
// Middlewares
// ===============================
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// ===============================
// Connect MongoDB First
// ===============================
mongoose.connect(DB_PATH)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // ===============================
    // Session Store (after DB connect)
    // ===============================
    const store = new MongoDBStore({
      uri: DB_PATH,
      collection: "sessions",
    });

    store.on("error", function (error) {
      console.error("❌ Session store error:", error);
    });

    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store,
      cookie: {
        httpOnly: true,
        secure: false, // change to true if using HTTPS
        sameSite: "lax"
      }
    }));

    // ===============================
    // Routes
    // ===============================
    app.use("/api", authRoutes);

    // ===============================
    // Start Server
    // ===============================
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

