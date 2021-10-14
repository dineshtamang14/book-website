const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = {
  connection: connection,
};

