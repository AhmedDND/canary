const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
  });
  app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/signin.html'));
  });
  app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/signup.html'));
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})