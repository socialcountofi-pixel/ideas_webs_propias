// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

/* Datos del pokemon */
const id_pokemon = 1;

function cargarPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`)
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      datos_pokemon(data);
      await datos_stats(data.stats);
      await datos_moves(data.moves);
      await datos_tyes(data.types);
      await datos_abilities(data.abilities);
      return data;
    });
}

async function datos_pokemon(data) {
  console.log(data.sprites.front_default);
  document.getElementById("pokemon-name").textContent = data.name;
  document.getElementById("pokemon-image").src = data.sprites.front_default;
  
  //await datos_moves(data.moves);
  //await datos_stats(data.stats);
  return data;
}

async function datos_stats(data) {
  //console.log(data);
  const statsElements = data.map((stat, index) => {
    const statName = stat.stat.name;
    const statValue = stat.base_stat;
    /*valores por defecto pues son 6 statsde cada pokemon*/
    const statElement = document.getElementById(`pokemon-stats${index}`);
    const statElementValue = document.getElementById(`pokemon-value${index}`);
    if (statElement && statElementValue) {
      statElement.textContent = `${statName}`;
      statElementValue.textContent = statValue;
    }
    return { statName, statValue };
  });
}

// ...existing code...
async function datos_moves(moves) {
  console.log("moves count:", moves.length);
  const tbody = document.querySelector('.recentOrders table tbody');
  if (!tbody) return [];

  // Crear una fila <tr> por cada movimiento para mantener la estructura del HTML
  const rows = moves
    .map(
      (m) => `<tr>
  <td>${m.move.name}</td>
  <td>$0</td>
  <td>--</td>
  <td><span class="status delivered">Delivered</span></td>
</tr>`
    )
    .join("");

  tbody.innerHTML = rows;

  return moves.map((m) => ({ moveName: m.move.name }));
}
// ...existing code...

async function datos_tyes(types) {
  console.log("types count:", types.length);
  const tbody = document.getElementById('type_name')?.closest('tbody');
  if (!tbody) return [];

  // Crear una fila <tr> por cada tipo para mantener la estructura del HTML
  const rows = types
    .map(
      (t) => `<tr>
  <td>${t.type.name}</td>
</tr>`
    )
    .join("");

  tbody.innerHTML = rows;

  return types.map((t) => ({ typeName: t.type.name }));
}

// Llamar a la función para cargar los datos del Pokémon al cargar la página

async function datos_abilities(abilities) {
  console.log("abilities count:", abilities.length);
  const tbody = document.getElementById('ability_name')?.closest('tbody');
  if (!tbody) return [];

  // Crear una fila <tr> por cada habilidad para mantener la estructura del HTML
  const rows = abilities
    .map(
      (a) => `<tr>
  <td>${a.ability.name}</td>
</tr>`
    )
    .join("");

  tbody.innerHTML = rows;

  return abilities.map((a) => ({ abilityName: a.ability.name })); 
  


} 




cargarPokemon();
