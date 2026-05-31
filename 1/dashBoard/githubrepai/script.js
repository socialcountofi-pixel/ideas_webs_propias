<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PokÃ©mon Dashboard - API Explorer</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
</head>

<body>
    <!-- Barra de navegaciÃ³n superior -->
    <nav class="navbar">
        <div class="navbar-container">
            <div class="logo">PokÃ©mon Dashboard</div>
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Buscar PokÃ©mon...">
                <button id="searchBtn">ðŸ”�</button>
            </div>
            <div class="nav-links">
                <a href="#" data-section="overview">Vista General</a>
                <a href="#" data-section="pokemon">PokÃ©mon</a>
                <a href="#" data-section="types">Tipos</a>
                <a href="#" data-section="stats">EstadÃ­sticas</a>
                <a href="#" data-section="regions">regions</a>
                <a href="#" data-section="natures">nature</a>
                <a href="#" data-section="machines">machine</a>
                <!--<a href="#" data-section="pokemonforms">pokemon form</a>-->
                <a href="#" data-section="pokemonspecies">pokemon species</a>
            </div>
        </div>
    </nav>

    <!-- Contenedor principal -->
    <div class="container">
        <!-- Sidebar de navegaciÃ³n -->
        <aside class="sidebar">
            <h3>Explorar APIs</h3>
            <div class="nav-menu">
                <!-- Generaciones -->
                <div class="menu-item">
                    <button class="menu-toggle">Generaciones</button>
                    <div class="submenu" id="generationsMenu"></div>
                </div>

                <!-- Tipos -->
                <div class="menu-item">
                    <button class="menu-toggle">Tipos</button>
                    <div class="submenu" id="typesMenu"></div>
                </div>

                <!-- Habilidades -->
                <div class="menu-item">
                    <button class="menu-toggle">Habilidades</button>
                    <div class="submenu" id="habilidadesMenu"></div>
                </div>


                <!-- Movimientos -->
                <div class="menu-item">
                    <button class="menu-toggle">Movimientos</button>
                    <div class="submenu" id="movesMenu"></div>
                </div>

                <!-- egg_group -->
                <div class="menu-item">
                    <button class="menu-toggle">Grupo huevo</button>
                    <div class="submenu" id="egggroupMenu"></div>
                </div>


                <!--  pokemon_color -->
                <div class="menu-item">
                    <button class="menu-toggle">pokemon_color</button>
                    <div class="submenu" id="pokemoncolorMenu"></div>
                </div>
                <!-- pokemon_habitat -->
                <div class="menu-item">
                    <button class="menu-toggle">pokemon_habitat</button>
                    <div class="submenu" id="pokemonhabitatMenu"></div>
                </div>
                <!--   pokemon_shape -->
                <div class="menu-item">
                    <button class="menu-toggle">pokemon_shape</button>
                    <div class="submenu" id="pokemonshapeMenu"></div>
                </div>
                <!-- pokedex -->
                <div class="menu-item">
                    <button class="menu-toggle">pokedex</button>
                    <div class="submenu" id="pokedexMenu"></div>
                </div>
                <!--  gender -->
                <div class="menu-item">
                    <button class="menu-toggle">gender</button>
                    <div class="submenu" id="genderMenu"></div>
                </div>
                <!--  evolution  trigger  -->
                <div class="menu-item">
                    <button class="menu-toggle">teigger evol</button>
                    <div class="submenu" id="evolutiontriggerMenu"></div>
                </div>
                <!--   grow  -->
                <div class="menu-item">
                    <button class="menu-toggle">growth rate Menu</button>
                    <div class="submenu" id="growthrateMenu"></div>
                </div>

                <!-- pal park area  -->
                <div class="menu-item">
                    <button class="menu-toggle">pal park area Menu</button>
                    <div class="submenu" id="palparkareaMenu"></div>
                </div>

                <!-- pokemon species  -->
                <div class="menu-item">
                    <button class="menu-toggle">pokemon species Menu</button>
                    <div class="submenu" id="pokemonspeciesMenu"></div>
                </div>
                <!-- pokemon form -->
                <div class="menu-item">
                    <button class="menu-toggle">pokemon form Menu</button>
                    <div class="submenu" id="pokemonformMenu"></div>
                </div>

            </div>
        </aside>

        <!-- Ã�rea de contenido principal -->
        <main class="main-content">
            <!-- SecciÃ³n de vista general -->
            <section id="overview-section" class="section active">
                <h2>Resumen del Dashboard</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>Total PokÃ©mon</h4>
                        <p id="totalPokemon" class="stat-value">-</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total Generaciones</h4>
                        <p id="totalGenerations" class="stat-value">-</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total Tipos</h4>
                        <p id="totalTypes" class="stat-value">-</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total Habilidades</h4>
                        <p id="totalAbilities" class="stat-value">-</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total movimientos</h4>
                        <p id="totalMove" class="stat-value">-</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total Grupo huevos</h4>
                        <p id="totalEggGroup" class="stat-value">-</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total Pokemon Color</h4>
                        <p id="totalPokemonColor" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Pokemon Habitat</h4>
                        <p id="totalPokemonHabitat" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Pokemon Shape</h4>
                        <p id="totalPokemonShape" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Pokedex</h4>
                        <p id="totalPokedex" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Genero </h4>
                        <p id="totalGender" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total trigers </h4>
                        <p id="totalEvolutionTrigger" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total growth rate </h4>
                        <p id="totalGrowthRate" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Pal Park Area </h4>
                        <p id="totalPalParkArea" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Species </h4>
                        <p id="totalPokemonSpecies" class="stat-value">-</p>
                    </div>

                    <div class="stat-card">
                        <h4>Total Form </h4>
                        <p id="totalPokemonForm" class="stat-value">-</p>
                    </div>

                </div>

                <!-- GrÃ¡fico de distribuciÃ³n de tipos -->
                <div class="chart-container">
                    <h3>DistribuciÃ³n de Tipos (Primeros 50 PokÃ©mon)</h3>
                    <canvas id="chartTypes"></canvas>
                </div>

                <!-- GrÃ¡fico de comparaciÃ³n de estadÃ­sticas -->
                <div class="chart-container">
                    <h3>EstadÃ­sticas Base Promedio por Tipo</h3>
                    <canvas id="chartStats"></canvas>
                </div>
            </section>

            <!-- SecciÃ³n de PokÃ©mon -->
            <section id="pokemon-section" class="section">
                <h2>Explorador de PokÃ©mon</h2>
                <div class="pokemon-filters">
                    <select id="generacionFilter">
                        <option value="">Todas las Generaciones</option>
                    </select>
                    <select id="typeFilter">
                        <option value="">Todos los Tipos</option>
                    </select>
                    <select id="habilidadFilter">
                        <option value="">Todas las Habilidades</option>
                    </select>
                </div>
                <div class="pokemon-grid" id="pokemonGrid"></div>
            </section>

            <!-- SecciÃ³n de Tipos -->
            <section id="types-section" class="section">
                <h2>Explorador de Tipos</h2>
                <div id="typesContainer" class="types-grid"></div>
            </section>

            <!-- SecciÃ³n de pokemon color -->
            <section id="pokemoncolor-section" class="section">
                <h2>Explorador de Tipos</h2>
                <div id="pokemoncolorContainer" class="pokemoncolor-grid"></div>
            </section>

            <!-- SecciÃ³n de shape -->
            <section id="pokemonshape-section" class="section">
                <h2>Explorador de Shapes</h2>
                <div id="pokemonshapeContainer" class="pokemonshape-grid"></div>
            </section>

            <!-- SecciÃ³n de pokedex -->
            <section id="pokedex-section" class="section">
                <h2>Explorador de Tipos</h2>
                <div id="pokedexContainer" class="pokedex-grid"></div>
            </section>


            <!-- SecciÃ³n de gender -->
            <section id="gender-section" class="section">
                <h2>Explorador de generos</h2>
                <div id="genderContainer" class="gender-grid"></div>
            </section>

            <!-- SecciÃ³n de trigges -->
            <section id="evolutiontrigger-section" class="section">
                <h2>Explorador de triggers evolutivos</h2>
                <div id="evolutiontriggerContainer" class="evolutiontrigger-grid"></div>
            </section>

            <!-- SecciÃ³n de pal park area -->
            <section id="totalpalparkarea-section" class="section">
                <h2>Explorador de triggers evolutivos</h2>
                <div id="totalpalparkarea" class="totalpalparkarea-grid"></div>
            </section>

            <!-- SecciÃ³n de moveas -->
            <section id="move-section" class="section">
                <h2>Explorador de triggers evolutivos</h2>
                <div id="moveContainer" class="move-grid"></div>
            </section>

            <!-- SecciÃ³n de egggroup-section -->
            <section id="egggroup-section" class="section">
                <h2>Explorador de eggg secc</h2>
                <div id="moveContainer" class="egggroup-grid"></div>
            </section>





            <!-- SecciÃ³n de stats -->
            <section id="stats-section" class="section">
                <h2>EstadÃ­sticas stats Generales</h2>
                <div class="pokemon-filters">
                    <!-- <div class="submenu" id="statsMenu"></div>-->
                    <select id="statsFilter">
                        <option value="" >Todas las Stadistcas</option>
                    </select>
                    <br>
                    <select id="statsFilterIncreaseN"> <!--incrementenaturalesas-->
                        <option value="" >Naturaleza Incrementa las Stadisticas</option>
                    </select>
                    <select id="statsFilterDecreaseN">
                        <option value="" >Naturaleza Reduce las Stadisticas</option>
                    </select>
                    <br>
                    <select id="statsFilterIncreaseM">
                        <option value="" >Movimiento Incrementa las Stadisticas</option>
                    </select>
                    <select id="statsFilterDecreaseM">
                        <option value="" >Movimiento Reduce las Stadisticas</option>
                    </select>
                </div>

                <div class="stats-detail">
                    <div id="statsDetail">Detalles del Item</div>
                    <div class="chart-container">
                        <h3>DistribuciÃ³n de EstadÃ­sticas</h3>
                        <canvas id="chartStatsDetail"></canvas>
                    </div>
                    <div id="statsTableContainer"></div>
                </div>
            </section>


            <!-- SecciÃ³n de rgiones -->
            <section id="regions-section" class="section">
                <h2>EstadÃ­sticas regions Generales</h2>
                <div class="pokemon-filters">
                    <!-- <div class="submenu" id="regionsMenu"></div>-->
                    <select id="regionsFilter">
                        <option value="" >Todas las regions</option>
                    </select>
                    <select id="Region_Location">
                        <option value="" >Region_Location</option>
                    </select>
                    <select id="Region_Location_area">
                        <option value="" >Region_Location_area</option>
                    </select>
                </div>

                <div class="regions-detail">
                    <div id="regionsDetail">Detalles del Item</div>
                    <div class="chart-container">
                        <h3>DistribuciÃ³n de EstadÃ­sticas</h3>
                        <canvas id="chartregionsDetail"></canvas>
                    </div>
                    <div id="regionsTableContainer"></div>
                </div>
            </section>

            <!-- SecciÃ³n de naturesa -->
            <section id="natures-section" class="section">
                <h2>EstadÃ­sticas regions Generales</h2>
                <div class="pokemon-filters">
                    <!-- <div class="submenu" id="regionsMenu"></div>-->
                    <select id="naturesFilter">
                        <option value="" >Todas las natures</option>
                    </select>
                    <select id="NatureDecreasedStat">
                        <option value="" >Nature Decreased Stat</option>
                    </select>
                    <select id="NatureIncreasedStat">
                        <option value="" >Nature Increased Stat</option>
                    </select>
                </div>

                <div class="natures-detail">
                    <div id="naturesDetail">Detalles del Item</div>
                    <div class="chart-container">
                        <h3>DistribuciÃ³n de EstadÃ­sticas</h3>
                        <canvas id="chartnaturesDetail"></canvas>
                    </div>
                    <div id="naturesTableContainer"></div>
                </div>
            </section>




            <!-- SecciÃ³n de stats -->
            <section id="machines-section" class="section">
                <h2>EstadÃ­sticas stats Generales</h2>
                <div class="pokemon-filters">
                    <!-- <div class="submenu" id="statsMenu"></div>-->
                    <select id="machinesFilter">
                        <option value="" >Todas las machines</option>
                    </select>
                    <br>
                    <select id="machinesDatos"> <!--incrementenaturalesas-->
                        <option value="" >machines Incrementa las Stadisticas</option>
                    </select>

                </div>

                <div class="machines-detail">
                    <div id="machinesDetail">Detalles del machines</div>
                    <div class="chart-container">
                        <h3>DistribuciÃ³n de EstadÃ­sticas</h3>
                        <canvas id="chartMachinesDetail"></canvas>
                    </div>
                    <div id="statsTableContainer"></div>
                </div>
            </section>


            <!-- SecciÃ³n de pokemon form -->
            <section id="pokemonforms-section" class="section">
                <h2>pokemon forms</h2>
                <div class="pokemon-filters">
                    <!-- <div class="submenu" id="regionsMenu"></div>-->
                    <select id="pokemonformsFilter">
                        <option value="" >Todas las natures</option>
                    </select>
                    <select id="pokemonformFilter2">
                        <option value="" >pokemonform Decreased Stat</option>
                    </select>

                </div>

                <div class="pokemonforms-detail">
                    <div id="pokemonformsDetail">Detalles del Item</div>
                    <div class="chart-container">
                        <h3>DistribuciÃ³n de EstadÃ­sticas</h3>
                        <canvas id="chartnaturesDetail"></canvas>
                    </div>
                    <div id="pokemonformsTableContainer"></div>
                </div>
            </section>


            <!-- SecciÃ³n de pokemon species -->
            <section id="pokemonspecies-section" class="section">
                <h2>pokemon species</h2>
                <div class="pokemon-filters">
                    <!-- <div class="submenu" id="regionsMenu"></div>-->
                    <select id="pokemonspeciesFilter">
                        <option value="" >Todas las species</option>
                    </select>
                    <select id="pokemonspeciesFilter2">
                        <option value="" >pokemonform Decreased Stat</option>
                    </select>

                </div>

                <div class="pokemonspecies-detail">
                    <div id="pokemonspeciesDetail">Detalles del Item</div>
                    <div class="chart-container">
                        <h3>DistribuciÃ³n de EstadÃ­sticas</h3>
                        <canvas id="chartnaturesDetail"></canvas>
                    </div>
                    <div id="pokemonspeciesTableContainer"></div>
                </div>
            </section>

            <!-- SecciÃ³n de detalles del PokÃ©mon -->
            <section id="pokemon-detail-section" class="section">
                <h2 id="pokemonDetailTitle">Detalles del PokÃ©mon</h2>
                <div class="pokemon-detail">
                    <!--contendor la imagen pokemon-->
                    <div class="pokemon-image-container">
                        <img id="pokemonImage" src="" alt="PokÃ©mon">
                    </div>

                    <!--contendor de la informacion del pokemon-->
                    <div class="pokemon-info">
                        <div class="info-row">
                            <label>Nombre:</label>
                            <span id="pokemonName"></span>
                        </div>
                        <div class="info-row">
                            <label>ID:</label>
                            <span id="pokemonId"></span>
                        </div>
                        <div class="info-row">
                            <label>Tipo(s):</label>
                            <span id="pokemonTypes"></span>
                        </div>

                        <div class="info-row">
                            <label>Habilidades:</label>
                            <span id="pokemonAbilities"></span>
                            <span id="resultadoabilidades"></span>
                        </div>
                        <div class="info-row">
                            <label>Altura:</label>
                            <span id="pokemonHeight"></span>
                        </div>
                        <div class="info-row">
                            <label>Peso:</label>
                            <span id="pokemonWeight"></span>
                        </div>
                    </div>

                    <!--contendor de las species-->
                    <div class="pokemon-image-container"> <label>especies:</label>
                        <div id="pokemonSpecies" src="" alt="PokÃ©mon">

                        </div>
                        <div id="pokemonVarieties" src="" alt="PokÃ©mon">


                        </div>
                    </div>

                    <!--contendor de las formas-->
                    <div class="pokemon-image-container"> <label>Formas:</label>
                        <div id="pokemonImagef" src="" alt="PokÃ©mon">

                        </div>
                    </div>
                    <!--contenedor de las evoluciones-->
                    <div class="pokemon-image-container"> <label>Evoluciones:</label>
                        <div id="pokemonImageV" src="" alt="PokÃ©mon">

                        </div>
                    </div>


                </div>
                <div id="pokemon-detail">

                </div>

                <!-- GrÃ¡fico de estadÃ­sticas del PokÃ©mon -->
                <div class="chart-container">
                    <h3>EstadÃ­sticas del PokÃ©mon</h3>
                    <!--lista de berrie para agregar al pokemon y aumenta las estadisticas-->
                    <div class="berries">berries
                        <h3>berri 1</h3>
                        <h3>berri 2</h3>
                        <div>
                            <h3>aÃ±adir</h3>
                            <!--aÃ±ade las bayas segun la cantidad seleccionada por defecto 1-->
                            <h3>numero de bayas</h3>
                            <!--si se aÃ±ade se actualiza la stat que le correspona siendo un maximo de 5 bayas por cada stats-->
                            <!--Siendo lo importante que se vea o difiera los cambios con un colo diferente al actualÃ±-->
                        </div>
                    </div>
                    <canvas id="chartPokemonStats"></canvas>
                </div>

                <!--es mejor en pantalla ya que debe mostra los datos de todos los ataque y datos ejemplo machine y sus dats-->
                <div>
                    <h3>lista objetos</h3>
                    <!--carga los objetos para aumentar la cantidad de movimientos-->
                    <h3>aÃ±adir</h3>
                    <!--se anade una cantidad de pp o ph al atake-->
                    <h3>cantidad de item</h3>
                    <!--cantidad de item que se aÃ±ade y se ve en pantalla ejemplo 10(30) siendo 10  por defecto de la base ded datos y (30)lo que ha aumentado segun la cantidad seleccionada-->
                </div>

                <!-- Movimientos del PokÃ©mon -->
                <div class="moves-container">
                    <h3>Movimientos</h3>
                    <div id="movesTable"></div>

                </div>
            </section>
        </main>
    </div>

    <!-- Modal para mostrar informaciÃ³n adicional -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modalBody"></div>
        </div>
    </div>

    <script type="module" src="script.js"></script>
    <!--<script src="egg_group.js"></script>-->
    <!--pruebas en caso de que funcione solo esto-->
</body>

</html>
