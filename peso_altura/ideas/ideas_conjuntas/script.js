const alturaAsh = 1.69;
const pesoAsh = 40.0;
const maxBarHeight = 150;

const ashAlturaImg = document.getElementById("ashAlturaImg");
const ashPesoImg = document.getElementById("ashPesoImg");
const pokemonAlturaImg = document.getElementById("pokemonAlturaImg");
const pokemonPesoImg = document.getElementById("pokemonPesoImg");

const ashAlturaTexto = document.getElementById("ashAlturaTexto");
const ashPesoTexto = document.getElementById("ashPesoTexto");
const pokemonAlturaTexto = document.getElementById("pokemonAlturaTexto");
const pokemonPesoTexto = document.getElementById("pokemonPesoTexto");

const infoDiv = document.getElementById("info");

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

    const nombrePokemon = data.name;
    const alturaPokemon = data.height / 10;
    const pesoPokemon = data.weight / 10;
    const img = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    const imgUrl = await cargarImagen(img);

    pokemonAlturaImg.src = imgUrl;
    pokemonPesoImg.src = imgUrl;

    // --- Texto debajo de imágenes ---
    ashAlturaTexto.textContent = `${alturaAsh.toFixed(2)} m`;
    pokemonAlturaTexto.textContent = `${alturaPokemon.toFixed(2)} m`;

    ashPesoTexto.textContent = `${pesoAsh.toFixed(1)} kg`;
    pokemonPesoTexto.textContent = `${pesoPokemon.toFixed(1)} kg`;

    // --- Info general ---
    infoDiv.innerHTML = `
      <h3>${nombrePokemon.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
      <p><strong>Comparativa de altura:</strong> 
        ${alturaPokemon > alturaAsh ? `${nombrePokemon} es más alto que Ash` :
        alturaPokemon < alturaAsh ? `Ash es más alto que ${nombrePokemon}` : `Tienen la misma altura`}
      </p>
      <p><strong>Comparativa de peso:</strong> 
        ${pesoPokemon > pesoAsh ? `${nombrePokemon} es más pesado que Ash` :
        pesoPokemon < pesoAsh ? `Ash es más pesado que ${nombrePokemon}` : `Tienen el mismo peso`}
      </p>
    `;
  } catch (err) {
    alert(err.message);
  }





  /* barras */

  const barraAlturaAsh = document.getElementById("barraAlturaAsh");
  const barraAlturaPokemon = document.getElementById("barraAlturaPokemon");
  const barraPesoAsh = document.getElementById("barraPesoAsh");
  const barraPesoPokemon = document.getElementById("barraPesoPokemon");

  const ashAlturaImg = document.getElementById("ashAlturaImg");
  const ashPesoImg = document.getElementById("ashPesoImg");

  
  async function cargarImagen(url) {
    return new Promise(resolve => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => resolve("https://via.placeholder.com/150?text=No+Image");
    });
  }

  async function buscarPokemonBarras() {
    const nombre = document.getElementById("pokemonInput").value.toLowerCase().trim();
    if (!nombre) return alert("Introduce nombre o ID de Pokémon");

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      if (!res.ok) throw new Error("Pokémon no encontrado");
      const data = await res.json();

      const nombrePokemon = data.name;
      const alturaPokemon = data.height / 10;
      const pesoPokemon = data.weight / 10;
      const img = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
      const imgUrl = await cargarImagen(img);

      pokemonAlturaImg.src = imgUrl;
      pokemonPesoImg.src = imgUrl;

      // --- Altura barras ---
      barraAlturaAsh.style.height = `${(alturaAsh / Math.max(alturaAsh, alturaPokemon)) * maxBarHeight}px`;
      barraAlturaPokemon.style.height = `${(alturaPokemon / Math.max(alturaAsh, alturaPokemon)) * maxBarHeight}px`;

      // --- Peso barras ---
      barraPesoAsh.style.height = `${(pesoAsh / Math.max(pesoAsh, pesoPokemon)) * maxBarHeight}px`;
      barraPesoPokemon.style.height = `${(pesoPokemon / Math.max(pesoAsh, pesoPokemon)) * maxBarHeight}px`;

      // --- Texto debajo de imágenes ---
      ashAlturaTexto.textContent = `${alturaAsh.toFixed(2)} m`;
      pokemonAlturaTexto.textContent = `${alturaPokemon.toFixed(2)} m`;

      ashPesoTexto.textContent = `${pesoAsh.toFixed(1)} kg`;
      pokemonPesoTexto.textContent = `${pesoPokemon.toFixed(1)} kg`;

      // --- Info general ---
      infoDiv.innerHTML = `
      <h3>${nombrePokemon.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
      <p><strong>Comparativa de altura:</strong> 
        ${alturaPokemon > alturaAsh ? `${nombrePokemon} es más alto que Ash` :
          alturaPokemon < alturaAsh ? `Ash es más alto que ${nombrePokemon}` : `Tienen la misma altura`}
      </p>
      <p><strong>Comparativa de peso:</strong> 
        ${pesoPokemon > pesoAsh ? `${nombrePokemon} es más pesado que Ash` :
          pesoPokemon < pesoAsh ? `Ash es más pesado que ${nombrePokemon}` : `Tienen el mismo peso`}
      </p>
    `;
    } catch (err) {
      alert(err.message);
    }
  }



}