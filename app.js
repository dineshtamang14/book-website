require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const router = require("./routes/router");

let app = express();

//use cookie parser
app.use(cookieParser("secret"));

//config session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 86400000 1 day
    },
  })
);

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
