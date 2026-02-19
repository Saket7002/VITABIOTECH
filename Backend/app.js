// External Modules
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRouter");

const app = express();

// ✅ Use environment variables
const DB_PATH = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// ✅ Session store
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

// ✅ CORS (temporary open for testing)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  }
}));

app.use("/api", authRoutes);

// ✅ Connect DB then start server
mongoose.connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
