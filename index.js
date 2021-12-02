const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const hbs = handlebars.create({
  layoutsDir: __dirname + "/views/layouts",
  extname: "hbs",
});
const port = 3000;
const path = require("path");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canary",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.render("profile", {
    layout: "index",
  });
});

app.get("/signin", (req, res) => {
  res.render("signin", {
    layout: "index",
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    layout: "index",
  });
});
app.get("/profile/:username", (req, res) => {
  console.log(req.params.username);
  con.query(
    "SELECT * FROM user where username = ?",
    req.params.username,
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render("profile", {
        layout: "index",
        userinfo: result,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
