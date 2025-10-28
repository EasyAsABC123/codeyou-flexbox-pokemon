const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const frontend_path = path.join(__dirname, "..", "public");

console.log(frontend_path);
app.use(express.static(frontend_path));

app.get("/hello_world", (req, res) => {
  res.send({ text: "Hello World!" });
});

app.post("/pokemon/ratings/:id", (req, res) => {
  console.log(req.params.id);
  res.end();
});

app.put("/pokemon/ratings/:id", (req, res) => {
  console.log(req.params.id, req.body);
  res.end();
});

app.get("/pokemon/ratings/:id", (req, res) => {
  console.log(`they called the get ratings for ID ${req.params.id} function`);
  res.end();
});

app.get("/pokemon/ratings", (req, res) => {
  console.log("they called the get all function");
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
