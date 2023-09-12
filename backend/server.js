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
app.use(
  cors({
    origin: "https://trackit-gb3z.onrender.com",
    credentials: true,
  })
);
app.enable("trust proxy");
// configuring express session
app.use(
  session({
    name: "trackIt",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite:"none"
    },

    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 24 * 60 * 60,
    }),
  })
);
//
app.use(express.static("public"));
app.set("view engine", "ejs");
// to allow sending of json data
app.use(express.json());
// to allow receiving form data
app.use(express.urlencoded({ extended: true }));

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
  console.log(statusCode, message);

  const code = statusCode ? statusCode : 400;
  res.status(code).json({ status: "failed", code, message });
});
// listening to the server
app.listen(9000);
