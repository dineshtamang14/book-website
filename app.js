require("dotenv").config();
const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const initWebRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");
const stripe = require("stripe");
const app = express();

//use cookie parser
app.use(cookieParser("secret"));

//config session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180 * 60 * 1000, // 86400000 1 day
    },
  })
);

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

app.get("/:anyRoute", (req, res) => {
  res.render("404");
});

app.get("/:anyRoute/:anyFutherRoutes", (req, res) => {
  res.render("404");
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}!`));
