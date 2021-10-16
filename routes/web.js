const express = require("express");
const session = require("express-session");
const homePageController = require("../controllers/homePageController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");
const Cart = require("../models/cart");
const _ = require("lodash");

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/add-to-cart/:id/:title/:price", (req, res) => {
    var productId = req.params.id;
    var productTitle = _.startCase(req.params.title);
    var productPrice = _.parseInt(req.params.price);
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    var product = {
      id: productId,
      title: productTitle,
      price: productPrice,
    };

    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });

  router.get("/", loginController.checkLoggedIn);
  router.get(
    "/login",
    loginController.checkLoggedOut,
    loginController.getPageLogin
  );

  router.get("/register", registerController.getPageRegister);

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      successFlash: true,
      failureFlash: true,
    })
  );

  router.post(
    "/register",
    auth.validateRegister,
    registerController.createNewUser
  );

  router.post("/logout", loginController.postLogOut);
  return app.use("/", router);
};
module.exports = initWebRoutes;
