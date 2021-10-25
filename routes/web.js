require("dotenv").config();
const express = require("express");
const session = require("express-session");
const homePageController = require("../controllers/homePageController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");
const Cart = require("../models/cart");
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripeScretKey = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(stripeScretKey);

// Init all passport
initPassportLocal();


let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/login");
    });

  router.get("/shopping-cart", (req, res) => {
    res.render("cart", {
      key: stripePublicKey,
    });
  });

  router.post("/payment", (req, res)=> {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Books",
        address: {
          line1: "TC 9/4 Old MES colony",
          postal_code: "110092",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
        },
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: 7000, // Charing Rs 25
          description: "Books",
          currency: "INR",
          customer: customer.id,
        });
      })
      .then((charges) => {
          res.redirect("/shopping-cart"); // If no error occurs
      })
      .catch((err) => {
        res.redirect("/shopping-cart"); // If some error occurs
      });
  }); 

  router.get("/admin", (req, res)=>{
    res.redirect("https://search-2ca30.web.app");
  })

  router.get("/forgot", registerController.getPageForgot);

  router.get("/", loginController.checkLoggedIn);
  router.get(
    "/login",
    loginController.checkLoggedOut,
    loginController.getPageLogin
  );

  router.get("/register", registerController.getPageRegister);

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
