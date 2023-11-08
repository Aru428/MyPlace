const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", function (req, res) {
  res.send("Hello project");
});

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
