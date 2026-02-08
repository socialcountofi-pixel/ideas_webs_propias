const alturaAsh = 1.69;
const pesoAsh = 40.0;
const MAX_BAR = 300;

let datosPokemon = null;

const pokemonInput = document.getElementById("pokemonInput");
const modoVista = document.getElementById("modoVista");
const infoDiv = document.getElementById("info");
const resultadoMinimal = document.getElementById("resultadoMinimal");

async function cargarImagen(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => resolve("https://via.placeholder.com/150?text=No+Image");
  });
}

async function buscarPokemon() {
  const nombre = pokemonInput.value.trim().toLowerCase();
  if (!nombre) return alert("Introduce nombre o ID de Pokémon");

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const data = await res.json();

    const imgUrl = await cargarImagen(
      data.sprites.other["official-artwork"].front_default || data.sprites.front_default
    );

    datosPokemon = {
      nombre: data.name,
      altura: data.height / 10,
      peso: data.weight / 10,
      img: imgUrl,
      id: data.id
    };

    infoDiv.innerHTML = `
      <h3>${data.name.toUpperCase()}</h3>
      <p><strong>ID Pokédex:</strong> ${data.id}</p>
    `;

    actualizarImagenes();
    cambiarVista();
  } catch (err) {
    alert(err.message);
  }
}

function actualizarImagenes() {
  const vistas = ["barras", "laterales", "conjunta", "relleno"];
  vistas.forEach(vista => {
    document.getElementById(`pokemonAlturaImg_${vista}`).src = datosPokemon.img;
    document.getElementById(`pokemonPesoImg_${vista}`).src = datosPokemon.img;

    document.getElementById(`ashAlturaImg_${vista}`).src = "https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20220628064212/Ash_Masters.png";
    document.getElementById(`ashPesoImg_${vista}`).src = "https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20220628064212/Ash_Masters.png";

    if (document.getElementById(`pokemonAlturaTexto_${vista}`))
      document.getElementById(`pokemonAlturaTexto_${vista}`).textContent = `Altura: ${datosPokemon.altura.toFixed(2)} m`;
    if (document.getElementById(`pokemonPesoTexto_${vista}`))
      document.getElementById(`pokemonPesoTexto_${vista}`).textContent = `Peso: ${datosPokemon.peso.toFixed(1)} kg`;
  });
}

function cambiarVista() {
  if (!datosPokemon) return;

  document.querySelectorAll(".vista").forEach(v => v.style.display = "none");
  const modo = modoVista.value;

  if (modo === "minimal") {
    document.getElementById("vistaMinimal").style.display = "block";
    vistaMinimal(datosPokemon);
  } else if (modo === "barras") {
    document.getElementById("vistaBarras").style.display = "block";
  } else if (modo === "laterales") {
    document.getElementById("vistaLaterales").style.display = "block";
  } else if (modo === "conjunta") {
    document.getElementById("vistaConjunta").style.display = "block";
  } else if (modo === "relleno") {
    document.getElementById("vistaRelleno").style.display = "block";
  }
}

function vistaMinimal(d) {
  if (d.altura > alturaAsh)
    resultadoMinimal.innerHTML = `🟢 <b>${d.nombre}</b> es más grande que Ash`;
  else if (d.altura < alturaAsh)
    resultadoMinimal.innerHTML = `🔵 Ash es más grande que <b>${d.nombre}</b>`;
  else
    resultadoMinimal.innerHTML = `⚖️ Ash y <b>${d.nombre}</b> miden lo mismo`;
}
