var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const servicesRouter = require("./routes/services");
const recommendationsRouter = require("./routes/recommendations");
const portfolioRouter = require("./routes/portfolio");
const contactRouter = require("./routes/contact");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "./node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "./node_modules/jquery/dist/"));
app.use(express.static(__dirname + "./node_modules/typed.js/lib/"));
app.use(express.static(__dirname + "/node_modules/bootstrap-icons"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/home", homeRouter);
app.use("/about", aboutRouter);
app.use("/services", servicesRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/portfolio", portfolioRouter);
app.use("/contact", contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
