const express = require("express");
/**
 * Config view engine for app
 */
let configViewEngine = (app)=> {
    app.use(express.static("public"));
    app.set("view engine", "ejs");
};

module.exports = configViewEngine;
