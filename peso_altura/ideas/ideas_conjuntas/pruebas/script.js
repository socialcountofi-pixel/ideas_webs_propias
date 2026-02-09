const alturaAsh = 1.69;
const pesoAsh = 40.0;
const MAX_BAR = 200;

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

    actualizarBarrasAnimadas();
    cambiarVista();
  } catch (err) {
    alert(err.message);
  }
}

function cambiarVista() {
  if (!datosPokemon) return;
  document.querySelectorAll(".vista").forEach(v => v.style.display = "none");
  const modo = modoVista.value;

  if (modo === "minimal") {
    document.getElementById("vistaMinimal").style.display = "block";
    vistaMinimal(datosPokemon);
  } else {
    const idVista = `vista${modo.charAt(0).toUpperCase() + modo.slice(1)}`;
    document.getElementById(idVista).style.display = "block";
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

function actualizarBarrasAnimadas() {
  const vistas = ["barras","laterales","conjunta","relleno"];
  vistas.forEach(vista => {
    ["Altura","Peso"].forEach(prop => {
      const ashH = prop==="Altura"? alturaAsh : pesoAsh;
      const pokeH = prop==="Altura"? datosPokemon.altura : datosPokemon.peso;
      const maxH = Math.max(ashH, pokeH);

      const rAsh = document.getElementById(`rellenoAsh${prop}_${vista}`);
      const rPoke = document.getElementById(`rellenoPokemon${prop}_${vista}`);

      if(rAsh) {
        rAsh.classList.add("ash");
        rAsh.style.height = "0px";
        setTimeout(()=> {
          rAsh.style.height = `${(ashH/maxH)*MAX_BAR}px`;
        },50);
      }

      if(rPoke) {
        rPoke.classList.add("pokemon");
        rPoke.style.height = "0px";
        setTimeout(()=> {
          rPoke.style.height = `${(pokeH/maxH)*MAX_BAR}px`;
        },50);
      }

      const tPoke = document.getElementById(`pokemon${prop}Texto_${vista}`);
      if(tPoke) tPoke.textContent = prop==="Altura"? `Altura: ${pokeH.toFixed(2)} m` : `Peso: ${pokeH.toFixed(1)} kg`;

      const tAsh = document.getElementById(`ash${prop}Texto_${vista}`);
      if(tAsh) tAsh.textContent = prop==="Altura"? `Altura: ${ashH} m` : `Peso: ${ashH} kg`;
    });

    const imgAsh = document.getElementById(`ashAlturaImg_${vista}`);
    const imgPoke = document.getElementById(`pokemonAlturaImg_${vista}`);
    if(imgAsh) imgAsh.src = "https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20220628064212/Ash_Masters.png";
    if(imgPoke) imgPoke.src = datosPokemon.img;
  });
}
