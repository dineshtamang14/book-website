const router = require("express").Router();
const db = require("../dbconnection/db")


router.get("/", (req, res)=>{
  res.render("login");
});

router.get("/store", (req, res)=>{
  if (!req.isAuthenticated()) {
    res.render("store");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var sql = "SELECT * FROM user_profiles WHERE name =? AND password =?";
  db.connection.query(sql, [username, password], function (err, data) {
    if(data.length > 0){
      res.redirect("/store");
    }
  });
});

router.post("/register", (req, res)=>{
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
    db.connection.query(
      "INSERT INTO user_profiles(name, email, password) VALUES(?, ?, ?)",
      [username, email, password],
      (err, response) => {
        if (!err) {
          res.redirect("/store");
        } else {
          throw err;
        }
      }
    );
});


module.exports = router;