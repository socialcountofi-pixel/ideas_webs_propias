const alturaAsh = 1.69;
const pesoAsh = 40.0;
const maxBarHeight = 150;

const alturaAshBar = document.getElementById("alturaAsh");
const alturaPokemonBar = document.getElementById("alturaPokemon");
const pesoAshBar = document.getElementById("pesoAsh");
const pesoPokemonBar = document.getElementById("pesoPokemon");

const ashAlturaImg = document.getElementById("ashAlturaImg");
const ashPesoImg = document.getElementById("ashPesoImg");
const pokemonAlturaImg = document.getElementById("pokemonAlturaImg");
const pokemonPesoImg = document.getElementById("pokemonPesoImg");

const infoDiv = document.getElementById("info");
const modoVistaSelect = document.getElementById("modoVista");
const comparadorDiv = document.getElementById("comparador");

// Cambiar clase de vista
function cambiarVista() {
  const modo = modoVistaSelect.value;
  comparadorDiv.className = modo;
}

// Cargar imagen segura
async function cargarImagen(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => resolve("https://via.placeholder.com/150?text=No+Image");
  });
}

async function buscarPokemon() {
  const nombre = document.getElementById("pokemonInput").value.toLowerCase().trim();
  if (!nombre) return alert("Introduce nombre o ID de Pokémon");

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const data = await res.json();

    const alturaPokemon = data.height / 10;
    const pesoPokemon = data.weight / 10;
    const imgUrl = await cargarImagen(data.sprites.other["official-artwork"].front_default || data.sprites.front_default);

    // Actualizar barras
    alturaAshBar.style.height = `${(alturaAsh / Math.max(alturaAsh, alturaPokemon)) * maxBarHeight}px`;
    alturaPokemonBar.style.height = `${(alturaPokemon / Math.max(alturaAsh, alturaPokemon)) * maxBarHeight}px`;
    pesoAshBar.style.height = `${(pesoAsh / Math.max(pesoAsh, pesoPokemon)) * maxBarHeight}px`;
    pesoPokemonBar.style.height = `${(pesoPokemon / Math.max(pesoAsh, pesoPokemon)) * maxBarHeight}px`;

    // Actualizar imágenes
    pokemonAlturaImg.src = imgUrl;
    pokemonPesoImg.src = imgUrl;

    // Información final
    infoDiv.innerHTML = `
      <h3>${data.name.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
      <p><strong>Comparativa de altura:</strong> ${
        alturaPokemon > alturaAsh ? "Pokémon es más alto que Ash" :
        alturaPokemon < alturaAsh ? "Ash es más alto" : "Tienen la misma altura"
      }</p>
      <p><strong>Comparativa de peso:</strong> ${
        pesoPokemon > pesoAsh ? "Pokémon es más pesado que Ash" :
        pesoPokemon < pesoAsh ? "Ash es más pesado" : "Tienen el mismo peso"
      }</p>
    `;
  } catch (err) {
    alert(err.message);
  }
}
