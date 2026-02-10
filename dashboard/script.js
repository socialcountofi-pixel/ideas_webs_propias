 
/* function de los tipos */
const tipos = document.getElementById("tipo");

tipos.addEventListener("click", () => {
  cargarTipos();
});

function cargarTipos() {
  const url = `https://pokeapi.co/api/v2/type/`;
 fetch
    
}

/* submenu 1 cargamos los datos de ese pokemon */
function cargarPokemonTipos(tipos) {
  fetch(tipos)
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
