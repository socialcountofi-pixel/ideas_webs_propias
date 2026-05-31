//Export es para permitir importar los resultado o las funciones necesarias
// url https://pokeapi.co/api/v2/abilities / 
export async function dataAbilities(urltipo) {
    //FALTA LIMPIAR LOS CONTENEDORESCON CADA VEZ QUE CARGO LOS DATOS

    try {
        //console.log(urltipo);
        document.getElementById('a-abilities_pokemons').innerHTML = '';
        document.getElementById('a-abilities_generacion').innerHTML = '';
        document.getElementById('a-abilities_datas').innerHTML = '';
        const resItem = await fetch(urltipo);
        const dataItem = await resItem.json();

        /*"id": 5,
"is_main_series": true,
"name": "sturdy", */
        const id = dataItem.id;
        const is_main_series = dataItem.is_main_series;
        const namea = dataItem.name;

        document.getElementById('a-abilities_datas').innerHTML += ' id: ' + id + ' is_main_series: ' + is_main_series + ' name: ' + namea;


        /*        "generation": {
            "name": "generation-iii",
            "url": "https://pokeapi.co/api/v2/generation/3/"
        },*/
        //GENERACIONES EN LA QUE SALE EL MISMO TIPO QUE EL QUE CARAGAMOS 
        //FALTARIA EL FILTO PARA LOS TEXTOSO DATOS EN EPAÑOL
        //🚨 AQUÍ USAMOS generation array simple{}
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const AbilitiesGenerationContainer = document.getElementById('a-abilities_generacion');

        // 2. Creamos una "Fila" para este tipo específico
        const filaAG = document.createElement('div');
        filaAG.style.display = "flex"; // Esto crea el lado A y B
        filaAG.style.borderBottom = "1px solid #ccc";
        filaAG.style.padding = "10px";

        // LADO A: El Tipo
        const ladoAAG = document.createElement('div');
        ladoAAG.style.flex = "3"; // Ocupa un espacio fijo a la izquierda 
        ladoAAG.innerHTML = `<strong class="abilities ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBAG = document.createElement('div');
        ladoBAG.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBAG.style.display = "flex";
        ladoBAG.style.flexWrap = "wrap";
        ladoBAG.style.gap = "5px";

        // Ponemos un condicional por si el tipo no tiene clase definida (como 'stellar' o 'unknown')

        const TypeGenerations = dataItem.generation ? dataItem.generation.name : "N/A";

        ladoBAG.innerHTML = `<span class="badge ${TypeGenerations}">${TypeGenerations}</span>`;

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaAG.appendChild(ladoAAG);
        filaAG.appendChild(ladoBAG);
        AbilitiesGenerationContainer.appendChild(filaAG);


        /* "pokemon": [{
                "is_hidden": false,
                "pokemon": {
                    "name": "geodude",
                    "url": "https://pokeapi.co/api/v2/pokemon/74/"
                },
                "slot": 2
            },
            {
                "is_hidden": false,
                "pokemon": {
                    "name": "graveler",
                    "url": "https://pokeapi.co/api/v2/pokemon/75/"
                },
                "slot": 2
            },
        ]*/

        //🚨 AQUÍ USAMOS pokemon array bidimensional[{}]
        //MOVIMIENTOS DEL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const AbilitiespokemonContainer = document.getElementById('a-abilities_pokemons');

        // 2. Creamos una "Fila" para este tipo específico
        const filaAP = document.createElement('div');
        filaAP.style.display = "flex"; // Esto crea el lado A y B
        filaAP.style.borderBottom = "1px solid #ccc";
        filaAP.style.padding = "10px";

        // LADO A: El Tipo
        const ladoAAP = document.createElement('div');
        ladoAAP.style.flex = "3"; // Ocupa un espacio fijo a la izquierda
        ladoAAP.innerHTML = `<strong class="abilities ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBAP = document.createElement('div');
        ladoBAP.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBAP.style.display = "flex";
        ladoBAP.style.flexWrap = "wrap";
        ladoBAP.style.gap = "5px";

        // Llenamos el Lado B con los Pokémon de este tipo
        dataItem.pokemon.slice(0, 10).forEach(p => { // slice(0,10) para no saturar
            const span = document.createElement('span');
            span.className = 'item';
            span.innerText = p.pokemon.name;
            span.style.background = "#eee";
            span.style.padding = "2px 5px";
            span.style.borderRadius = "4px";
            ladoBAP.appendChild(span);
        });

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaAP.appendChild(ladoAAP);
        filaAP.appendChild(ladoBAP);
        AbilitiespokemonContainer.appendChild(filaAP);

        /* filtro para que se vean los que tiene en spaño */

        /* "version_group": {
        "name": "black-white",
        "url": "https://pokeapi.co/api/v2/version-group/11/"
    } */


        //TRAE LA INFORMACION CON LOS DATOS EN ESPAÑOL

        //ES COMO SE ESCRIBE N CADA IDIOMA 
        /*
        "names": [{
            "language": {
                "name": "es",
                "url": "https://pokeapi.co/api/v2/language/7/"
            },
            "name": "Hedor"
        }, ],
        "effect_changes": [{
            "effect_entries": [

                {
                    "effect": "Does not prevent regular KOs from full HP.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    }
                }
            ],

        }],
        "effect_entries": [

            {
                "effect": "When this Pokémon is at full HP, any hit that would knock it out will instead leave it with 1 HP.  Regardless of its current HP, it is also immune to the one-hit KO moves: fissure, guillotine, horn drill, and sheer cold.\n\nIf this Pokémon is holding a focus sash, this ability takes precedence and the item will not be consumed.",
                "language": {
                    "name": "en",
                    "url": "https://pokeapi.co/api/v2/language/9/"
                },
                "short_effect": "Prevents being KOed from full HP, leaving 1 HP instead.  Protects against the one-hit KO moves regardless of HP."
            }
        ],
        "flavor_text_entries": [{
                "flavor_text": "Negates 1-hit KO attacks.",
                "language": {
                    "name": "en",
                    "url": "https://pokeapi.co/api/v2/language/9/"
                },
                "version_group": {
                    "name": "ruby-sapphire",
                    "url": "https://pokeapi.co/api/v2/version-group/5/"
                }
            },
            {
                "flavor_text": "Negates 1-hit KO attacks.",
                "language": {
                    "name": "en",
                    "url": "https://pokeapi.co/api/v2/language/9/"
                },
                "version_group": {
                    "name": "emerald",
                    "url": "https://pokeapi.co/api/v2/version-group/6/"
                }
            },
        ],
        */
    } catch (error) {
        console.error("Error cargando imagen del item:", error);
    }


}