const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const GEN_URL = "https : //pokeapi.co/api/v2/generation/";

let statsChart;
let barChart, pieChart, lineChart;

let labels = [];
let values = [];

/* ===========================
   CONTROL DE VISTAS
=========================== */

function mostrarVistaStats() {
    document.getElementById("stats-view").style.display = "block";
    document.getElementById("dashboard-view").style.display = "none";
}

function mostrarVistaPokemon() {
    document.getElementById("stats-view").style.display = "none";
    document.getElementById("dashboard-view").style.display = "block";
}

/* ===========================
   LISTADO POKEMON
=========================== */

async function loadList(url) {

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("nextBtn").onclick = () => loadList(data.next);
    document.getElementById("prevBtn").onclick = () => loadList(data.previous);
    document.getElementById("nextBtn").disabled = !data.next;
    document.getElementById("prevBtn").disabled = !data.previous;

    const listDiv = document.getElementById("poke-list");
    listDiv.innerHTML = "";

    data.results.forEach((p) => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerText = p.name;
        div.onclick = () => loadDetails(p.url);
        listDiv.appendChild(div);
    });
}

/* ===========================
   DETALLE POKEMON
=========================== */

async function loadDetails(url) {
    mostrarVistaPokemon();

    const res = await fetch(url);
    const p = await res.json();

    /*base_experience :64 height :7 id :1 is_default :true name :"bulbasaur" order :1 weight :69 */

    document.getElementById("p-exp").innerText = p.base_experience;
    document.getElementById("p-height").innerText = p.height;
    document.getElementById("p-id").innerText = p.id;
    document.getElementById("p-is_default").innerHTML = p.is_default;
    document.getElementById("title").innerText = p.name.toUpperCase();
    document.getElementById("p-order").innerHTML = p.order;
    document.getElementById("p-weight").innerText = p.weight;

    const sprites = document.getElementById("sprites-container");
    sprites.innerHTML = "";
    if (p.sprites.front_default)
        sprites.innerHTML += `<img src="${p.sprites.front_default}" width="120">`;

    /* abilities :(2) [{…}, {…}] */
    document.getElementById("p-abilities").innerHTML = '';
    document.getElementById("p-abilities").innerHTML += p.abilities
        .map((a) => `<li>${a.ability.name}</li>`)
        .join("");

    p.abilities
        .map((a) =>
            datosAbilidades(a.ability.url)
        );
    /*cries :{
    latest: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg', 
    legacy: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg'}*/
    document.getElementById("p-cries").innerText = '';
    document.getElementById("p-cries").innerText = p.cries.latest + ' ' + p.cries.legacy;
    /*forms :[{…}]*/
    /*game_indices :(20) [
    {game_index:153,version:{name: 'red', url: 'https://pokeapi.co/api/v2/version/1/'}]*/
    document.getElementById("p-game_indices").innerHTML = '';
    document.getElementById("p-game_indices").innerHTML = p.game_indices
        .slice(0, 10) // toma los primeros 10 elementos
        .map((t) => `<span class="badge">game_index : ${t.game_index}  ${t.version.name}  <br></span>`)
        .join("");
    /*held_items :[]*/
    /*location_area_encounters :"https://pokeapi.co/api/v2/pokemon/1/encounters"*/
    document.getElementById("p-location_area_encounters").innerText = '';
    document.getElementById("p-location_area_encounters").innerText = p.location_area_encounters;
    /*moves [ 
    {move:{name: 'razor-wind', url: 'https://pokeapi.co/api/v2/move/13/'},
    {version_group_details:[{level_learned_at: 0, move_learn_method: {…}, order: null, version_group: {…}}
                          {level_learned_at: 0, move_learn_method: {…}, order: null, version_group: {…}}]}
    ]
    */
    document.getElementById("p-moves").innerHTML = '';
    document.getElementById("p-moves").innerHTML = p.moves
        .slice(0, 10) // toma los primeros 10 elementos
        .map((t) => `<span class="badge">movimiento : ${t.move.name} level_learned_at : ${t.version_group_details[0].level_learned_at} move_learn_method : ${t.version_group_details[0].move_learn_method.name}   <br></span>`)
        .join("");

    p.moves
        .slice(0, 10) // toma los primeros 10 elementos
        .map((t) => datosMove(t.move.url))
        .join("");

    /*past_abilities :[{…}]*/
    /*past_stats :[{…}]*/
    /*past_types :[]*/
    /*species :{name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/'}*/
    document.getElementById("p-species").innerText = '';
    document.getElementById("p-species").innerText = p.species.name;
    datosSpecies(p.species.url);
    console.log(p.sprites);
    /*sprites :{back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png', back_female: null, back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png', back_shiny_female: null, front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', …}*/

    const spritetotal = document.getElementById("sprites_total-container");
    spritetotal.innerHTML = "";
    const imgUrls = [
        p.sprites.back_default, p.sprites.back_female, p.sprites.back_shiny, p.sprites.back_shiny_female,
        p.sprites.front_default, p.sprites.front_female, p.sprites.front_shiny, p.sprites.front_shiny_female
    ];
    imgUrls.forEach(src => {
        if (src) spritetotal.innerHTML += `<img src="${src}" width="120">`;
    });

    /*stats :(6) [{…}, {…}, {…}, {…}, {…}, {…}]*/
    document.getElementById("p-stats").innerHTML = '';
    document.getElementById("p-stats").innerHTML = p.stats
        .map((t) => `<span class="badge">base_stat : ${t.base_stat} 
effort : ${t.effort} 
stat name : ${t.stat.name} 
stat url : ${t.stat.url} <br>
</span>`)
        .join("");

    document.getElementById("json-raw").innerText = JSON.stringify(p, null, 2);
    /*types :(2) [{…}, {…}]*/
    document.getElementById("p-types").innerHTML = '';
    document.getElementById("p-types").innerHTML = p.types
        .map((t) => `<span class="badge">${t.type.name}</span>`)
        .join("");
    document.getElementById("json-raw").innerText = JSON.stringify(p, null, 2);

    updateStatsChart(p.stats);
}

/* ===========================
   inicio de habilidades
=========================== */
async function datosAbilidades(url) {
    //console.log(url);
    document.getElementById("a-abilities").innerText = '';
    const res = await fetch(url);
    const a = await res.json();
    //console.log(a);

    /**id :1
    is_main_series :true
    name :"stench" */

    document.getElementById("a-abilities").innerText += ' id : ' + a.id + ' is_main_series : ' + a.is_main_series + ' name : ' + a.name;
    /*
effect_changes :[{…}]
effect_entries :(3) [{…}, {…}, {…}]
flavor_text_entries :(80) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
generation :{name: 'generation-iii', url: 'https://pokeapi.co/api/v2/generation/3/'}
names :(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
pokemon :(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//datosAbilidades(url);*/
}
/* fin  de habilidades  */


/* ===========================
   inicio de species
=========================== */
let colorPoke = '';
async function datosSpecies(url) {
    //console.log(url);
    document.getElementById("pe-varieties").innerText = '';
    const res = await fetch(url);
    const s = await res.json();
    //console.log(s);

    /*base_happiness :70  
    capture_rate :45
    forms_switchable :false
    gender_rate :1 
    has_gender_differences :false
    hatch_counter :20
    id :1
    is_baby :false
    is_legendary :false
    is_mythical :false
    name :"bulbasaur"
    order :1
    */

    document.getElementById("pe-pokemon_species").innerText = '';
    document.getElementById("pe-pokemon_species").innerText += ' base_happiness : ' + s.base_happiness +
        ' capture_rate : ' + s.capture_rate +
        ' forms_switchable : ' + s.forms_switchable +
        ' gender_rate : ' + s.gender_rate +
        ' has_gender_differences : ' + s.has_gender_differences +
        ' hatch_counter : ' + s.hatch_counter +
        ' id : ' + s.id +
        ' is_baby : ' + s.is_baby +
        ' is_legendary : ' + s.is_legendary +
        ' is_mythical : ' + s.is_mythical +
        ' name : ' + s.name +
        ' order : ' + s.order;


    /*
    color :{name: 'green', url: 'https://pokeapi.co/api/v2/pokemon-color/5/'}*/
    document.getElementById("pe-color").innerText = '';
    document.getElementById("pe-color").innerText += s.color.name;
    document.getElementById("pe-color").style.backgroundColor = '';
    document.getElementById("pe-color").style.backgroundColor += s.color.name;
    colorPoke = s.color.name;
    //style="background: red;
    /*
    egg_groups :(2) [{…}, {…}]
    evolves_from_species :null
    flavor_text_entries :(94) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    form_descriptions :[]
    genera :(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    generation :{name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/'}
    growth_rate :{name: 'medium-slow', url: 'https://pokeapi.co/api/v2/growth-rate/4/'}
    */
    /*habitat :{name: 'grassland', url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/'}*/
    document.getElementById("pe-habitat").innerText = '';
    document.getElementById("pe-habitat").innerText += ' habitat : ' + s.habitat.name;
    /*
    names :(11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    pal_park_encounters :[{…}]
    pokedex_numbers :(9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    shape :{name: 'quadruped', url: 'https://pokeapi.co/api/v2/pokemon-shape/8/'}*/
    /*
    varieties :Array(3)[{}]
    0 :{is_default :true,pokemon :{name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/'}}
    1 :{is_default: false, pokemon: {name: 'venusaur-mega', url: 'https://pokeapi.co/api/v2/pokemon/10033/'}}
    2 :{is_default: false, pokemon: {name: 'venusaur-gmax', url: 'https://pokeapi.co/api/v2/pokemon/10195/'}}
    length :3
       */
    // variedeades del pokemon pasamos las url

    document.getElementById("pe-varieties").innerText = s.varieties
        .map((t) => ` varieties : ${t.pokemon.name}  utl : ${t.pokemon.url}`)
        .join("");
    /* pasamos la url para que carguen la imagenes de las variedades */
    // Limpiar el div UNA sola vez antes de agregar nuevas imágenes
    const div = document.getElementById("pe-sprites-varieties");
    div.innerHTML = ""; // Limpiar el div antes de cargar las nuevas imágenes

    // Recorrer las variedades y cargar las imágenes
    s.varieties.forEach((t) => mostrarimagenesvarieties(t.pokemon.url));

    /* pasa a url para mostra la imagen de casa pokemon */
    /* evolution_chain :{url: 'https://pokeapi.co/api/v2/evolution-chain/1/'} */
    datosChainEvo(s.evolution_chain.url);

}

async function mostrarimagenesvarieties(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        const imagen = data.sprites.front_default;

        // Aquí no limpies el div cada vez, solo agrega la imagen
        const div = document.getElementById("pe-sprites-varieties");
        // div.style.backgroundColor = colorPoke;
        //div.style.opacity = "0.6";
        /* añadir el js para que se vea mas animado con el circulo de pruebas */
        /* ejemplo de colores background:linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7), yellow); */
        div.innerHTML += ` <p>${data.name}</p> <!--revisar como lo ponemos para que se ve correctamente -->
            <img src="${imagen}" alt="${data.name}" width="150" class ="varieties" style="border: 2px solid  ${colorPoke};background-Image:radial-gradient(transparent,${colorPoke}, transparent)">  
        `;

    } catch (error) {
        console.error("Error:", error);
    }


}
/* fin  de species  */

/* ===========================
   inicio de chain evolutio
=========================== */
async function datosChainEvo(urlevo) { /*renderPokemon(idOrName) {*/

    //console.log('url : ' + urlevo);
    const evoData = await fetch(urlevo); //"https://pokeapi.co/api/v2/evolution-chain/1/");
    const evoDatas = await evoData.json();
    //console.log('evoData', evoDatas);



    document.getElementById("pokemon-name").textContent = evoDatas.chain.species.name.toUpperCase();


    document.getElementById("is-baby-info").innerHTML = evoDatas.chain.species.is_baby ?
        `<div class="is-baby">🍼 Este Pokémon es una forma bebé</div>` :
        `<div class="is-baby">No es una forma bebé</div>`;





    //console.log('evolution_chain.url', evoDatas.chain.species.name);
    const container = document.getElementById("evolution-chain");
    container.innerHTML = "";

    async function recorrerCadena(nodo) {



        //console.log('nodo1', nodo);
        const name = nodo.species.name;

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        //console.log('data', data, 'img ', data.sprites.front_default);


        const div = document.createElement("div");
        div.classList.add("evo");

        // Manejar casos sin evolution_details o vacíos
        let evoDetails = (evoDatas.chain.evolution_details && nodo.evolution_details[0]) || null;

        const condDiv = document.createElement("div");
        condDiv.classList.add("conditions");
        if (evoDetails) {
            condDiv.innerHTML = `<h4>Condiciones:</h4>${EvolutionDetails(evoDetails)}`;
        } else {
            condDiv.innerHTML = `<h4>Condiciones:</h4><ul><li>Sin condiciones específicas o datos no disponibles</li></ul>`;
        }
        div.appendChild(condDiv);


        // Mostrar si es bebé
        div.innerHTML += nodo.is_baby ? `<div class="is-baby">🍼 Es bebé</div>` : "";

        div.innerHTML += `<img src="${data.sprites.front_default}" alt="${name}">                          <h4>${name.toUpperCase()}</h4>`;
        container.appendChild(div);

        // Recorre todas las ramas (para Eevee o Rockruff)
        for (const siguiente of nodo.evolves_to) {
            await recorrerCadena(siguiente);
        }
    }

    await recorrerCadena(evoDatas.chain);
    //console.log('chain', evoDatas.chain);

    /*
    
    //formatCondition
    "id": 1 */
}

function EvolutionDetails(details) {
    /*"baby_trigger_item": null,
     "chain": {
         "evolution_details": [],
         "evolves_to": [{
             "evolution_details": [{
                 "base_form_id": null,
                 "gender": null,
                 "held_item": null,
                 "item": null,
                 "known_move": null,
                 "known_move_type": null,
                 "location": null,
                 "min_affection": null,
                 "min_beauty": null,
                 "min_damage_taken": null,
                 "min_happiness": null,
                 "min_level": 16,
                 "min_move_count": null,
                 "min_steps": null,
                 "needs_multiplayer": false,
                 "needs_overworld_rain": false,
                 "party_species": null,
                 "party_type": null,
                 "region_id": null,
                 "relative_physical_stats": null,
                 "time_of_day": "",
                 "trade_species": null,
                 "trigger": {
                     "name": "level-up",
                     "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                 },
                 "turn_upside_down": false,
                 "used_move": null
             }],
             "evolves_to": [{
                 "evolution_details": [{
                     "base_form_id": null,
                     "gender": null,
                     "held_item": null,
                     "item": null,
                     "known_move": null,
                     "known_move_type": null,
                     "location": null,
                     "min_affection": null,
                     "min_beauty": null,
                     "min_damage_taken": null,
                     "min_happiness": null,
                     "min_level": 32,
                     "min_move_count": null,
                     "min_steps": null,
                     "needs_multiplayer": false,
                     "needs_overworld_rain": false,
                     "party_species": null,
                     "party_type": null,
                     "region_id": null,
                     "relative_physical_stats": null,
                     "time_of_day": "",
                     "trade_species": null,
                     "trigger": {
                         "name": "level-up",
                         "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                     },
                     "turn_upside_down": false,
                     "used_move": null
                 }],
                 "evolves_to": [],
                 "is_baby": false,
                 "species": {
                     "name": "venusaur",
                     "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
                 }
             }],
             "is_baby": false,
             "species": {
                 "name": "ivysaur",
                 "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
             }
         }],
         "is_baby": false,
         "species": {
             "name": "bulbasaur",
             "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
         }
     },*/
    let c = [];
    //if (details.trigger ? name) c.push(`<li><b>Trigger:</b> ${details.trigger.name}</li>`);
    if (details.min_level) c.push(`<li><b>Nivel mínimo:</b> ${details.min_level}</li>`);
    if (details.item) c.push(`<li><b>Objeto:</b> ${details.item.name}</li>`);
    if (details.held_item) c.push(`<li><b>Objeto equipado:</b> ${details.held_item.name}</li>`);
    if (details.min_happiness) c.push(`<li><b>Felicidad mínima:</b> ${details.min_happiness}</li>`);
    if (details.min_affection) c.push(`<li><b>Afecto mínimo:</b> ${details.min_affection}</li>`);
    if (details.min_beauty) c.push(`<li><b>Belleza mínima:</b> ${details.min_beauty}</li>`);
    if (details.time_of_day) c.push(`<li><b>Hora del día:</b> ${details.time_of_day}</li>`);
    if (details.location) c.push(`<li><b>Ubicación:</b> ${details.location.name}</li>`);
    if (details.gender !== null) c.push(`<li><b>Género:</b> ${details.gender === 1 ? "Hembra" : "Macho"}</li>`);
    if (details.needs_overworld_rain) c.push(`<li><b>Requiere lluvia:</b> Sí</li>`);
    if (details.known_move) c.push(`<li><b>Debe conocer el movimiento:</b> ${details.known_move.name}</li>`);
    if (details.known_move_type) c.push(`<li><b>Debe conocer un movimiento de tipo:</b> ${details.known_move_type.name}</li>`);
    if (details.party_species) c.push(`<li><b>Debe tener en el equipo:</b> ${details.party_species.name}</li>`);
    if (details.party_type) c.push(`<li><b>Debe tener un Pokémon de tipo:</b> ${details.party_type.name}</li>`);
    if (details.trade_species) c.push(`<li><b>Debe intercambiar con:</b> ${details.trade_species.name}</li>`);
    if (details.turn_upside_down) c.push(`<li><b>Debe girarse la consola (Inkay)</b></li>`);
    if (details.relative_physical_stats !== null) {
        if (details.relative_physical_stats === 1)
            c.push(`<li><b>Condición:</b> Ataque > Defensa (Hitmonlee)</li>`);
        else if (details.relative_physical_stats === -1)
            c.push(`<li><b>Condición:</b> Ataque < Defensa (Hitmonchan)</li>`);
        else
            c.push(`<li><b>Condición:</b> Ataque = Defensa (Hitmontop)</li>`);
    }
    if (c.length === 0) c.push(`<li>Sin condiciones especiales.</li>`);
    return `<ul>${c.join("")}</ul>`;
}



/* fin chain evolution */


/* ===========================
   inicio de movimientos
=========================== */
async function datosMove(url) {
    //console.log(url);
    document.getElementById("m-datos").innerText = '';
    document.getElementById("m-damage_class").innerText = '';
    document.getElementById("m-target").innerText = '';
    document.getElementById("m-type").innerText = '';
    const res = await fetch(url);
    const m = await res.json();
    //console.log(m);

    /* accuracy :100
effect_chance :null
id :1
name :"pound"
power :40
pp :35
priority :0*/

    document.getElementById("m-datos").innerText += ' accuracy : ' + m.accuracy +
        ' effect_chance : ' + m.effect_chance +
        ' id : ' + m.id +
        ' name : ' + m.name +
        ' power : ' + m.power +
        ' pp : ' + m.pp +
        ' priority : ' + m.priority;

    /* 
contest_combos :{normal: {…}, super: {…}}
contest_effect :{url: 'https://pokeapi.co/api/v2/contest-effect/1/'}
contest_type :{name: 'tough', url: 'https://pokeapi.co/api/v2/contest-type/5/'}
*/
    /*damage_class :{name: 'physical', url: 'https://pokeapi.co/api/v2/move-damage-class/2/'}*/

    document.getElementById("m-damage_class").innerText += ' damage_class : ' + m.damage_class.name;
    /*
    effect_changes :[]
    effect_entries :(2) [{…}, {…}]
    flavor_text_entries :(69) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    generation :{name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/'}
    learned_by_pokemon :(102) [{…}, {…}, {…}]
    machines :[]
    meta :{ailment: {…}, ailment_chance: 0, category: {…}, crit_rate: 0, drain: 0, …}
    names :(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    past_values :[]
    stat_changes :[]
    super_contest_effect :{url: 'https://pokeapi.co/api/v2/super-contest-effect/5/'}
    */
    /*target :{name: 'selected-pokemon', url: 'https://pokeapi.co/api/v2/move-target/10/'}*/

    document.getElementById("m-target").innerText += ' target : ' + m.target.name;
    /*type :{name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/'}*/

    document.getElementById("m-type").innerText += ' name typo : ' + m.type.name;



}
/* fin  de movimientos  */

/* ===========================
   GRÁFICA STATS POKEMON
=========================== */

function updateStatsChart(stats) {
    if (statsChart) statsChart.destroy();

    statsChart = new Chart(document.getElementById("statsChart"), {
        type: "radar",
        data: {
            labels: stats.map((s) => s.stat.name),
            datasets: [{
                label: "Base Stats",
                data: stats.map((s) => s.base_stat),
                backgroundColor: "rgba(239,83,80,0.2)",
                borderColor: "#ef5350",
            }, ],
        },
        options: { scales: { r: { beginAtZero: true } } },
    });
}

/* ===========================
   GENERACIONES (DEFAULT)
=========================== */

async function loadGeneraciones() {
    const res = await fetch(GEN_URL);
    const data = await res.json();

    labels = [];
    values = [];

    for (let gen of data.results) {
        const resGen = await fetch(gen.url);
        const dataGen = await resGen.json();

        labels.push(gen.name);
        values.push(dataGen.pokemon_species.length);
    }

    crearGraficasGlobales();
}

function crearGraficasGlobales() {
    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();
    if (lineChart) lineChart.destroy();

    barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Pokémon por Generación",
                data: values,
                backgroundColor: "rgba(54,162,235,0.7)",
            }, ],
        },
    });

    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
            }, ],
        },
    });

    lineChart = new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Evolución por Generación",
                data: values,
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            }, ],
        },
    });
}

/* ===========================
   INIT
=========================== */

document.addEventListener("DOMContentLoaded", () => {
    mostrarVistaStats();
    loadList(BASE_URL);
    loadGeneraciones(); // 👈 Carga por defecto
});

async function prueba() {
    const dataurl = "https://pokeapi.co/api/v2/move/";
    console.log(dataurl);
    const res = await fetch(dataurl + 1);
    const data = await res.json();

    console.log(data);
}

prueba();