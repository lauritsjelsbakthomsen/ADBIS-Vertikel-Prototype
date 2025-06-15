// app.js

const express = require("express");
const app = express();
const port = 3000; // or any port you prefer

const { log } = require("node:console");
// Middleware (optional)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { insertRecipe, getAllRecipes } = require("./model/recipe");

// Basic route
const path = require("path");

app.use(express.static("view"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "front.html"));
});

app.post("/post", async (req, res) => {
  console.log("Ny opskrift lavet");
  console.log(req.body);

  try {
    await insertRecipe(req.body.name, req.body.ingredients, req.body.metode);

    res.status(201).sendFile(path.join(__dirname, "view", "front.html"));
  } catch (err) {
    console.error("Fejl ved oprettelse:", err.message);
  }
});

app.get("/data", async (req, res) => {
  try {
    let data = await getAllRecipes();
    res.json(data); // ensures it's JSON format
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/db", (req, res) => {
  console.log("Viser DB fil");

  res.sendFile(path.join(__dirname, "/view/db.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
