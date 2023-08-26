require("dotenv").config();
const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const dbConnect = require("./Config/dbConnect");
const userRouter = require("./Routes/userRoutes");
const debtRouter = require("./Routes/debtRoute");
const app = express();
const reminderRouter = require("./Routes/reminder");
const cors = require("cors");
dbConnect();

// -----------
// ----------
// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// https://trackit-gb3z.onrender.com
app.use(express.static("public"));
app.set("view engine", "ejs");
// to allow sending of json data
app.use(express.json());
// to allow receiving form data
app.use(express.urlencoded({ extended: true }));

app.enable("trust proxy");

// configuring express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 24 * 60 * 60,
    }),
  })
);
// -----------
// ----------
// routes
app.use("/user", userRouter);
app.use("/debt", debtRouter);
app.use("/reminder", reminderRouter);
app.get("/docs", (req, res) => {
  res.render("docs");
});
// app.get("/", (req, /))
// -----------
// ----------

// error handling
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ status: "failed", statusCode, message });
});
// listening to the server
app.listen(9000);
