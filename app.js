const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload"); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cookieParser());
app.use(fileupload());
app.use(express.static("public"));
app.use(express.static("files"));

//public routes
app.use("/api", require("./routes/public/publicContactRoute"));
app.use("/api", require("./routes/public/publicRoutes"));
app.use("/api", require("./routes/public/publicPortfolioRoute"));
app.use("/api", require("./routes/public/publicProjectRoute"));

//user routes
app.use("/api", require("./routes/user/userAuthRoute"));
app.use("/api", require("./routes/user/userPortfolioRoute"));
app.use("/api", require("./routes/user/userProjectRoute"));

//admin routes
app.use("/api", require("./routes/admin/adminProjectRoute"));
app.use("/api", require("./routes/admin/adminContactRoute"));
app.use("/api", require("./routes/admin/myPortfolioRoute"));


app.get("*", (req, res)=>{
    res.send("API running...");
})

module.exports = app;
