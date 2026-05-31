//Export es para permitir importar los resultado o las funciones necesarias
// url https://pokeapi.co/api/v2/stat/ 
import { itemstatimg } from './api_item.js';
/* promise solo si hace falta  await Promise.all(datos que pasan o usan dataStat ); */


export async function dataStat(urltipo) {



    try {
        //console.log('stats', urltipo);
        /*
"game_index": 1,
"id": 1,
"is_battle_only": false,
"name": "hp",
*/


        const resItem = await fetch(urltipo);
        const dataItem = await resItem.json();

        /* para mostrar el json crudo por pantalla */
        // document.getElementById('json-raw').innerText = JSON.stringify(dataItem, null, 2);
        //console.log('stats2', dataItem);

        const game_index = dataItem.game_index;
        const id = dataItem.id;
        const is_battle_only = dataItem.is_battle_only;
        const name = dataItem.name;

        //console.log(' game_index : ' + game_index + ' id : ' + id + ' is_battle_only : ' + is_battle_only + ' name : ' + name);


        /*
                "affecting_items": [{
                    "name": "hp-up",
                    "url": "https://pokeapi.co/api/v2/item/45/"
                }],
                */

        const statName = dataItem.name;
        const iname = `i-${statName}`;
        document.getElementById(iname).innerHTML = '';
        const elemento = document.getElementById(iname);
        // Entramos en 'increase' que es donde están Protein, Iron, etc.
        dataItem.affecting_items.forEach(o => {

            if (elemento) {
                // Usamos += para añadir el nombre sin borrar lo que ya había
                // Añadimos una coma si el elemento ya tiene texto
                if (elemento.innerText !== "") {
                    elemento.innerText += ", " + o.name;
                } else {
                    elemento.innerText = o.name;
                }
                itemstatimg(o.url, statName);
            }
            //console.log(`Stat: ${statName}, Item detectado: ${o.url}`);

        });



        /*
    "affecting_moves": {
        "decrease": [],
        "increase": []
    },
    */
        const saffect = `affecting_moves_d-${statName}`;
        document.getElementById(saffect).innerHTML = '';
        const saffectN = document.getElementById(saffect);
        dataItem.affecting_moves.decrease.forEach(oo => {
            if (saffectN) {
                // Usamos += para añadir el nombre sin borrar lo que ya había
                // Añadimos una coma si el elemento ya tiene texto
                if (saffectN.innerText !== "") {
                    saffectN.innerText += " , " + oo.move.name;
                } else {
                    saffectN.innerText = oo.name;
                }

            }
            //console.log(`Stat: ${statName}, Item detectado: ${o.url}`);


        });

        const saffecti = `affecting_moves_i-${statName}`;
        document.getElementById(saffecti).innerHTML = '';
        const saffectNi = document.getElementById(saffecti);
        dataItem.affecting_moves.increase.forEach(oo => {

            if (saffectNi) {
                // Usamos += para añadir el nombre sin borrar lo que ya había
                // Añadimos una coma si el elemento ya tiene texto
                if (saffectNi.innerText !== "") {
                    saffectNi.innerText += " , " + oo.move.name;
                } else {
                    saffectNi.innerText = oo.name;
                }

            }
            //console.log(`Stat: ${statName}, Item detectado: ${o.url}`);


        });

        dataItem.affecting_natures.decrease.forEach(op => {

            if (elemento) {
                // Usamos += para añadir el nombre sin borrar lo que ya había
                // Añadimos una coma si el elemento ya tiene texto
                if (elemento.innerText !== "") {
                    //elemento.innerText += "affecting_natures.decrease , " + op.name;
                } else {
                    elemento.innerText = op.name;
                }
            }
            //console.log(`Stat: ${statName}, Item detectado: ${o.url}`);


        });
        /*
           "affecting_natures": {
               "decrease": [],
               "increase": []
           },
           */
        dataItem.affecting_natures.increase.forEach(op => {

            if (elemento) {
                // Usamos += para añadir el nombre sin borrar lo que ya había
                // Añadimos una coma si el elemento ya tiene texto
                if (elemento.innerText !== "") {
                    //elemento.innerText += " affecting_natures.increase , " + op.name;
                } else {
                    elemento.innerText = op.name;
                }

            }
            //console.log(`Stat: ${statName}, Item detectado: ${op.url}`);


        });

        /*
            "characteristics": [{
                    "url": "https://pokeapi.co/api/v2/characteristic/1/"
                },
                {
                    "url": "https://pokeapi.co/api/v2/characteristic/7/"
                },
            ],
            */

        /*
        move_damage_class: { name: 'special', url: 'https://pokeapi.co/api/v2/move-damage-class/3/' } 
        * /

        /*
        "names": [{
                "language": {
                    "name": "es",
                    "url": "https://pokeapi.co/api/v2/language/7/"
                },
                "name": "PS"
            },
            {
                "language": {
                    "name": "en",
                    "url": "https://pokeapi.co/api/v2/language/9/"
                },
                "name": "HP"
            },
            
        ] 
            */

    } catch (error) {
        console.error("Error cargando imagen del item:", error);
    }



}
/* otra form ade contabilizarlos */
/*affecting_items: [{…}, {…}]*/
/*affecting_moves: {decrease: Array(20), increase: Array(17)}*/
/*affecting_natures: {decrease: Array(4), increase: Array(4)}*/
/*characteristics: [{…}, {…}, {…}, {…}, {…}]*/
/*game_index: 6*/
/*id: 5*/
/*is_battle_only: false*/
/*move_damage_class: {name: 'special', url: 'https://pokeapi.co/api/v2/move-damage-class/3/'}*/
/*name: "special-defense"*/
/*names: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]*/