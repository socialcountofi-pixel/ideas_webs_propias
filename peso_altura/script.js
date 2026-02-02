/*index */

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


const rellenoAshAltura = document.getElementById("rellenoAshAltura");
const rellenoPokemonAltura = document.getElementById("rellenoPokemonAltura");
const rellenoAshPeso = document.getElementById("rellenoAshPeso");
const rellenoPokemonPeso = document.getElementById("rellenoPokemonPeso");


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
 return data;
 buscarPokemon1(data);buscarPokemon2(data);buscarPokemon3(data);buscarPokemon4(data);

 
  }catch(err){
    alert(err.message);
  }
}

async function buscarPokemon1(datos){
   

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
/*index 5 */


async function buscarPokemon2(datos) {
    const alturaPokemon = data.height / 10;
    const pesoPokemon = data.weight / 10;
    const imgUrl = data.sprites.other["official-artwork"].front_default || data.sprites.front_default || "https://via.placeholder.com/150";

    actualizarAltura(alturaPokemon, imgUrl);
    actualizarPeso(pesoPokemon, imgUrl);

    infoDiv.innerHTML = `
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

  ashAlturaImg.style.height = `${(alturaAsh/alturaMax)*maxAlturaPx}px`;
  pokemonAlturaImg.style.height = `${(alturaPokemon/alturaMax)*maxAlturaPx}px`;
  pokemonAlturaImg.src = imgUrl;

  // Posición absoluta desde bottom
  ashAlturaImg.style.bottom = `0px`;
  pokemonAlturaImg.style.bottom = `0px`;
}

function actualizarPeso(pesoPokemon, imgUrl) {
  const maxPesoPx = 300; 
  const pesoMax = Math.max(pesoAsh, pesoPokemon);

  ashPesoImg.style.height = `${(pesoAsh/pesoMax)*maxPesoPx}px`;
  pokemonPesoImg.style.height = `${(pesoPokemon/pesoMax)*maxPesoPx}px`;
  pokemonPesoImg.src = imgUrl;

  ashPesoImg.style.bottom = `0px`;
  pokemonPesoImg.style.bottom = `0px`;
}

/*index 6 */

async function buscarPokemon3(datos){

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

    // --- Info ---
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

/*index 7 */


async function buscarPokemon4(datos) {
  
    const alturaPokemon = data.height / 10;
    const pesoPokemon = data.weight / 10;
    const imgUrl = data.sprites.other["official-artwork"].front_default || data.sprites.front_default || "https://via.placeholder.com/150";

    actualizarAltura(alturaPokemon, imgUrl);
    actualizarPeso(pesoPokemon, imgUrl);

    infoDiv.innerHTML = `
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
  const maxAltura = 300; 
  const alturaMax = Math.max(alturaAsh, alturaPokemon);

  rellenoAshAltura.style.height = `${(alturaAsh/alturaMax)*maxAltura}px`;
  rellenoPokemonAltura.style.height = `${(alturaPokemon/alturaMax)*maxAltura}px`;

  ashAlturaImg.style.height = `${(alturaAsh/alturaMax)*maxAltura}px`;
  pokemonAlturaImg.style.height = `${(alturaPokemon/alturaMax)*maxAltura}px`;
  pokemonAlturaImg.src = imgUrl;

  pokemonAlturaTexto.textContent = `Altura: ${alturaPokemon.toFixed(2)} m`;
}

function actualizarPeso(pesoPokemon, imgUrl) {
  const maxPeso = 300; 
  const pesoMax = Math.max(pesoAsh, pesoPokemon);

  rellenoAshPeso.style.height = `${(pesoAsh/pesoMax)*maxPeso}px`;
  rellenoPokemonPeso.style.height = `${(pesoPokemon/pesoMax)*maxPeso}px`;

  ashPesoImg.style.height = `${(pesoAsh/pesoMax)*maxPeso}px`;
  pokemonPesoImg.style.height = `${(pesoPokemon/pesoMax)*maxPeso}px`;
  pokemonPesoImg.src = imgUrl;

  pokemonPesoTexto.textContent = `Peso: ${pesoPokemon.toFixed(1)} kg`;
}
