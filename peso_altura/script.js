const alturaAsh = 1.69;
const pesoAsh = 40.0;
const maxBarHeight = 150;

const barraAlturaAsh = document.getElementById("barraAlturaAsh");
const barraAlturaPokemon = document.getElementById("barraAlturaPokemon");
const barraPesoAsh = document.getElementById("barraPesoAsh");
const barraPesoPokemon = document.getElementById("barraPesoPokemon");

const ashAlturaImg = document.getElementById("ashAlturaImg");
const ashPesoImg = document.getElementById("ashPesoImg");
const pokemonAlturaImg = document.getElementById("pokemonAlturaImg");
const pokemonPesoImg = document.getElementById("pokemonPesoImg");

const ashAlturaTexto = document.getElementById("ashAlturaTexto");
const ashPesoTexto = document.getElementById("ashPesoTexto");
const pokemonAlturaTexto = document.getElementById("pokemonAlturaTexto");
const pokemonPesoTexto = document.getElementById("pokemonPesoTexto");

const infoDiv = document.getElementById("info");

async function cargarImagen(url){
  return new Promise(resolve=>{
    const img = new Image();
    img.src = url;
    img.onload = ()=>resolve(url);
    img.onerror = ()=>resolve("https://via.placeholder.com/150?text=No+Image");
  });
}

async function buscarPokemon(){
const nombre = document.getElementById("pokemonInput").value.toLowerCase().trim();
  if(!nombre) return alert("Introduce nombre o ID de Pokémon");
  
  try{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if(!res.ok) throw new Error("Pokémon no encontrado");
    const data = await res.json();
    MostrarPokemon(data);
    MostrarPokemon2(data);
    MostrarPokemon3(data);

    return data; 
    
    }catch(err){
    alert(err.message);
  }
}
async function MostrarPokemon(data){

    const nombrePokemon = data.name;
    const alturaPokemon = data.height/10;
    const pesoPokemon = data.weight/10;
    const img = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    const imgUrl = await cargarImagen(img);

    pokemonAlturaImg.src = imgUrl;
    pokemonPesoImg.src = imgUrl;

    // --- Altura barras ---
    barraAlturaAsh.style.height = `${(alturaAsh/Math.max(alturaAsh,alturaPokemon))*maxBarHeight}px`;
    barraAlturaPokemon.style.height = `${(alturaPokemon/Math.max(alturaAsh,alturaPokemon))*maxBarHeight}px`;

    // --- Peso barras ---
    barraPesoAsh.style.height = `${(pesoAsh/Math.max(pesoAsh,pesoPokemon))*maxBarHeight}px`;
    barraPesoPokemon.style.height = `${(pesoPokemon/Math.max(pesoAsh,pesoPokemon))*maxBarHeight}px`;

    // --- Texto debajo de imágenes ---
    ashAlturaTexto.textContent = `${alturaAsh.toFixed(2)} m`;
    pokemonAlturaTexto.textContent = `${alturaPokemon.toFixed(2)} m`;

    ashPesoTexto.textContent = `${pesoAsh.toFixed(1)} kg`;
    pokemonPesoTexto.textContent = `${pesoPokemon.toFixed(1)} kg`;

    // --- Info general ---
    infoDiv.innerHTML=`
      <h3>${nombrePokemon.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
      <p><strong>Comparativa de altura:</strong> 
        ${alturaPokemon>alturaAsh?`${nombrePokemon} es más alto que Ash`:
          alturaPokemon<alturaAsh?`Ash es más alto que ${nombrePokemon}`:`Tienen la misma altura`}
      </p>
      <p><strong>Comparativa de peso:</strong> 
        ${pesoPokemon>pesoAsh?`${nombrePokemon} es más pesado que Ash`:
          pesoPokemon<pesoAsh?`Ash es más pesado que ${nombrePokemon}`:`Tienen el mismo peso`}
      </p>
    `;
}

/*caso2 */

const ashAlturaImg2 = document.getElementById("ashAlturaImg2");
const pokemonAlturaImg2 = document.getElementById("pokemonAlturaImg2");
const ashPesoImg2 = document.getElementById("ashPesoImg2");
const pokemonPesoImg2 = document.getElementById("pokemonPesoImg2");
const infoDiv2 = document.getElementById("info2");

async function MostrarPokemon2(data) {

    const alturaPokemon = data.height / 10;
    const pesoPokemon = data.weight / 10;
    const imgUrl = data.sprites.other["official-artwork"].front_default || data.sprites.front_default || "https://via.placeholder.com/150";

    actualizarAltura(alturaPokemon, imgUrl);
    actualizarPeso(pesoPokemon, imgUrl);

    infoDiv2.innerHTML = `
      <h3>${data.name.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
      <p><strong>Comparativa de altura:</strong> 
        ${alturaPokemon > alturaAsh ? `Más alto que Ash` : alturaPokemon < alturaAsh ? `Ash es más alto` : `Misma altura`}
      </p>
      <p><strong>Comparativa de peso:</strong> 
        ${pesoPokemon > pesoAsh ? `Más pesado que Ash` : pesoPokemon < pesoAsh ? `Ash es más pesado` : `Mismo peso`}
      </p>
    `;
}

function actualizarAltura(alturaPokemon, imgUrl) {
  const maxAlturaPx = 300; 
  const alturaMax = Math.max(alturaAsh, alturaPokemon);

  ashAlturaImg2.style.height = `${(alturaAsh/alturaMax)*maxAlturaPx}px`;
  pokemonAlturaImg2.style.height = `${(alturaPokemon/alturaMax)*maxAlturaPx}px`;
  pokemonAlturaImg2.src = imgUrl;

  // Posición absoluta desde bottom
  ashAlturaImg2.style.bottom = `0px`;
  pokemonAlturaImg2.style.bottom = `0px`;
}

function actualizarPeso(pesoPokemon, imgUrl) {
  const maxPesoPx = 300; 
  const pesoMax = Math.max(pesoAsh, pesoPokemon);

  ashPesoImg2.style.height = `${(pesoAsh/pesoMax)*maxPesoPx}px`;
  pokemonPesoImg2.style.height = `${(pesoPokemon/pesoMax)*maxPesoPx}px`;
  pokemonPesoImg2.src = imgUrl;

  ashPesoImg2.style.bottom = `0px`;
  pokemonPesoImg2.style.bottom = `0px`;
}

/*caso3*/
 
const barraAlturaAsh3 = document.getElementById("barraAlturaAsh3");
const barraAlturaPokemon3 = document.getElementById("barraAlturaPokemon3");
const barraPesoAsh3 = document.getElementById("barraPesoAsh3");
const barraPesoPokemon3 = document.getElementById("barraPesoPokemon3");

const ashAlturaImg3 = document.getElementById("ashAlturaImg3");
const ashPesoImg3 = document.getElementById("ashPesoImg3");
const pokemonAlturaImg3 = document.getElementById("pokemonAlturaImg3");
const pokemonPesoImg3 = document.getElementById("pokemonPesoImg3");

const infoDiv3 = document.getElementById("info3");


async function MostrarPokemon3(data){
  
    const nombrePokemon = data.name;
    const alturaPokemon = data.height/10;
    const pesoPokemon = data.weight/10;
    const img = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    const imgUrl = await cargarImagen(img);

    pokemonAlturaImg3.src = imgUrl;
    pokemonPesoImg3.src = imgUrl;

    // --- Altura barras ---
    barraAlturaAsh3.style.height = `${(alturaAsh/Math.max(alturaAsh,alturaPokemon))*maxBarHeight}px`;
    barraAlturaPokemon3.style.height = `${(alturaPokemon/Math.max(alturaAsh,alturaPokemon))*maxBarHeight}px`;

    // --- Peso barras ---
    barraPesoAsh3.style.height = `${(pesoAsh/Math.max(pesoAsh,pesoPokemon))*maxBarHeight}px`;
    barraPesoPokemon3.style.height = `${(pesoPokemon/Math.max(pesoAsh,pesoPokemon))*maxBarHeight}px`;

    // --- Info ---
    infoDiv3.innerHTML=`
      <h3>${nombrePokemon.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
      <p><strong>Comparativa de altura:</strong> 
        ${alturaPokemon>alturaAsh?`${nombrePokemon} es más alto que Ash`:
          alturaPokemon<alturaAsh?`Ash es más alto que ${nombrePokemon}`:`Tienen la misma altura`}
      </p>
      <p><strong>Comparativa de peso:</strong> 
        ${pesoPokemon>pesoAsh?`${nombrePokemon} es más pesado que Ash`:
          pesoPokemon<pesoAsh?`Ash es más pesado que ${nombrePokemon}`:`Tienen el mismo peso`}
      </p>
    `;
  
}