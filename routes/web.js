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
    router.get("/add-to-cart/:id", (req, res) => {
        let productId = _.startCase(req.params.id);
        // let cart = new Cart(req.session.cart ? req.session.cart : {});
        res.redirect("/");
        console.log(productId);
    });

    router.get("/", loginController.checkLoggedIn);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/:anyRoute", (req, res)=>{
        res.render("404");
    });

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.get("/logout", (req, res)=>{
        req.logout();
        res.redirect("/login");
    });
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;
