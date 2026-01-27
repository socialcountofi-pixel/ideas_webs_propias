
                 import React from "react";
 import ReactDOM from "react-dom";
import "./index.css";

const POKEMON = 1;

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function padStats(stat, val, sep, len) {
    val = val || "xx";
    let output = `
    ${stat.toString()}${sep.repeat(len - (val.toString().length + stat.toString().length))}${val.toString()}`;
    return output;
}

class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestRoot: "https://pokeapi.co/api/v2/pokemon/",
            pokemonIndex: POKEMON,
            pokemonData: {},
            pokemonDescription: "",
            speciesData: {},
            evoSprites: [],
            evoNames: [],
            moves: [],
            loading: false
        };
        this.nextPokemon = this.nextPokemon.bind(this);
        this.previousPokemon = this.previousPokemon.bind(this);
        this.pickPokemon = this.pickPokemon.bind(this);
    }

    nextPokemon() {
        const next = Math.min(this.state.pokemonIndex + 1, 949);
        this.setState({ pokemonIndex: next }, this.changePokemon);
    }

    previousPokemon() {
        const prev = Math.max(this.state.pokemonIndex - 1, 1);
        this.setState({ pokemonIndex: prev }, this.changePokemon);
    }

    pickPokemon(no) {
        this.setState({ pokemonIndex: no }, this.changePokemon);
    }

    componentDidMount() {
        this.changePokemon();
    }

    changePokemon() {
        this.setState({ loading: true });
        const request = `${this.state.requestRoot}${this.state.pokemonIndex}/`;
        fetch(request, {
            cache: &quot;force-cache"
        })
            .then(response =&gt; response.json())
            .then(data =&gt; {
                this.setState({
                    pokemonData: data,
                    pokemonIndex: data.id
                });
                const speciesRequest = data.species.url;
                return fetch(speciesRequest);
            })
            .then(response =&gt; response.json())
            .then(data =&gt; {
                this.setState({
                    speciesData: data,

                    description: pickRandom(
                        data.flavor_text_entries.filter(e =&gt; e.language.name === "en").map(e =&gt; e.flavor_text)
                    ),

                    loading: false
                });
                const evo_chain = data.evolution_chain.url;
                fetch(evo_chain)
                    .then(response =&gt; response.json())
                    .then(data =&gt; {
                        const api = "https://pokeapi.co/api/v2/pokemon/";
                        const first = data.chain;
                        let second;
                        let third;
                        let evos = [];
                        if (first) {
                            const e1 = fetch(`${api}${first.species.name}/`);
                            evos.push(e1);
                            second = first.evolves_to[0];
                        }
                        if (second) {
                            const e2 = fetch(`${api}${second.species.name}/`);
                            third = second.evolves_to[0];

                            evos.push(e2);
                        }
                        if (third) {
                            const e3 = fetch(`${api}${third.species.name}/`);
                            evos.push(e3);
                        }
                        Promise.all(evos)
                            .then(responses =&gt; Promise.all(responses.map(value =&gt; value.json())))
                            .then(dataList =&gt; {
                                const sprites = dataList.map(v =&gt; v.sprites.front_default);
                                const names = dataList.map(n =&gt; n.name);
                                this.setState({ evoSprites: sprites, evoNames: names });
                            });
                    });
            });
    }

    render() {
        const pData = this.state.pokemonData;
        const sData = this.state.speciesData;

        return (
            &lt;div className="pokedex"&gt;
                &lt;LeftPanel
                    pData={pData}
                    sData={sData}
                    no={this.state.pokemonIndex}
                    description={this.state.description}
                /&gt;
                &lt;Divider /&gt;
                &lt;RightPanel
                    pData={pData}
                    sData={sData}
                    evoSprites={this.state.evoSprites}
                    evoNames={this.state.evoNames}
                    controls={{ next: this.nextPokemon, prev: this.previousPokemon, pick: this.pickPokemon }}
                    no={this.state.pokemonIndex}
                /&gt;
                {/* &lt;TypeList /&gt; */}
            &lt;/div&gt;
        );
    }
}

function LeftPanel(props) {
    const pData = props.pData;

    if (typeof pData === "object" &amp;&amp; Object.keys(pData).length !== 0) {
        return (
            &lt;div className="panel left-panel"&gt;
                &lt;PokemonName name={pData.name} no={props.no} /&gt;
                &lt;PokemonSprite src={pData.sprites} /&gt;
                &lt;PokemonDescription description={props.description} no={props.no} /&gt;
            &lt;/div&gt;
        );
    } else {
        return Loading();
    }
}

function PokemonName(props) {
    return (
        &lt;div className="pokemon-name screen"&gt;
            {props.name}
            &lt;span className="name-no"&gt;no. {props.no}&lt;/span&gt;
        &lt;/div&gt;
    );
}

class PokemonSprite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            front: true,
            shiny: false,
            female: false
        };

        this.toggleGender = this.toggleGender.bind(this);
        this.toggleShiny = this.toggleShiny.bind(this);
        this.toggleFront = this.toggleFront.bind(this);
    }

    buildImage() {
        const dir = this.state.front ? "front" : "back";
        const gender = this.state.female ? "_female&quot; : &quot;&quot;;
        const shiny = this.state.shiny ? "_shiny&quot; : &quot;_default&quot;;
        // console.log(dir + shiny + gender);
        return dir + shiny + gender;
    }

    toggleGender() {
        // console.log(&quot;toggling gender");
        this.setState({ female: !this.state.female }, () =&gt; {
            if (this.props.src[this.buildImage()]) {
                return;
            } else {
                this.setState({ female: false });
            }
        });
    }

    toggleShiny() {
        // console.log(&quot;toggling shiny");
        this.setState({ shiny: !this.state.shiny }, () =&gt; {
            if (this.props.src[this.buildImage()]) {
                return;
            } else {
                this.setState({ shiny: false });
            }
        });
    }

    toggleFront() {
        // console.log("toggling front");
        this.setState({ front: !this.state.front }, () =&gt; {
            if (this.props.src[this.buildImage()]) {
                return;
            } else {
                this.setState({ front: false });
            }
        });
    }

    render() {
        const imgSrc = this.props.src[this.buildImage()] || this.props.src["front_default"];
        const funcs = { gender: this.toggleGender, front: this.toggleFront, shiny: this.toggleShiny };
        return (
            &lt;div&gt;
                &lt;img src={imgSrc} alt="pokemon" className="pokemon-sprite" /&gt;
                &lt;SpriteControls
                    funcs={funcs}
                    gender={this.state.female}
                    shiny={this.state.shiny}
                    front={this.state.front}
                /&gt;
            &lt;/div&gt;
        );
    }
}

function SpriteControls(props) {
    return (
        &lt;div className=&quot;sprite-controls&quot;&gt;
            &lt;div
                className={&quot;sprite-control sprite-controls-gender &quot; + (props.gender ? &quot;sprite-control-selected&quot; : &quot;&quot;)}
                onClick={props.funcs.gender}
            &gt;
                &lt;i className=&quot;fas fa-venus&quot; /&gt;
            &lt;/div&gt;
            &lt;div
                className={&quot;sprite-control sprite-controls-shiny &quot; + (props.shiny ? &quot;sprite-control-selected&quot; : &quot;&quot;)}
                onClick={props.funcs.shiny}
            &gt;
                &lt;span&gt;shiny&lt;/span&gt;
            &lt;/div&gt;
            &lt;div
                className={&quot;sprite-control sprite-controls-rotate &quot; + (!props.front ? &quot;sprite-control-selected&quot; : &quot;&quot;)}
                onClick={props.funcs.front}
            &gt;
                &lt;i className=&quot;fas fa-undo&quot; /&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
}

function PokemonDescription(props) {
    return &lt;div className=&quot;pokemon-description screen&quot;&gt;{props.description}&lt;/div&gt;;
}

// class PokemonSpriteAnimated extends React.Component {
//     constructor(props) {
//         super(props);

//         const sprites = Object.keys(props.sprites)
//             .map(sprite =&gt; props.sprites[sprite])
//             .filter(url =&gt; url);

//         this.state = {
//             sprites: sprites,
//             index: 0
//         };
//     }

//     render() {
//         const index = this.state.index;
//         const sprites = this.state.sprites;
//         setTimeout(() =&gt; this.setState({ index: (index + 1) % sprites.length }), 1000);

//         return &lt;PokemonSprite src={sprites[index]} /&gt;;
//     }
// }

function Divider(props) {
    return (
        &lt;div className=&quot;divider&quot;&gt;
            &lt;div className=&quot;gap&quot; /&gt;
            &lt;div className=&quot;hinge&quot; /&gt;
            &lt;div className=&quot;gap&quot; /&gt;
            &lt;div className=&quot;hinge&quot; /&gt;
            &lt;div className=&quot;gap&quot; /&gt;
            &lt;div className=&quot;hinge&quot; /&gt;
            &lt;div className=&quot;gap&quot; /&gt;
        &lt;/div&gt;
    );
}

function RightPanel(props) {
    const types = props.pData.types;
    const stats = props.pData.stats;
    const moves = props.pData.moves;

    if (types) {
        return (
            &lt;div className=&quot;panel right-panel&quot;&gt;
                &lt;div className=&quot;panel-row&quot;&gt;
                    &lt;PokemonStats stats={stats} /&gt;
                    &lt;PokemonType types={types} /&gt;
                &lt;/div&gt;

                &lt;PokemonEvolution evoSprites={props.evoSprites} evoNames={props.evoNames} /&gt;
                &lt;ButtonChrome /&gt;
                &lt;MoveList moves={moves} /&gt;
                &lt;PokedexControls controls={props.controls} no={props.no} /&gt;
            &lt;/div&gt;
        );
    } else {
        return Loading();
    }
}

function PokemonStats(props) {
    const stats = props.stats;
    return (
        &lt;div className=&quot;screen stats&quot;&gt;
            {stats.map(s =&gt; {
                const name = s.stat.name;
                const value = s.base_stat;

                return &lt;StatLine name={name} value={value} key={name} /&gt;;
            })}
        &lt;/div&gt;
    );
}
function StatLine(props) {
    return (
        &lt;div className=&quot;stat-line&quot;&gt;
            {padStats(props.name, props.value, &quot;.&quot;, 20)}
            {/* &lt;span&gt;{props.name}&lt;/span&gt;
      {&quot;.&quot;.repeat(20 - props.name.length)}
      &lt;span&gt;{props.value}&lt;/span&gt; */}
        &lt;/div&gt;
    );
}

function PokemonType(props) {
    const types = props.types;
    return (
        &lt;div className=&quot;type-list&quot;&gt;
            &lt;div className=&quot;panel-header&quot;&gt;Types&lt;/div&gt;
            &lt;div className=&quot;type-box&quot;&gt;
                {types.map(t =&gt; {
                    const type = t.type.name;
                    return &lt;Type type={type} key={type} /&gt;;
                })}
            &lt;/div&gt;
            {/* &lt;div className=&quot;panel-header&quot;&gt;Evolutions&lt;/div&gt; */}
        &lt;/div&gt;
    );
}

function PokemonEvolution(props) {
    const e1 = props.evoSprites[0];
    const e2 = props.evoSprites[1];
    const e3 = props.evoSprites[2];
    const n1 = props.evoNames[0];
    const n2 = props.evoNames[1];
    const n3 = props.evoNames[2];

    return (
        &lt;div className=&quot;panel-row panel-evo&quot;&gt;
            {/* &lt;div className=&quot;panel-header evo-header&quot;&gt;Evolutions&lt;/div&gt; */}
            &lt;PokemonSpriteSmall src={e1} evo=&quot;I&quot; name={n1} /&gt;
            &lt;PokemonSpriteSmall src={e2} evo=&quot;II&quot; name={n2} /&gt;
            &lt;PokemonSpriteSmall src={e3} evo=&quot;III&quot; name={n3} /&gt;
        &lt;/div&gt;
    );
}

function PokemonSpriteSmall(props) {
    let evoImage;

    if (props.src) {
        evoImage = &lt;img src={props.src} alt=&quot;pokemon&quot; className=&quot;pokemon-sprite pokemon-sprite-small&quot; /&gt;;
    } else {
        evoImage = &lt;PokeBall /&gt;;
    }

    return (
        &lt;div&gt;
            &lt;div className=&quot;flex-center&quot;&gt;
                &lt;div className=&quot;evo-num&quot;&gt;{props.evo}&lt;/div&gt;
            &lt;/div&gt;
            {evoImage}
            &lt;div className=&quot;screen evo-name&quot;&gt;{props.name || &quot;No Data&quot;}&lt;/div&gt;
        &lt;/div&gt;
    );
}

function PokeBall(props) {
    return (
        &lt;div className=&quot;pokemon-sprite pokemon-sprite-small empty-evo&quot;&gt;
            &lt;div className=&quot;poke-ball&quot;&gt;
                &lt;div className=&quot;poke-ball-top&quot; /&gt;
                &lt;div className=&quot;poke-ball-center&quot;&gt;
                    &lt;div className=&quot;poke-ball-dot&quot; /&gt;
                &lt;/div&gt;
                &lt;div className=&quot;poke-ball-bottom&quot; /&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
}

function ButtonChrome(props) {
    return (
        &lt;div className=&quot;panel-row blue-buttons&quot;&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
            &lt;div className=&quot;blue-button&quot; /&gt;
        &lt;/div&gt;
    );
}
class MoveList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            currentMove: {},
            loading: false
        };
        this.nextMove = this.nextMove.bind(this);
        this.prevMove = this.prevMove.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.moves[0].move.name);
        this.loadMoves();
    }

    loadMoves() {
        this.setState({ loading: true, index: this.state.index }, () =&gt; {
            fetch(this.props.moves[this.state.index].move.url)
                .then(response =&gt; response.json())
                .then(data =&gt; {
                    this.setState({ currentMove: data, loading: false });
                });
        });
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don&#39;t forget to compare props):
        if (this.props.moves !== prevProps.moves) {
            this.setState({ index: 0 }, this.loadMoves);
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.props.func(this.state.id);
    }

    render() {
        return (
            &lt;div&gt;
                &lt;input
                    type=&quot;number&quot;
                    className=&quot;screen num-input&quot;
                    placeholder={this.props.no}
                    onChange={this.handleChange}
                /&gt;
                &lt;div className=&quot;submit&quot; onClick={this.handleClick} /&gt;
            &lt;/div&gt;
        );
    }
}

function Loading() {
    return &lt;h1&gt;LOADING...&lt;/h1&gt;;
}

function Type(props) {
    return &lt;div className={&quot;type &quot; + props.type}&gt;{props.type}&lt;/div&gt;;
}

ReactDOM.render(&lt;Pokedex /&gt;, document.getElementById(&quot;root&quot;));

// class TypeList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             data: []
//         };
//     }

//     componentDidMount() {
//         this.setState({ loading: true });

//         let request = &quot;https://pokeapi.co/api/v2/type/&quot;;

//         fetch(request)
//             .then(response =&gt; response.json())
//             .then(data =&gt; this.setState({ data: data.results, loading: false }));
//     }

//     render() {
//         return (
//             &lt;div className="type-list"&gt;
//                 {this.state.loading ? (
//                     &lt;Loading /&gt;
//                 ) : (
//                     this.state.data.map(d =&gt; {
//                         return &lt;Type type={d.name} key={d.name} /&gt;;
//                     })
//                 )}
//             &lt;/div&gt;
//         );
//     }
// }

              