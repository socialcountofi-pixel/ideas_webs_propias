// ====================================================
// CONFIGURACIÓN GLOBAL
// ====================================================

export const API_BASE = "https://pokeapi.co/api/v2/";

// Almacenar datos en caché para mejorar rendimiento de toda las apis
export const cache = {

    pokemon: {},
    /* stat:"https://pokeapi.co/api/v2/stat/" */
    stat: null,
    /* generation:"https://pokeapi.co/api/v2/generation/" */
    generation: null,
    /* type: "https://pokeapi.co/api/v2/type/" */
    type: null,
    /* ability:"https://pokeapi.co/api/v2/ability/" */
    ability: null,
    /* move:"https://pokeapi.co/api/v2/move/" */
    move: null,
    /* egg-group: "https://pokeapi.co/api/v2/egg-group/" */
    egg_group: null,
    /* pokemon-color: "https://pokeapi.co/api/v2/pokemon-color/" */
    pokemon_color: null,
    /* pokemon-habitat: "https://pokeapi.co/api/v2/pokemon-habitat/" */
    pokemon_habitat: null,
    /* pokemon-shape: "https://pokeapi.co/api/v2/pokemon-shape/" */
    pokemon_shape: null,
    /* pokedex: "https://pokeapi.co/api/v2/pokedex/" */
    pokedex: null,
    /* gender: "https://pokeapi.co/api/v2/gender/" */
    gender: null,
    /* evolution-trigger: "https://pokeapi.co/api/v2/evolution-trigger/" */
    evolution_trigger: null,
    /*growth-rate:"https://pokeapi.co/api/v2/growth-rate/"    contabiliza pokemon po rapidex de level */
    growth_rate: null,
    /*pal-park-area:"https://pokeapi.co/api/v2/pal-park-area/"*/
    pal_park_area: null,

    // ====================================================
    // MENU VERTICAL CON FILTROS SI HACE FALTA
    // ====================================================
    /* region:"https://pokeapi.co/api/v2/region/" */
    region: null,
    /* nature:"https://pokeapi.co/api/v2/nature/" */
    nature: null,
    /*"https://pokeapi.co/api/v2/pokemon-species/"*/ //obtenemos la variedades del pokemon -gmax,alola...
    pokemon_species: null,
    /*"https://pokeapi.co/api/v2/pokemon-form/"*/ //obtenemos las formas del pokemon flabebe-orange,-red y asi 
    pokemon_form: null,


};
/*
api	,variablereferencia,variablereferencia2,variablereferencia3
pokemon ,p ,pokemon
ability ,a ,ability
pokemon-species ,pe,pokemon_species ,pokemonspecies 
version-group ,vg,version_group,versiongroup
version ,v,version
type ,t,type
super-contest-effect ,sce,super_contest_effect,supercontesteffect
stat ,s,stat
region ,r,region
pokedex ,px,pokedex
pokemon-shape ,ps,pokemon_shape,pokemonshape
pal-park-area ,ppa
pokemon-habitat ,ph
pokemon-form ,pf
pokemon-color ,pc
pokeathlon-stat ,pas
nature ,n
move-target ,mt
move-learn-method ,mlm
move-damage-class ,mdc
move-category ,mc
move-battle-style ,mbl
move-ailment ,mal
machine ,ma
move ,m
location ,lo
location-area ,la
language ,l
item-pocket ,ip
item-fling-effect ,ife
item-category ,ic
item-attribute ,ia
item ,i
growth-rate ,gr
generation ,gn
gender ,g
evolution-trigger ,et
encounter-method ,em
egg-group ,eg
encounter-condition-value ,ecv
encounter-condition ,ec
evolution-chain ,ec
contest-type ,ct
contest-effect ,ce
characteristic ,c
berry-firmness ,bfi
berry-flavor ,bf
berry ,b

*/