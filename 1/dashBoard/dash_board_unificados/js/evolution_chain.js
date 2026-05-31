/* ===========================
   inicio de chain evolutio "https : //pokeapi.co/api/v2/evolution-chain/"
=========================== */
export async function datosChainEvo(urlevo) { /*renderPokemon(idOrName) {*/

    //console.log('url : ' + urlevo);
    const res = await fetch(urlevo); //"https://pokeapi.co/api/v2/evolution-chain/1/");
    const ec = await res.json();
    //console.log('ec', ec);






    /*document.getElementById("is-baby-info").innerHTML = ec.chain.is_baby ?
        `<div class="is-baby">🍼 Este Pokémon es una forma bebé</div>` :
        `<div class="is-baby">No es una forma bebé</div>`;*/





    //console.log('evolution_chain.url', ec.chain.species.name);
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
        //console.log(ec.chain.is_baby, '&&', ec.chain.evolution_details, nodo.evolution_details[0]);
        let evoDetails = (ec.chain.evolution_details && nodo.evolution_details[0]) || null;
        /*se pasa "chain": {[{}]} */
        const condDiv = document.createElement("div");
        condDiv.classList.add("conditions");
        if (evoDetails) {
            condDiv.innerHTML = `<h4>Condiciones:</h4>${EvolutionDetails(evoDetails)}`;
        } else if (ec.chain.is_baby) {
            condDiv.innerHTML = `<h4>Condiciones  :</h4><ul><li>Nace de un huevo</li></ul>`;
        } else {
            condDiv.innerHTML = `<h4>Condiciones :</h4><ul><li>Estado Base</li></ul>`; /*Sin condiciones específicas o datos no disponibles*/
        }
        div.appendChild(condDiv);

        //console.log('nodo', nodo);
        // Mostrar si es bebé
        div.innerHTML += nodo.is_baby ? `<div class="is-baby">🍼 Es bebé</div>` : "";

        div.innerHTML += `<img src="${data.sprites.front_default}" alt="${name}">                          <h4>${name.toUpperCase()}</h4>`;
        container.appendChild(div);

        // Recorre todas las ramas (para Eevee o Rockruff)
        for (const siguiente of nodo.evolves_to) {
            await recorrerCadena(siguiente);
        }
    }

    await recorrerCadena(ec.chain);
    //console.log('chain', ec.chain);

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

    if (details.trigger && details.trigger.name) { c.push(`<li><b>Trigger:</b> ${details.trigger.name}</li>`); }
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