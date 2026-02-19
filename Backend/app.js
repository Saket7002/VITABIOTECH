// External Modules
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRouter");

const DB_PATH = "mongodb://127.0.0.1:27017/vitabiotech";
const app = express();

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    secure: false,  
    sameSite: "lax"
  }
}));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});

app.use("/api", authRoutes);

const PORT = 5000;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));
