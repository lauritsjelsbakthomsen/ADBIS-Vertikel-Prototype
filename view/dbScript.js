// fetch fra endpoint

// henter data ned fra DB med /data fra app.js

async function getData(url) {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

//laver tabel på HTML side med recipes
async function makeTable() {
  let table = document.getElementById("table");

  let headers = ["id", "Navn", "Ingredients", "Metode"];

  // Create table header row
  let headerRow = document.createElement("tr");

  for (let i = 0; i < headers.length; i++) {
    let th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  // Fetch data from server
  let data = await getData("/data");

  // Create table rows for each recipe
  for (let i = 0; i < data.length; i++) {
    let row = document.createElement("tr");

    let idCell = document.createElement("td");
    idCell.textContent = data[i].id;

    let navnCell = document.createElement("td");
    navnCell.textContent = data[i].name;

    let ingredientsCell = document.createElement("td");
    ingredientsCell.textContent = data[i].ingredients;

    let metodeCell = document.createElement("td");
    metodeCell.textContent = data[i].metode;

    row.appendChild(idCell);
    row.appendChild(navnCell);
    row.appendChild(ingredientsCell);
    row.appendChild(metodeCell);

    table.appendChild(row);
  }
}

makeTable();
