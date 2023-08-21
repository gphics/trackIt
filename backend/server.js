require("dotenv").config();
const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const dbConnect = require("./Config/dbConnect");
const userRouter = require("./Routes/userRoutes");
const debtRouter = require("./Routes/debtRoute");
const app = express();
const reminderRouter = require("./Routes/reminder");
dbConnect();

// -----------
// ----------
// middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
// to allow sending of json data
app.use(express.json());
// to allow receiving form data
app.use(express.urlencoded({ extended: true }));
// configuring express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 24 * 60 * 60,
    }),
  })
);
// configuring Access control allow origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.Header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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
