const express = require("express");
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/static'))

app.get("/", function (req, res) {
  res.send("Hello project");
});

app.get("/signin", function (req, res) {
  res.render("signin");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/editProfile", function (req, res) {
  res.render("editProfile");
});

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
