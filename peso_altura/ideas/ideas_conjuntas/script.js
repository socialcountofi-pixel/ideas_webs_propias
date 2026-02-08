/* =====================================================
   JavaScript completo para Comparador Pokémon
   Funciona con todas las vistas sin fallos
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     DATOS FIJOS (NO CAMBIAN)
  ==================================================== */
  const alturaAsh = 1.69;
  const pesoAsh = 40.0;
  const MAX_BAR = 300;

  /* =====================================================
     ESTADO GLOBAL
  ==================================================== */
  let datosPokemon = null;

  /* =====================================================
     REFERENCIAS GENERALES
  ==================================================== */
  const pokemonInput = document.getElementById("pokemonInput");
  const modoVista = document.getElementById("modoVista");
  const infoDiv = document.getElementById("info");
  const resultadoMinimal = document.getElementById("resultadoMinimal");

  // Barras y fotos (relleno, laterales, conjunta)
  const ashAlturaImg = document.getElementById("ashAlturaImg");
  const ashPesoImg = document.getElementById("ashPesoImg");
  const pokemonAlturaImg = document.getElementById("pokemonAlturaImg");
  const pokemonPesoImg = document.getElementById("pokemonPesoImg");

  const rellenoAshAltura = document.getElementById("rellenoAshAltura");
  const rellenoPokemonAltura = document.getElementById("rellenoPokemonAltura");
  const rellenoAshPeso = document.getElementById("rellenoAshPeso");
  const rellenoPokemonPeso = document.getElementById("rellenoPokemonPeso");

  const pokemonAlturaTexto = document.getElementById("pokemonAlturaTexto");
  const pokemonPesoTexto = document.getElementById("pokemonPesoTexto");

  /* =====================================================
     UTILIDAD: cargar imagen segura
  ==================================================== */
  async function cargarImagen(url) {
    return new Promise(resolve => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => resolve("https://via.placeholder.com/150?text=No+Image");
    });
  }

  /* =====================================================
     FUNCIÓN PRINCIPAL (global)
  ==================================================== */
  window.buscarPokemon = async function() {
    const nombre = pokemonInput.value.trim().toLowerCase();
    if (!nombre) { alert("Introduce un nombre o ID de Pokémon"); return; }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      if (!res.ok) throw new Error("Pokémon no encontrado");
      const data = await res.json();

      const imgUrl = await cargarImagen(
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default
      );

      datosPokemon = {
        nombre: data.name,
        altura: data.height / 10,
        peso: data.weight / 10,
        img: imgUrl,
        id: data.id
      };

      infoDiv.innerHTML = `<h3>${data.name.toUpperCase()}</h3><p><strong>ID Pokédex:</strong> ${data.id}</p>`;
      cambiarVista();

    } catch(err) {
      alert(err.message);
    }
  }

  /* =====================================================
     CONTROL DE VISTAS (global)
  ==================================================== */
  window.cambiarVista = function() {
    if (!datosPokemon) return;
    document.querySelectorAll(".vista").forEach(v => v.style.display = "none");
    const modo = modoVista.value;

    if (modo === "minimal") { document.getElementById("vistaMinimal").style.display = "block"; vistaMinimal(datosPokemon); }
    if (modo === "barras") { document.getElementById("vistaBarras").style.display = "block"; vistaBarras(datosPokemon); }
    if (modo === "laterales") { document.getElementById("vistaLaterales").style.display = "block"; vistaLaterales(datosPokemon); }
    if (modo === "conjunta") { document.getElementById("vistaConjunta").style.display = "block"; vistaConjunta(datosPokemon); }
    if (modo === "relleno") { document.getElementById("vistaRelleno").style.display = "block"; vistaRelleno(datosPokemon); }
  }

  /* =====================================================
     VISTA 1: MINIMAL
  ==================================================== */
  function vistaMinimal(d) {
    if (d.altura > alturaAsh) {
      resultadoMinimal.innerHTML = `🟢 <b>${d.nombre}</b> es más grande que Ash`;
    } else if (d.altura < alturaAsh) {
      resultadoMinimal.innerHTML = `🔵 Ash es más grande que <b>${d.nombre}</b>`;
    } else {
      resultadoMinimal.innerHTML = `⚖️ Ash y <b>${d.nombre}</b> miden lo mismo`;
    }
  }

  /* =====================================================
     VISTA 2: BARRAS SEPARADAS
  ==================================================== */
  function vistaBarras(d) {
    pokemonAlturaImg.src = d.img;
    pokemonPesoImg.src = d.img;

    pokemonAlturaTexto.textContent = `${d.altura.toFixed(2)} m`;
    pokemonPesoTexto.textContent = `${d.peso.toFixed(1)} kg`;
  }

  /* =====================================================
     VISTA 3: BARRAS LATERALES
  ==================================================== */
  function vistaLaterales(d) {
    const hMax = Math.max(alturaAsh, d.altura);
    const pMax = Math.max(pesoAsh, d.peso);

    pokemonAlturaImg.src = d.img;
    pokemonPesoImg.src = d.img;

    document.getElementById("barraAlturaAsh").style.height = `${(alturaAsh/hMax)*MAX_BAR}px`;
    document.getElementById("barraAlturaPokemon").style.height = `${(d.altura/hMax)*MAX_BAR}px`;
    document.getElementById("barraPesoAsh").style.height = `${(pesoAsh/pMax)*MAX_BAR}px`;
    document.getElementById("barraPesoPokemon").style.height = `${(d.peso/pMax)*MAX_BAR}px`;
  }

  /* =====================================================
     VISTA 4: BARRA CONJUNTA
  ==================================================== */
  function vistaConjunta(d) {
    const hMax = Math.max(alturaAsh, d.altura);
    const pMax = Math.max(pesoAsh, d.peso);

    ashAlturaImg.style.height = `${(alturaAsh/hMax)*MAX_BAR}px`;
    pokemonAlturaImg.style.height = `${(d.altura/hMax)*MAX_BAR}px`;
    ashPesoImg.style.height = `${(pesoAsh/pMax)*MAX_BAR}px`;
    pokemonPesoImg.style.height = `${(d.peso/pMax)*MAX_BAR}px`;

    pokemonAlturaImg.src = d.img;
    pokemonPesoImg.src = d.img;
  }

  /* =====================================================
     VISTA 5: BARRAS CON RELLENO
  ==================================================== */
  function vistaRelleno(d) {
    const hMax = Math.max(alturaAsh, d.altura);
    const pMax = Math.max(pesoAsh, d.peso);

    rellenoAshAltura.style.height = `${(alturaAsh/hMax)*MAX_BAR}px`;
    rellenoPokemonAltura.style.height = `${(d.altura/hMax)*MAX_BAR}px`;
    rellenoAshPeso.style.height = `${(pesoAsh/pMax)*MAX_BAR}px`;
    rellenoPokemonPeso.style.height = `${(d.peso/pMax)*MAX_BAR}px`;

    pokemonAlturaImg.src = d.img;
    pokemonPesoImg.src = d.img;

    pokemonAlturaTexto.textContent = `Altura: ${d.altura.toFixed(2)} m`;
    pokemonPesoTexto.textContent = `Peso: ${d.peso.toFixed(1)} kg`;
  }

});
