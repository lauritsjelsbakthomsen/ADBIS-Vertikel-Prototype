// app.js

const express = require("express");
const app = express();
const port = 3000; // or any port you prefer

const { log } = require("node:console");
// Middleware (optional)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { insertRecipe } = require("./model/recipe");

// Basic route
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "front.html"));
});

app.post("/post", async (req, res) => {
  console.log("Ny opskrift lavet");
  console.log(req.body);

  try {
    await insertRecipe(req.body.name, req.body.ingredients, req.body.metode);

    res.send("Opskriften er oprettet!");
  } catch (err) {
    console.error("Fejl ved oprettelse:", err.message);
    res.status(500).send("Noget gik galt ved oprettelsen.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
