const generaciones = document.getElementById("gen");

generaciones.addEventListener("click", () => {
  cargarGeneraciones();
});

/* menu 1 cargamos las generaciones */
async function cargarGeneraciones() {
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

/* function de los tipos */
const tipes = document.getElementById("tipo");

tipes.addEventListener("click", () => {
  cargarTipos();
});
/* menu 2 cargamos los datos del tipo de pokemon */
async function cargarTipos() {
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
          console.log(tipo.url);
        });
      });
    })
    .catch((error) => console.error(error));
}

/* submenu 2 cargamos los datos de ese pokemon */
async function cargarPokemonTipos(tipoUrl) {
  fetch(tipoUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("datatipourl", data.pokemon);
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

/* function de los regiones */
const region = document.getElementById("region");

region.addEventListener("click", () => {
  cargarRegiones();
});

/* Cargamos los datos de la regiones */
function cargarRegiones() {
  const regionurl = `https://pokeapi.co/api/v2/region/`;
  fetch(regionurl)
    .then((response) => response.json())
    .then((data) => {
      //console.log('datatregion1', data);
      const pokeregion = data.results;
      const select = document.getElementById("region");
      pokeregion.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.url;
        option.text = pokemon.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          cargarPokemonRegions(pokemon.url);
          console.log("datatregion1", pokemon.url);
        });
      });
    })
    .catch((error) => console.error(error));
}

/* submenu 3 cargamos los datos de esa region */
async function cargarPokemonRegions(tipoUrl) {
  fetch(tipoUrl)
    .then((response) => response.json())
    .then((data) => {
      //console.log('regiones', data);
      const locations = data.locations;
      const select = document.getElementById("Pkregion");
      locations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location.url;
        option.text = location.name;
        select.appendChild(option);
        option.addEventListener("click", () => {
          const dataurl = location.url; //.split("/").slice(-2, -1)[0];
          cargarPokemonLocation(dataurl);
          //console.log("location", dataid);
        });
      });
    })
    .catch((error) => console.error(error));
}

/*datos del pokemon de lacation*/

async function cargarPokemonLocation(tipoUrl) {
  try {
    const response = await fetch(tipoUrl);
    const data = await response.json();

    // Limpiar antes de agregar datos
    document.getElementById("stats_name").innerHTML = "";

    // data.areas es el array que necesitas iterar
    if (data.areas && Array.isArray(data.areas)) {
      data.areas.forEach((area) => {
        console.log(`${area.name}: `);
        document.getElementById("stats_name").innerHTML += `${area.name}<br>`;
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
