//Export es para permitir importar los resultado o las funciones necesarias
// url https://pokeapi.co/api/v2/type/ 
export async function dataTypes(urltipo) {
    document.getElementById('p-types_poekmons').innerHTML = '';
    document.getElementById('p-types_moves').innerHTML = '';
    document.getElementById('p-types_moves_class').innerHTML = '';
    document.getElementById('t-types_game_indice').innerHTML = '';
    document.getElementById('t-types_generations').innerHTML = '';
    try {
        const resItem = await fetch(urltipo);
        const dataItem = await resItem.json();

        /*  "id": 5, "name": "ground", =>id oculto o sin mostrar de momento, name = dataItem.name*/

        /*
        "pokemon": [{
                "pokemon": {"name": "sandshrew","url": "https://pokeapi.co/api/v2/pokemon/27/"},"slot": 1
            }, 
            {
                "pokemon": {"name": "ursaluna-bloodmoon",url": "https://pokeapi.co/api/v2/pokemon/10272/"},"slot": 1
            },
        ],*/
        //POKEMON DEL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const TypePokeContainer = document.getElementById('p-types_poekmons');

        // 2. Creamos una "Fila" para este tipo específico
        const filATP = document.createElement('div');
        filATP.style.display = "flex"; // Esto crea el lado A y B
        filATP.style.borderBottom = "1px solid #ccc";
        filATP.style.padding = "10px";

        // LADO A: El Tipo
        const ladoATP = document.createElement('div');
        ladoATP.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoATP.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBTP = document.createElement('div');
        ladoBTP.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBTP.style.display = "flex";
        ladoBTP.style.flexWrap = "wrap";
        ladoBTP.style.gap = "5px";

        // Llenamos el Lado B con los Pokémon de este tipo
        dataItem.moves.slice(0, 10).forEach(p => { // slice(0,10) para no saturar
            const span = document.createElement('span');
            span.className = 'item';
            span.innerText = p.name;
            span.style.background = "#eee";
            span.style.padding = "2px 5px";
            span.style.borderRadius = "4px";
            ladoBTP.appendChild(span);
        });

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filATP.appendChild(ladoATP);
        filATP.appendChild(ladoBTP);
        TypePokeContainer.appendChild(filATP);


        /* "moves": [{ "name": "sand-attack", "url": "https://pokeapi.co/api/v2/move/28/"},], */
        //🚨 AQUÍ USAMOS move_damage_class array bidimensional[{}]
        //MOVIMIENTOS DEL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const MoveContainer = document.getElementById('p-types_moves');

        // 2. Creamos una "Fila" para este tipo específico
        const filaTM = document.createElement('div');
        filaTM.style.display = "flex"; // Esto crea el lado A y B
        filaTM.style.borderBottom = "1px solid #ccc";
        filaTM.style.padding = "10px";

        // LADO A: El Tipo
        const ladoATM = document.createElement('div');
        ladoATM.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoATM.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBTM = document.createElement('div');
        ladoBTM.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBTM.style.display = "flex";
        ladoBTM.style.flexWrap = "wrap";
        ladoBTM.style.gap = "5px";

        // Llenamos el Lado B con los Pokémon de este tipo
        dataItem.pokemon.slice(0, 10).forEach(p => { // slice(0,10) para no saturar
            const span = document.createElement('span');
            span.className = 'item';
            span.innerText = p.pokemon.name;
            span.style.background = "#eee";
            span.style.padding = "2px 5px";
            span.style.borderRadius = "4px";
            ladoBTM.appendChild(span);
        });

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaTM.appendChild(ladoATM);
        filaTM.appendChild(ladoBTM);
        MoveContainer.appendChild(filaTM);


        //MOVIMIENTOS DAMAGE CLASS DEL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const MoveDmgCContainer = document.getElementById('p-types_moves_class');

        // 2. Creamos una "Fila" para este tipo específico
        const filaTMDC = document.createElement('div');
        filaTMDC.style.display = "flex"; // Esto crea el lado A y B
        filaTMDC.style.borderBottom = "1px solid #ccc";
        filaTMDC.style.padding = "10px";

        // LADO A: El Tipo
        const ladoATMDC = document.createElement('div');
        ladoATMDC.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoATMDC.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBTMDC = document.createElement('div');
        ladoBTMDC.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBTMDC.style.display = "flex";
        ladoBTMDC.style.flexWrap = "wrap";
        ladoBTMDC.style.gap = "5px";


        /* "move_damage_class": {"name": "physical","url": "https://pokeapi.co/api/v2/move-damage-class/2/"}, */
        // 🚨 AQUÍ USAMOS move_damage_class array simples {}
        // Ponemos un condicional por si el tipo no tiene clase definida (como 'stellar' o 'unknown')

        const damageClass = dataItem.move_damage_class ? dataItem.move_damage_class.name : "N/A";

        ladoBTMDC.innerHTML = `<span class="badge ${damageClass}">${damageClass}</span>`;

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaTMDC.appendChild(ladoATMDC);
        filaTMDC.appendChild(ladoBTMDC);
        MoveDmgCContainer.appendChild(filaTMDC);



        /* "generation": {"name": "generation-i","url": "https://pokeapi.co/api/v2/generation/1/"}, */
        //GENERACIONES EN LA QUE SALE EL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const TypeGeneration = document.getElementById('t-types_generations');

        // 2. Creamos una "Fila" para este tipo específico
        const filaTG = document.createElement('div');
        filaTG.style.display = "flex"; // Esto crea el lado A y B
        filaTG.style.borderBottom = "1px solid #ccc";
        filaTG.style.padding = "10px";

        // LADO A: El Tipo
        const ladoATG = document.createElement('div');
        ladoATG.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoATG.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBTG = document.createElement('div');
        ladoBTG.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBTG.style.display = "flex";
        ladoBTG.style.flexWrap = "wrap";
        ladoBTG.style.gap = "5px";

        // Ponemos un condicional por si el tipo no tiene clase definida (como 'stellar' o 'unknown')

        const TypeGenerations = dataItem.generation ? dataItem.generation.name : "N/A";
        //console.log(dataItem.generation);
        ladoBTG.innerHTML = `<span class="badge ${TypeGenerations}">${TypeGenerations}</span>`;

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaTG.appendChild(ladoATG);
        filaTG.appendChild(ladoBTG);
        TypeGeneration.appendChild(filaTG);


        /*  "game_indices": [{ game_index": 4, generation": {"name": "generation-i","url": "https://pokeapi.co/api/v2/generation/1/"}},], */
        //GAMES INDICES EN LA QUE SALE EL MISMO TIPO QUE EL QUE CARAGAMOS 
        // 1. Buscamos el contenedor principal donde irán todas las filas
        const TypeGameIndices = document.getElementById('t-types_game_indice');

        // 2. Creamos una "Fila" para este tipo específico
        const filaTGI = document.createElement('div');
        filaTGI.style.display = "flex"; // Esto crea el lado A y B
        filaTGI.style.borderBottom = "1px solid #ccc";
        filaTGI.style.padding = "10px";

        // LADO A: El Tipo
        const ladoATGI = document.createElement('div');
        ladoATGI.style.flex = "1"; // Ocupa un espacio fijo a la izquierda
        ladoATGI.innerHTML = `<strong class="type ${dataItem.name}">${dataItem.name.toUpperCase()}</strong>`;

        // LADO B: Los Pokémon
        const ladoBTGI = document.createElement('div');
        ladoBTGI.style.flex = "3"; // Ocupa el resto del espacio a la derecha
        ladoBTGI.style.display = "flex";
        ladoBTGI.style.flexWrap = "wrap";
        ladoBTGI.style.gap = "5px";

        //console.log(dataItem.game_indices);
        // Llenamos el Lado B con los Pokémon de este tipo
        dataItem.game_indices.slice(0, 10).forEach(p => { // slice(0,10) para no saturar
            const span = document.createElement('span');
            span.className = 'item';
            span.innerText = " ID : " + p.game_index + " Gen : " + p.generation.name;
            span.style.background = "#eee";
            span.style.padding = "2px 5px";
            span.style.borderRadius = "4px";
            ladoBTGI.appendChild(span);
        });

        // 3. Unimos A y B en la fila, y la fila al contenedor
        filaTGI.appendChild(ladoATGI);
        filaTGI.appendChild(ladoBTGI);
        TypeGameIndices.appendChild(filaTGI);



        /*garfica de tipo sde momento esta en el script.js */
        /*
         "damage_relations": {
        "double_damage_from": [{
                "name": "water",
                "url": "https://pokeapi.co/api/v2/type/11/"
            },
            {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            },
            {
                "name": "ice",
                "url": "https://pokeapi.co/api/v2/type/15/"
            }
        ],
        "double_damage_to": [{
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            },
            {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
            },
            {
                "name": "steel",
                "url": "https://pokeapi.co/api/v2/type/9/"
            },
            {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            },
            {
                "name": "electric",
                "url": "https://pokeapi.co/api/v2/type/13/"
            }
        ],
        "half_damage_from": [{
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            },
            {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
            }
        ],
        "half_damage_to": [{
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
            },
            {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        ],
        "no_damage_from": [{
            "name": "electric",
            "url": "https://pokeapi.co/api/v2/type/13/"
        }],
        "no_damage_to": [{
            "name": "flying",
            "url": "https://pokeapi.co/api/v2/type/3/"
        }]
    },
     */




        /* filtro para que se busque segun el name sien 'es' o 'en' */
        /*
        "names": [{
                "language": {
                    "name": "es",
                    "url": "https://pokeapi.co/api/v2/language/7/"
                },
                "name": "Tierra"
            },
            {
                "language": {
                    "name": "en",
                    "url": "https://pokeapi.co/api/v2/language/9/"
                },
                "name": "Ground"
            }
        ]
        */

        /* grafica o datos de antiguos valores */
        /*"past_damage_relations": [],*/

        /* imagenes del tipo de pokemon  */
        /*
        "sprites": {
            "generation-iii": {
                "colosseum": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/colosseum/5.png"
                },
                "emerald": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/5.png"
                },
                "firered-leafgreen": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/firered-leafgreen/5.png"
                },
                "ruby-sapphire": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/ruby-sapphire/5.png"
                },
                "xd": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/xd/5.png"
                }
            },
            "generation-iv": {
                "diamond-pearl": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/diamond-pearl/5.png"
                },
                "heartgold-soulsilver": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/heartgold-soulsilver/5.png"
                },
                "platinum": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/platinum/5.png"
                }
            },
            "generation-ix": {
                "scarlet-violet": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/5.png"
                }
            },
            "generation-v": {
                "black-2-white-2": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/5.png"
                },
                "black-white": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/5.png"
                }
            },
            "generation-vi": {
                "omega-ruby-alpha-sapphire": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/5.png"
                },
                "x-y": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/x-y/5.png"
                }
            },
            "generation-vii": {
                "lets-go-pikachu-lets-go-eevee": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/5.png"
                },
                "sun-moon": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/sun-moon/5.png"
                },
                "ultra-sun-ultra-moon": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/ultra-sun-ultra-moon/5.png"
                }
            },
            "generation-viii": {
                "brilliant-diamond-shining-pearl": {
                    "name_icon": null
                },
                "legends-arceus": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/5.png"
                },
                "sword-shield": {
                    "name_icon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/5.png"
                }
            }
        }
        */
        /* Faltaria que se limpien los container o los datos que se suma repetivdamente */
    } catch (error) {
        console.error("Error cargando imagen del item:", error);
    }
}