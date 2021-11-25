const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.use(express.static('public'))
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canary"
});

con.connect(function(err) {
  if (err) throw err; 
  console.log("Connected!");
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
  });
  app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/signin.html'));
  });
  app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/signup.html'));
  });
  app.get('/profile/:username', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/profile.html'));
    console.log(req.params.username);
    con.query("SELECT * FROM user where username = ?", req.params.username, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})