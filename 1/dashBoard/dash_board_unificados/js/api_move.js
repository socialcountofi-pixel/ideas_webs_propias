export async function dataMove() {
    document.getElementById('m-moves_datos').innerHTML = '';
    document.getElementById('m-moves_datos2').innerHTML = '';
    document.getElementById('m-moves_datos3').innerHTML = '';
    const urlimg = 'https://pokeapi.co/api/v2/move/surf';
    try {
        const resItem = await fetch(urlimg);
        const dataItem = await resItem.json();
        console.log('dataItem', dataItem);

        /*accuracy:100 id:1 name:"pound" power:40 pp:35 priority:0*/
        const elementos = document.getElementById('m-moves_datos');
        elementos.innerText += " accuracy : " + dataItem.accuracy + ' id : ' + dataItem.id + ' name : ' + dataItem.name + " power : " + dataItem.power + ' pp :' + dataItem.pp + ' priority : ' + dataItem.priority;
        //console.log('elementos', elementos);

        /* type:{name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/'}
         */

        // 1. Buscamos el contenedor principal donde irán todas las filas
        const MoveType = document.getElementById('m-moves_datos2');

        // 2. Creamos una "Fila" para este tipo específico
        const filaMT = document.createElement('div');
        filaMT.style.display = "flex"; // Esto crea el lado A y B
        filaMT.style.borderBottom = "1px solid #ccc";
        filaMT.style.padding = "10px";

        // LADO A: El Tipo
        const ladoAMT = document.createElement('div');
        ladoAMT.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoAMT.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBMT = document.createElement('div');
        ladoBMT.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBMT.style.display = "flex";
        ladoBMT.style.flexWrap = "wrap";
        ladoBMT.style.gap = "5px";

        // Ponemos un condicional por si el tipo no tiene clase definida (como 'stellar' o 'unknown')

        const MoveTypes = dataItem.type ? dataItem.type.name : "N/A";
        //console.log(dataItem.generation);
        ladoBMT.innerHTML = `<span class="badge ${MoveTypes}">${MoveTypes}</span>`;

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaMT.appendChild(ladoAMT);
        filaMT.appendChild(ladoBMT);
        MoveType.appendChild(filaMT);

        /* target:{name: 'selected-pokemon', url: 'https://pokeapi.co/api/v2/move-target/10/'}
         */
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const MoveTarget = document.getElementById('m-moves_datos2');

        // 2. Creamos una "Fila" para este tipo específico
        const filaMTRG = document.createElement('div');
        filaMTRG.style.display = "flex"; // Esto crea el lado A y B
        filaMTRG.style.borderBottom = "1px solid #ccc";
        filaMTRG.style.padding = "10px";

        // LADO A: El Tipo
        const ladoAMTRG = document.createElement('div');
        ladoAMTRG.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoAMTRG.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBMTRG = document.createElement('div');
        ladoBMTRG.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBMTRG.style.display = "flex";
        ladoBMTRG.style.flexWrap = "wrap";
        ladoBMTRG.style.gap = "5px";

        // Ponemos un condicional por si el tipo no tiene clase definida (como 'stellar' o 'unknown')

        const MoveTargets = dataItem.target ? dataItem.target.name : "N/A";
        //console.log(dataItem.generation);
        ladoBMTRG.innerHTML = `<span class="badge ${MoveTargets}">${MoveTargets}</span>`;

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaMTRG.appendChild(ladoAMTRG);
        filaMTRG.appendChild(ladoBMTRG);
        MoveTarget.appendChild(filaMTRG);

        /* C:{name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/'}
         */
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const MoveGeneration = document.getElementById('m-moves_datos3');

        // 2. Creamos una "Fila" para este tipo específico
        const filaMG = document.createElement('div');
        filaMG.style.display = "flex"; // Esto crea el lado A y B
        filaMG.style.borderBottom = "1px solid #ccc";
        filaMG.style.padding = "10px";

        // LADO A: El Tipo
        const ladoAMG = document.createElement('div');
        ladoAMG.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoAMG.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBMG = document.createElement('div');
        ladoBMG.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBMG.style.display = "flex";
        ladoBMG.style.flexWrap = "wrap";
        ladoBMG.style.gap = "5px";

        // Ponemos un condicional por si el tipo no tiene clase definida (como 'stellar' o 'unknown')

        const MoveGenerations = dataItem.generation ? dataItem.generation.name : "N/A";
        //console.log(dataItem.generation);
        ladoBMG.innerHTML = `<span class="badge ${MoveGenerations}">${MoveGenerations}</span>`;

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaMG.appendChild(ladoAMG);
        filaMG.appendChild(ladoBMG);
        MoveGeneration.appendChild(filaMG);

        /* learned_by_pokemon:[{name: 'ekans', url: 'https://pokeapi.co/api/v2/pokemon/23/'} 
                               {name: 'arbok', url: 'https://pokeapi.co/api/v2/pokemon/24/'}]
         */
        //🚨 AQUÍ USAMOS move_damage_class array bidimensional[{}]
        //MOVIMIENTOS DEL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const learnPokeContainer = document.getElementById('m-moves_datos3');

        // 2. Creamos una "Fila" para este tipo específico
        const filaLPM = document.createElement('div');
        filaLPM.style.display = "flex"; // Esto crea el lado A y B
        filaLPM.style.borderBottom = "1px solid #ccc";
        filaLPM.style.padding = "10px";

        // LADO A: El Tipo
        const ladoALPM = document.createElement('div');
        ladoALPM.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoALPM.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBLPM = document.createElement('div');
        ladoBLPM.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBLPM.style.display = "flex";
        ladoBLPM.style.flexWrap = "wrap";
        ladoBLPM.style.gap = "5px";

        // Llenamos el Lado B con los Pokémon de este tipo
        dataItem.learned_by_pokemon.slice(0, 10).forEach(p => { // slice(0,10) para no saturar
            const span = document.createElement('span');
            span.className = 'item';
            span.innerText = p.name;
            span.style.background = "#eee";
            span.style.padding = "2px 5px";
            span.style.borderRadius = "4px";
            ladoBLPM.appendChild(span);
        });

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaLPM.appendChild(ladoALPM);
        filaLPM.appendChild(ladoBLPM);
        learnPokeContainer.appendChild(filaLPM);


        /*
        
contest_combos:{normal: {…}, super: {…}}
contest_effect:{url: 'https://pokeapi.co/api/v2/contest-effect/1/'}
contest_type:{name: 'tough', url: 'https://pokeapi.co/api/v2/contest-type/5/'}
damage_class:{name: 'physical', url: 'https://pokeapi.co/api/v2/move-damage-class/2/'}
effect_chance:null
effect_changes:[]
effect_entries:(2) [{…}, {…}]
flavor_text_entries:(69) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
machines:[
machine:{url: 'https://pokeapi.co/api/v2/machine/1032/'}
version_group:{name: 'lets-go-pikachu-lets-go-eevee', url: 'https://pokeapi.co/api/v2/version-group/19/'}
]
meta:{ailment: {…}, ailment_chance: 0, category: {…}, crit_rate: 0, drain: 0, …}
names:(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
past_values:[]
stat_changes:[]
super_contest_effect:{url: 'https://pokeapi.co/api/v2/super-contest-effect/5/'}

*/

    } catch (error) {
        console.error("Error cargando imagen del item:", error);
    }
}


/* lado a y lado b se crea por defecto pero lo ideal seria que solo tuvieramos :
el lado a con el nombre y para el lado b se cargue todos los datos y se corriga de forma manual 
o lo adapte segun necesidades pues los movimiento se podrian pone 
que apareciese por defecto y el resto se cargue al pasar con el click de dereecha e izquierde 
y adaptarlo al css segun el dato y el tipo funcionalidades modos de botones 

idea de unificacion es que cada js creando lado a y b
el a es solo un dato pero el lado b son todos los datos relacionados 

otra idea es que cada api que cargue al div se renmbre como con inciales
es decir p para la aplicacion o api pokemon y luego para cada caso se añade etra letra
es decir 
p-abilities_name (api abilidades) => a.abilities_datas (api abilidades) 
p-type_name (api pokemon) => t.name (api types) y asi para cada caso
y una card para cada api que sea necesaria
opciones :
hacer un create y crar otro div dentro del primer padre 
hacer un div y que se cargue a ese div los datos siendo siendo asi el uso del getElementById
*/