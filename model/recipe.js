const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// ✅ Save the database inside the /model folder
const dbPath = path.join(__dirname, "database.db");
console.log("Using DB path:", dbPath); // Debug: confirm location

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create table if it doesn't exist
// Opret bruger-tabellen
function createRecipeTable() {
  const sql = `CREATE TABLE recipe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      ingredients VARCHAR(255),
      metode VARCHAR(255) 
    );`;

  db.run(sql, (err) => {
    if (err) {
      return console.error("Error creating table:", err.message);
    }
    console.log("Table created successfully.");
  });
}

//createRecipeTable();

function insertRecipe(name, ingredients, metode) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO recipe (name, ingredients, metode) VALUES (?, ?, ?)`;
    db.run(sql, [name, ingredients, metode], function (err) {
      if (err) {
        reject(err);
        console.log("recipe not created");
      } else {
        resolve(`recipe created with id: ${this.lastID}`);
        console.log("recipe created");
      }
    });
  });
}

//insertRecipe("hej", "hej ibflwuie");

function deleteRecipe(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM recipe WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        console.log("❌ Failed to delete recipe:", err.message);
        reject(err);
      } else {
        console.log(`✅ recipe with ID ${id} has been deleted`);
        resolve(`recipe deleted`);
      }
    });
  });
}

function dropRecipeTable() {
  return new Promise((resolve, reject) => {
    const sql = `DROP TABLE IF EXISTS recipe`;

    db.run(sql, function (err) {
      if (err) {
        console.error("Error dropping recipe table:", err.message);
        reject(err);
      } else {
        console.log("Recipe table dropped.");
        resolve("Table removed.");
      }
    });
  });
}

function getAllRecipes() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM recipe`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log("❌ Failed to retrieve recipes:", err.message);
        reject(err);
      } else {
        console.log(`✅ Retrieved ${rows.length} recipes`);
        resolve(rows);
        console.log(rows);
      }
    });
  });
}

//getAllRecipes();

//dropRecipeTable();

//insertRecipe("vand", "hej igen");

module.exports = { db, insertRecipe, deleteRecipe, getAllRecipes };
