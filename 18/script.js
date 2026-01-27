// Base URL de la API de Digimon
const apiBase = "https://digi-api.com/api/v1";

// Obtener referencias a los elementos del DOM
const searchBtn = document.getElementById("searchBtn"); // Botón de buscar
const input = document.getElementById("digimonInput"); // Input donde se escribe el nombre o ID del Digimon
const infoSection = document.getElementById("digimonInfo"); // Sección donde se muestra la info del Digimon
const errorMsg = document.getElementById("errorMsg"); // Mensaje de error
const prevBtn = document.getElementById("prevBtn"); // Botón anterior
const nextBtn = document.getElementById("nextBtn"); // Botón siguiente

// Mapeo de niveles de Digimon a un número para poder ordenarlos
const nivelOrden = {
  "Baby I": 1,
  "Baby II": 2,
  "Child": 3,
  "Adult": 4,
  "Perfect": 5,
  "Hybrid": 6
};

let currentId = 1; // ID actual del Digimon mostrado

// ========================= EVENTOS ========================= //

// Evento click del botón de buscar
searchBtn.addEventListener("click", () => {
  const query = input.value.trim().toLowerCase(); // Tomar valor del input y limpiar espacios
  fetchDigimon(query || currentId); // Buscar por nombre o ID actual si no hay input
});

// Permitir buscar presionando "Enter"
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// Botón anterior: decrementa el ID y busca el Digimon previo
prevBtn.addEventListener("click", () => {
  if (currentId > 1) {
    currentId--;
    fetchDigimon(currentId);
  }
});

// Botón siguiente: incrementa el ID y busca el Digimon siguiente
nextBtn.addEventListener("click", () => {
  currentId++;
  fetchDigimon(currentId);
});

// ========================= FUNCIONES ========================= //

// Función para obtener datos adicionales de una categoría (nivel, tipo, skill, etc.)
async function fetchExtraData(category, identifier) {
  try {
    const res = await fetch(`${apiBase}/${category}/${identifier}`);
    if (!res.ok) return null; // Si no hay datos, retorna null
    return await res.json(); // Devuelve los datos como JSON
  } catch (err) {
    console.error(`Error fetch ${category}:`, err);
    return null; // Si hay error, retorna null
  }
}

// Función principal para obtener datos de un Digimon por nombre o ID
async function fetchDigimon(identifier) {
  try {
    errorMsg.classList.add("hidden"); // Oculta el mensaje de error
    fadeOut(); // Animación de desaparición de la info anterior

    const res = await fetch(`${apiBase}/digimon/${identifier}`);
    if (!res.ok) throw new Error("No se encontró el Digimon"); // Si no existe
    const digimon = await res.json();

    currentId = digimon.id; // Actualiza el ID actual
    await displayDigimon(digimon); // Muestra la información
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove("hidden"); // Muestra mensaje de error
    console.error(err);
  }
}

// Función que muestra la información del Digimon en el DOM
async function displayDigimon(digimon) {
  const { id, name, images, levels, types, attributes, fields, skills, priorEvolutions, nextEvolutions } = digimon;

  document.getElementById("digiId").textContent = id; // Mostrar ID
  document.getElementById("digiName").textContent = name; // Mostrar nombre

  // ========================= IMÁGENES ========================= //
  const imgContainer = document.getElementById("digiImageContainer");
  imgContainer.innerHTML = ""; // Limpiar imágenes previas
  if (images?.length) {
    for (const img of images) {
      const imgEl = document.createElement("img");
      imgEl.src = img.href; // URL de la imagen
      imgEl.alt = name; // Texto alternativo
      imgEl.style.width = "150px"; // Tamaño
      imgEl.style.margin = "5px"; // Espaciado
      imgContainer.appendChild(imgEl);
    }
  }

  // ========================= LISTADOS ========================= //
  // Listas de niveles, tipos, atributos, campos y habilidades
  const listMappings = [
    { id: "digiLevels", data: levels, category: "level", nameKey: "level" },
    { id: "digiTypes", data: types, category: "type", nameKey: "type" },
    { id: "digiAttributes", data: attributes, category: "attribute", nameKey: "attribute" },
    { id: "digiFields", data: fields, category: "field", nameKey: "field" },
    { id: "digiSkills", data: skills, category: "skill", nameKey: "skill", translation: true }
  ];

  for (const { id: containerId, data, category, nameKey, translation } of listMappings) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Limpiar lista anterior
    if (!data?.length) continue;

    for (const item of data) {
      const extra = await fetchExtraData(category, item[nameKey]); // Obtener info extra
      const li = document.createElement("li");

      // Texto de cada item con traducción y descripción si existe
      let text = `${item[nameKey]}`;
      if (translation && extra?.translation) text += ` <em>(${extra.translation})</em>`;
      text += ` - ${extra?.description || item.description || ""}`;

      li.innerHTML = text;

      // Añadir imagen si existe
      if (extra?.image || extra?.href) {
        const img = document.createElement("img");
        img.src = extra.image || extra.href;
        img.alt = item[nameKey];
        img.style.width = "50px";
        img.style.marginLeft = "5px";
        li.appendChild(img);
      }

      container.appendChild(li);
    }
  }

  // ========================= EVOLUCIONES ========================= //
  // Función interna para crear un slider de evoluciones
  async function crearEvolucionesSlider(evoluciones, contenedorId) {
    const container = document.getElementById(contenedorId);
    if (!container) return;
    container.innerHTML = "";

    // Obtener el nivel de cada Digimon de la evolución
    for (const evo of evoluciones) {
      try {
        const res = await fetch(`${apiBase}/digimon/${evo.id}`);
        if (res.ok) {
          const data = await res.json();
          evo.levelValue = data.levels?.[0]?.level || "Desconocido";
        } else {
          evo.levelValue = "Desconocido";
        }
      } catch (err) {
        console.error(`Error fetch nivel de ${evo.digimon}:`, err);
        evo.levelValue = "Desconocido";
      }
    }

    // Ordenar evoluciones por nivel
    evoluciones.sort((a, b) => (nivelOrden[a.levelValue] || 0) - (nivelOrden[b.levelValue] || 0));

    // Crear slider con botones
    const wrapper = document.createElement("div");
    wrapper.classList.add("slider-wrapper");

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("slider-btn", "prev");
    prevBtn.innerHTML = "◀";

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("slider-btn", "next");
    nextBtn.innerHTML = "▶";

    const slider = document.createElement("div");
    slider.classList.add("evolution-slider");

    // Crear tarjeta para cada evolución
    for (const evo of evoluciones) {
      const card = document.createElement("div");
      card.classList.add("evolution-card");
      card.innerHTML = `
        <h4>${evo.digimon}</h4>
        <p><strong>Condición:</strong> ${evo.condition}</p>
        <p><strong>Nivel:</strong> ${evo.levelValue}</p>
      `;
      if (evo.image) {
        const img = document.createElement("img");
        img.src = evo.image;
        img.alt = evo.digimon;
        card.appendChild(img);
      }
      slider.appendChild(card);
    }

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(slider);
    wrapper.appendChild(nextBtn);
    container.appendChild(wrapper);

    // Eventos para scroll del slider
    prevBtn.addEventListener("click", () => slider.scrollBy({ left: -200, behavior: "smooth" }));
    nextBtn.addEventListener("click", () => slider.scrollBy({ left: 200, behavior: "smooth" }));
  }

  if (priorEvolutions?.length) await crearEvolucionesSlider(priorEvolutions, "priorEvolutions");
  if (nextEvolutions?.length) await crearEvolucionesSlider(nextEvolutions, "nextEvolutions");

  fadeIn(); // Animación de aparición de info
}

// ========================= ANIMACIONES ========================= //
function fadeIn() {
  infoSection.classList.remove("hidden");
  setTimeout(() => infoSection.classList.add("visible"), 100); // Aparece suavemente
}

function fadeOut() {
  infoSection.classList.remove("visible");
  setTimeout(() => infoSection.classList.add("hidden"), 400); // Desaparece suavemente
}

// ========================= INICIO ========================= //
// Cargar el primer Digimon al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  fetchDigimon(currentId);
});
