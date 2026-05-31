// url https://pokeapi.co/api/v2/stat/ 
import { datosChainEvo } from './evolution_chain.js';

/* ===========================
   inicio de species
=========================== */
let colorPoke = '';
export async function datosSpecies(url) {
    // console.log('specie', url);
    document.getElementById("psp-varieties").innerText = '';
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

    document.getElementById("psp-pokemon_species").innerText = '';
    document.getElementById("psp-pokemon_species").innerText += ' base_happiness : ' + s.base_happiness +
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
    document.getElementById("psp-color").innerText = '';
    document.getElementById("psp-color").innerText += s.color.name;
    document.getElementById("psp-color").style.backgroundColor = '';
    document.getElementById("psp-color").style.backgroundColor += s.color.name;
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
    document.getElementById("psp-habitat").innerText = '';
    document.getElementById("psp-habitat").innerText += ' habitat : ' + s.habitat.name;
    /*
    names :(11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    pal_park_encounters :[{…}]
    pokedex_numbers :(9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]*/
    /*shape :{name: 'quadruped', url: 'https://pokeapi.co/api/v2/pokemon-shape/8/'}*/
    document.getElementById("ps-shape").innerHTML = '';
    document.getElementById("ps-shape").innerHTML += 'Shape : ' + s.shape.name;
    /*
    varieties :Array(3)[{}]
    0 :{is_default :true,pokemon :{name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/'}}
    1 :{is_default: false, pokemon: {name: 'venusaur-mega', url: 'https://pokeapi.co/api/v2/pokemon/10033/'}}
    2 :{is_default: false, pokemon: {name: 'venusaur-gmax', url: 'https://pokeapi.co/api/v2/pokemon/10195/'}}
    length :3
       */
    // variedeades del pokemon pasamos las url

    document.getElementById("psp-varieties").innerText = s.varieties
        .map((t) => ` varieties : ${t.pokemon.name}  utl : ${t.pokemon.url}`)
        .join("");
    /* pasamos la url para que carguen la imagenes de las variedades */
    // Limpiar el div UNA sola vez antes de agregar nuevas imágenes
    document.getElementById("psp-sprites-varieties").innerHTML = "";
    // Limpiar el div antes de cargar las nuevas imágenes

    // Recorrer las variedades y cargar las imágenes
    s.varieties.forEach((t) => mostrarimagenesvarieties(t.pokemon.url));

    /* pasa a url para mostra la imagen de casa pokemon */
    /* evolution_chain :{url: 'https://pokeapi.co/api/v2/evolution-chain/1/'} */
    datosChainEvo(s.evolution_chain.url);

}

export async function mostrarimagenesvarieties(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        const imagen = data.sprites.front_default;

        // Aquí no limpies el div cada vez, solo agrega la imagen
        const div = document.getElementById("psp-sprites-varieties");
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