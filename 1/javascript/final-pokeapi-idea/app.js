const pokemonForm = document.getElementById("pokemon-form");
const pokemonInput = document.getElementById("pokemon-input");
const pokemonInfo = document.getElementById("pokemon-info");
const pokemonList = document.getElementById("pokemon-list");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let offset = 0;
const limit = 10;
let totalCount = 0;

// Función para obtener y mostrar información de un Pokémon específico // falla aqui
const fetchPokemont = async(imputtype) => {
    var url = imputtype;
    //console.log(url);
    var cadenaurl = url.toString().split("/");
    //console.log(cadenaurl);
    var ultimodato = cadenaurl.pop();
    //console.log(ultimodato);
    var idurl = cadenaurl[cadenaurl.length - 1];
    //console.log(idurl);

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/type/${idurl}`
        );
        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }
        //console.log(imputtype);
        const datas = await response.json();
        //console.log(datas);
        //console.log(datas.damage_relations.double_damage_from);
        console.log(datas.sprites);
        console.log('prueba', datas.sprites['generation-v']['black-white'].name_icon);

        pokemonInfo.innerHTML += `
        <!--double_damage_from-->

        <!--<p><strong>doble damage from:</strong> ${datas.damage_relations.double_damage_from
        .map((damage) => damage.name)
        .join(", ")}</p>-->
         
        <p><strong>name damage from:</strong> ${datas.damage_relations.double_damage_from
        .map((double_damage_from) => double_damage_from.name)
        .join(", ")}</p>
        
	  <p><strong>url damage from:</strong> ${datas.damage_relations.double_damage_from
        .map((double_damage_from) => double_damage_from.url)
        .join(", ")}</p>
         
        <p><strong>img damage from:</strong> ${datas.damage_relations.double_damage_from
        .map((double_damage_from) => double_damage_from.url)
        .join(", ")}</p>

<img src="${datas.sprites['generation-v']['black-white'].name_icon}" alt="${datas.name}">


        <!-double_damage_to-->
         
        <p><strong>doble damage to:</strong> ${datas.damage_relations.double_damage_to
        .map((damage) => damage.name)
        .join(", ")}</p>
         

	  <p><strong>url doble damage to:</strong> ${datas.damage_relations.double_damage_to
        .map((double_damage_to) => double_damage_to.url)
        .join(", ")}</p>

        <!-half_damage_from-->
        
        <p><strong>half damage from:</strong> ${datas.damage_relations.half_damage_from
        .map((damage) => damage.name)
        .join(", ")}</p>
         
	  <p><strong>url half damage from:</strong> ${datas.damage_relations.half_damage_from
        .map((half_damage_from) => half_damage_from.url)
        .join(", ")}</p>

        <!-half_damage_to-->

        <p><strong>doble half damage to:</strong> ${datas.damage_relations.half_damage_to
        .map((damage) => damage.name)
        .join(", ")}</p>
         
	  <p><strong>url half damage to:</strong> ${datas.damage_relations.half_damage_to
        .map((half_damage_to) => half_damage_to.url)
        .join(", ")}</p>

        <!-no_damage_from-->
        
        <p><strong>no damage from:</strong> ${datas.damage_relations.no_damage_from
        .map((damage) => damage.name)
        .join(", ")}</p>
         
	  <p><strong>url no damage from:</strong> ${datas.damage_relations.no_damage_from
        .map((no_damage_from) => no_damage_from.url)
        .join(", ")}</p>

        <!-no_damage_to-->
        
        <p><strong>doble no damage to:</strong> ${datas.damage_relations.no_damage_to
        .map((damage) => damage.name)
        .join(", ")}</p>
         
	  <p><strong>url no damage to:</strong> ${datas.damage_relations.no_damage_to
        .map((no_damage_to) => no_damage_to.url)
        .join(", ")}</p>
 
    `;
    } catch (error) {
        pokemonInfo.innerHTML = `<p>${error.message}</p>`;
    }
};

/*
fetchPokemont(12);
*/

// Función para obtener y mostrar información de un Pokémon específico
const fetchPokemon = async(pokemonInput) => {
        console.log(pokemonInput);
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`
            );
            if (!response.ok) {
                throw new Error("Pokémon no encontrado");
            }
            const data = await response.json();
            //console.log(data);
            var datatype = data.types
                .map((typeu) => typeu.type.url)
                //console.log(datatype);

            console.log(datatype);

            fetchPokemont(datatype);

            const datoss = fetchPokemont(datatype);
            console.log('datos', datoss);

            pokemonInfo.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><strong>Tipos:</strong> ${data.types
        .map((type) => type.type.name) 
        .join(", ")}</p>
        
         <!-- datos de atake pueden estar aqui-->
        
        
      <p><strong>Habilidades:</strong> ${data.abilities
        .map((ability) => ability.ability.name)
        .join(", ")}</p>
      <p><strong>Estadísticas:</strong></p>
      <ul>
        ${data.stats
          .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
          .join("")}
      </ul>
    `;
  } catch (error) {
    pokemonInfo.innerHTML = `<p>${error.message}</p>`;
  }
};

// Función para obtener y mostrar una lista de Pokémon
const fetchPokemons = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("No se pudieron obtener los Pokémon");
    }
    const data = await response.json();
    totalCount = data.count;
    pokemonList.innerHTML = "";

    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
        ${pokemonData.name}
      `;
      listItem.addEventListener("click", () => fetchPokemon(pokemon.name));
      pokemonList.appendChild(listItem);
    }

    prevButton.disabled = offset === 0;
    nextButton.disabled = offset + limit >= totalCount;
  } catch (error) {
    pokemonList.innerHTML = `<p>${error.message}</p>`;
  }
};

// Manejadores de eventos para los botones de paginación
prevButton.addEventListener("click", () => {
  if (offset - limit >= 0) {
    offset -= limit;
    fetchPokemons();
  }
});

nextButton.addEventListener("click", () => {
  if (offset + limit < totalCount) {
    offset += limit;
    fetchPokemons();
  }
});

// Manejador de evento para el formulario de búsqueda
pokemonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const pokemonInputValue = pokemonInput.value.toLowerCase();
  fetchPokemon(pokemonInputValue);
});

// Cargar Pokémon inicial
fetchPokemons();