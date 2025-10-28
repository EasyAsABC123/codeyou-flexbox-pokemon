const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.log("Pokemon rating put call", req.params.id, req.body);
  const requestId = req.params.id;
  const requestBody = req.body.rating;

  let pokemonRating = fs.readFile(
    "pokemon-rating.json",
    "utf-8",
    (err, jsonString) => {
      if (err) {
        console.log("Error reading file:", err);
        return;
      }
      try {
        const cache = JSON.parse(jsonString);

        let pokemonRating = cache.ratings[requestId];

        if (pokemonRating === undefined) {
          pokemonRating = {
            "+": 0,
            "-": 0,
          };
        }
        if (requestBody === "+") {
          pokemonRating["+"]++;
        } else {
          pokemonRating["-"]++;
        }
        cache.ratings = { ...cache.ratings, [requestId]: pokemonRating };
        console.log(cache);

        const jsonData = JSON.stringify(cache, null, 2);

        fs.writeFile("pokemon-rating.json", jsonData, "utf-8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
          } else {
            console.log("JSON data written to output.json");
          }
        });

        console.log("In memory cache:", cache);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    }
  );

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
