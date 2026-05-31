export
/**
 * Obtiene todos los contadores y datos da cada api
 */
async function resultadosApis() {
    const ara = [
        "https://pokeapi.co/api/v2/berry/",
        "https://pokeapi.co/api/v2/berry-firmness/",
        "https://pokeapi.co/api/v2/berry-flavor/",
        "https://pokeapi.co/api/v2/characteristic/",
        "https://pokeapi.co/api/v2/contest-effect/",
        "https://pokeapi.co/api/v2/contest-type/",
        //"https://pokeapi.co/api/v2/egg-group/",
        "https://pokeapi.co/api/v2/encounter-condition/",
        "https://pokeapi.co/api/v2/encounter-condition-value/",
        "https://pokeapi.co/api/v2/encounter-method/",
        "https://pokeapi.co/api/v2/evolution-chain/",
        //"https://pokeapi.co/api/v2/evolution-trigger/",
        //"https://pokeapi.co/api/v2/ability/",
        //"https://pokeapi.co/api/v2/gender/",
        //"https://pokeapi.co/api/v2/generation/",
        //"https://pokeapi.co/api/v2/growth-rate/",
        "https://pokeapi.co/api/v2/item/",
        "https://pokeapi.co/api/v2/item-attribute/",
        "https://pokeapi.co/api/v2/item-category/",
        "https://pokeapi.co/api/v2/item-fling-effect/",
        "https://pokeapi.co/api/v2/item-pocket/",
        "https://pokeapi.co/api/v2/language/",
        //\\"https://pokeapi.co/api/v2/location/",
        //\\"https://pokeapi.co/api/v2/location-area",
        "https://pokeapi.co/api/v2/machine/",
        "https://pokeapi.co/api/v2/meta/",
        //"https://pokeapi.co/api/v2/move/",
        "https://pokeapi.co/api/v2/move-ailment/",
        "https://pokeapi.co/api/v2/move-battle-style/",
        "https://pokeapi.co/api/v2/move-category/",
        "https://pokeapi.co/api/v2/move-damage-class/",
        "https://pokeapi.co/api/v2/move-learn-method/",
        "https://pokeapi.co/api/v2/move-target/",
        //\\"https://pokeapi.co/api/v2/nature/",
        //"https://pokeapi.co/api/v2/pal-park-area/",
        "https://pokeapi.co/api/v2/pokeathlon-stat/",
        //"https://pokeapi.co/api/v2/pokedex/",
        ////"https://pokeapi.co/api/v2/pokemon/",
        //"https://pokeapi.co/api/v2/pokemon-color/",
        ////"https://pokeapi.co/api/v2/pokemon-form/",
        //"https://pokeapi.co/api/v2/pokemon-habitat/",
        //"https://pokeapi.co/api/v2/pokemon-shape/",
        ////"https://pokeapi.co/api/v2/pokemon-species/",
        //\\"https://pokeapi.co/api/v2/region/",
        "https://pokeapi.co/api/v2/stat/",
        "https://pokeapi.co/api/v2/super-contest-effect/",
        //"https://pokeapi.co/api/v2/type/",
        "https://pokeapi.co/api/v2/version/",
        "https://pokeapi.co/api/v2/version-group/"
    ];
    try {
        for (const species2 of ara) {
            const response = await fetch(species2);
            const data = await response.json();
            console.log(data, ' ', data.count)
        }

        for (const species of ara) {
            const response = await fetch(species + 1);
            const data = await response.json();
            console.log(species, " ", data, " ", data.count);
        }
    } catch (error) {
        console.error("Error fetching types:", error);
    }
}

/*
Valores contados enla grafica
"https://pokeapi.co/api/v2/egg-group/",

*/