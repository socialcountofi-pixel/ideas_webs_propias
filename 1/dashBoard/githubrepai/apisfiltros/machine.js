 import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
 import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
 /// ====================================================
 // FUNCIONES DE FETCH - APIS
 // ====================================================

 export
 /**
  *  Obtiene todas los  contadores machine
  */
 async function fetchMachines() {
     if (cache.machine) return cache.machine;
     try {
         // Aumentamos el límite para que no carguen solo 2, sino todas las MTs
         const response = await fetch(`${API_BASE}/machine/?limit=2212`);
         const data = await response.json();
         cache.machine = data.results;
         return data.results;
     } catch (error) {
         console.error("Error fetching machine:", error);
         return [];
     }
 }

 // ====================================================
 // FUNCIONES DE ACTUALIZACIÃ“N DE DATA
 // ====================================================

 export async function loadMenusma() {
     const selectMT = document.getElementById("machinesFilter");
     const selectGen = document.getElementById("machinesDatos");
     if (!selectMT || !selectGen) return;

     // 1. Cargamos la lista inicial en la caché

     const machinesList = await fetchMachines();
     const nombresVistos = new Set();
     selectMT.innerHTML = '<option value="">Selecciona MT</option>';
     selectGen.innerHTML = '<option value="">Esperando MT...</option>';

     // 2. Llenamos el primer SELECT con nombres únicos (TM01, TM02...)
     // Usamos el ID de la URL para que sea instantáneo y no se bloquee
     //solucionar ya que no muestra el nmbre sino el id e inventa el nombre  m.url.split('/').filter(Boolean).pop();
     machinesList.forEach(m => {

         const id = m.url.split('/').filter(Boolean).pop();
         const nombreVisible = `TM${id.padStart(2, '0')}`;

         if (!nombresVistos.has(nombreVisible)) {
             nombresVistos.add(nombreVisible);
             const opt = new Option(nombreVisible, id); // Value = ID, Text = TM01

             selectMT.add(opt);
         }
     });

     // 3. EVENTO: Al elegir la MT, cargamos sus GENERACIONES en el segundo select

     selectMT.onchange = async(e) => {
         const idMT = e.target.value;
         if (!idMT) return;


         selectGen.innerHTML = '<option>Cargando versiones...</option>';

         try { // Buscamos los datos reales de esa máquina específica
             const r = await fetch(`${API_BASE}/machine/${idMT}/`);
             const res = await r.json();

             // Limpiamos y llenamos el segundo select con la generación (version_group)

             selectGen.innerHTML = '<option value="">Selecciona Versión</option>'; // Usamos la ruta que tú confirmaste: res.version_group.name
             const opt = new Option(res.version_group.name.toUpperCase(), `${API_BASE}/machine/${idMT}/`);
             selectGen.add(opt);
             console.log(`MT detectada: ${res.item.name}`);
         } catch (err) { console.error("Error al cargar generación:", err); }
     };

     // 4. EVENTO FINAL: Al elegir la generación, mostramos los Pokémon

     selectGen.onchange = (e) => {
         const urlFinal = e.target.value;
         if (urlFinal) {
             console.log('ha pulsado la mt: ', urlFinal);
             datosmachine(urlFinal);
         }
     };
 }

 export
 /**
  * Carga los datos de la machine
  */
 async function datosmachine(s) {

     const machines = await fetch(s).then((r) => r.json());
     console.log('s', s, "prueba", machines.item.name);
     const machinesMenu = document.getElementById("machinesFilter");
     machinesMenu.style.width = "150px"; //tamaÃ±o tempora pues haba que ver como mejorarlo
     console.log('machines', s, 'machinesMenu', machinesMenu);

     console.log('machines', s);
     const option = document.createElement("option");
     option.href = "#";
     ((option.value = machines.item.url), machines.item.name); // cambia la , por + para saber que esta se ha pulsado
     option.textContent = machines.item.name;
     machinesMenu.appendChild(option);

     machinesMenu.addEventListener("change", (e) => {
         console.log('ha pulsado ', e.target.value);
         const s = e.target.value;
         //natureDatos(s); //datos de la nature
         //statmovesincredecre(s);//incremetas los movimientos
     });

 };

 // ====================================================
 // FUNCIONES DE VISUALIZACIÃ“N - POKÃ‰MON
 // ====================================================

 export
 /**
  * Carga y visualiza PokÃ©mon de un machine local area
  */
 async function MachineDatos(typeUrl) {
     showSection("pokemon-section"); //muestra los datos de los pokemon
     console.log(typeUrl);
     const typeData = await fetch(typeUrl).then((r) => r.json());
     console.log('abilityData', typeData);
     const pokemonList = typeData.pokemon_encounters;
     console.log('pokemonListAbility', pokemonList);
     const grid = document.getElementById("pokemonGrid");
     grid.innerHTML = "";
     // Limitar a 50
     const limited = pokemonList.slice(0, 50);

     for (const species of limited) {
         //console.log("species", species);
         /* https://pokeapi.co/api/v2/pokemon/384/ pasa nombre correcto */
         //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
         const pokemon = await fetchPokemon(species.pokemon.name); //[{} {}] id "id": 413,
         if (pokemon) {
             createPokemonCard(pokemon, grid);
         }
     }
 }


 /*
 {
    "id": 1,
    "item": {
        "name": "tm00",
        "url": "https://pokeapi.co/api/v2/item/1288/"
    },
    "move": {
        "name": "mega-punch",
        "url": "https://pokeapi.co/api/v2/move/5/"
    },
    "version_group": {
        "name": "sword-shield",
        "url": "https://pokeapi.co/api/v2/version-group/20/"
    }
}
    */

 /* logica seria que al seleccionar el mt carge sus datos simples , el complejo es que se redusca la lista de mt y solo slga una ejmplo mto1 y 
 al pulsar select mt1 me paresca en otro select las generaciones que tieneese movimiento y despues de selecciona me muestra los datos de machine

 luego si quiedo datos seria pasar datos al al move.spi o crear lo aqui para que se obtenga la lista de pokemon que aprenden ese mto*/