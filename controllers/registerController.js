const registerService = require("./../services/registerService");
const passport = require("passport");
const {validationResult} = require("express-validator");

let getPageRegister = (req, res) => {
    return res.render("register", {
        errors: req.flash("errors")
    });
};

let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //create a new user
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    try {
        await registerService.createNewUser(newUser);
        passport.authenticate("local")(req, res, function () {
           res.redirect("/");
         });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};
