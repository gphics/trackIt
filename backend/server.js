require("dotenv").config();
const express = require("express");
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

// production
app.use(
  cors({
    origin: "https://trackit-gb3z.onrender.com",
  })
);

app.enable("trust proxy");
// configuring express session

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
  const { code, message } = err;
  console.log(err);
  res.status(code).json({ err: { code, message }, data: null });
});
// listening to the server
app.listen(9000, () => console.log("server up and running"));
