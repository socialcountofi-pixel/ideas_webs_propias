    const generaciones = document.getElementById("gen");

generaciones.addEventListener("click", () => {
      cargarGeneraciones();
});

/* menu 1 cargamos las generaciones */
function cargarGeneraciones() {
  const url = `https://pokeapi.co/api/v2/generation/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const generaciones = data.results;
      const select = document.getElementById("gen");
      generaciones.forEach((generacion) => {
        const option = document.createElement("option");
        option.value = generacion.url;
        option.text = generacion.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          cargarPokemonGeneracion(generacion.url);
        });
      });
    })
    .catch((error) => console.error(error));
}
/* submenu 1 cargamos los datos de ese pokemon */
function cargarPokemonGeneracion(generacion) {
  fetch(generacion)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const pokemon = data.pokemon_species;
      const select = document.getElementById("Pkgen");
      pokemon.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.url;
        option.text = pokemon.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          const dataid = pokemon.url.split("/").slice(-2, -1)[0];
          cargaPokemon(dataid);
        });
      });
    })
    .catch((error) => console.error(error));
}

//cargarGeneraciones();

/* Mostramos los datos del pokemon */
function cargaPokemon(pokemon) {
  /*const pokemon = document.getElementById("pokemon").value;*/
  //const pokemon = 25;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const stats = data.stats;
      datosPokemon(stats);
    })
    .catch((error) => console.error(error));
}
/* datos de los stats */
function datosPokemon(stats) {
  console.log(stats);
  stats.forEach((stat) => {
    const statName = stat.stat.name;
    const statValue = stat.base_stat;
    console.log(`${statName}: ${statValue}`);
    document.getElementById("stats_name").innerHTML += `${statName}<br>`;
    document.getElementById("stats_value").innerHTML += `${statValue}<br>`;
  });
}

//cargaPokemon(25);

 
 
/* submenu 1 cargamos los datos de ese pokemon */
function cargarPokemonGeneracion(generacion) {
  fetch(generacion)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const pokemon = data.pokemon_species;
      const select = document.getElementById("Pkgen");
      pokemon.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.url;
        option.text = pokemon.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          const dataid = pokemon.url.split("/").slice(-2, -1)[0];
          cargaPokemon(dataid);
        });
      });
    })
    .catch((error) => console.error(error));
}

//cargarGeneraciones();

/* Mostramos los datos del pokemon */
function cargaPokemon(pokemon) {
  /*const pokemon = document.getElementById("pokemon").value;*/
  //const pokemon = 25;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const stats = data.stats;
      datosPokemon(stats);
    })
    .catch((error) => console.error(error));
}
/* datos de los stats */
function datosPokemon(stats) {
  console.log(stats);
  stats.forEach((stat) => {
    const statName = stat.stat.name;
    const statValue = stat.base_stat;
    console.log(`${statName}: ${statValue}`);
    document.getElementById("stats_name").innerHTML += `${statName}<br>`;
    document.getElementById("stats_value").innerHTML += `${statValue}<br>`;
  });
}

//cargaPokemon(25);
 
/* function de los tipos */
const tipes = document.getElementById("tipo");

tipes.addEventListener("click", () => {
  cargarTipos();
});

function cargarTipos() {
  const url = `https://pokeapi.co/api/v2/type/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tipos = data.results;
      const select = document.getElementById("tipo");
      tipos.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo.url;
        option.text = tipo.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          cargarPokemonTipos(tipo.url);
          console.log(tipo.url)
        });
      });
    })
    .catch((error) => console.error(error));
    
}

/* submenu 1 cargamos los datos de ese pokemon */
async function cargarPokemonTipos(tipoUrl) {
  fetch(tipoUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('datatipourl',data.pokemon);
      const pokemon = data.pokemon;
      const select = document.getElementById("Pktipo");
      pokemon.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.pokemon.url;
        option.text = pokemon.pokemon.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          const dataid = pokemon.pokemon.url.split("/").slice(-2, -1)[0];
          cargaPokemon(dataid);
        });
      });
    })
    .catch((error) => console.error(error));
}
