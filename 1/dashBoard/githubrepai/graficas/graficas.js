import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// Gráficos
let chartTypes = null;
let chartStats = null;
let chartPokemonStats = null;
// ====================================================
// FUNCIONES DE GRÝFICOS
// ====================================================
export
/**
 * Carga los gráficos iniciales
 */
async function loadInitialCharts() {
    try {
        // Gráfico de tipos
        await createTypesDistributionChart();

        // Gráfico de estadísticas
        await createStatsAverageChart();
    } catch (error) {
        console.error("Error loading charts:", error);
    }
}

export
/**
 * Crea gráfico de distribución de tipos
 */
async function createTypesDistributionChart() {
    try {
        // Obtener primeros 50 pokémon y sus tipos
        const response = await fetch(`${API_BASE}/pokemon/?limit=50`);
        const data = await response.json();

        const typeCount = {};

        for (const poke of data.results) {
            const pokemon = await fetchPokemon(poke.name);
            if (pokemon) {
                pokemon.types.forEach((t) => {
                    typeCount[t.type.name] = (typeCount[t.type.name] || 0) + 1;
                });
            }
        }

        const ctx = document.getElementById("chartTypes").getContext("2d");

        if (chartTypes) chartTypes.destroy();

        const typeColors = {
            normal: "#a8a878",
            fire: "#f08030",
            water: "#6890f0",
            electric: "#f8d030",
            grass: "#78c850",
            ice: "#98d8d8",
            fighting: "#c03028",
            poison: "#a040a0",
            ground: "#e0c068",
            flying: "#a890f0",
            psychic: "#f85888",
            bug: "#a8b820",
            rock: "#b8a038",
            ghost: "#705898",
            dragon: "#7038f8",
            dark: "#705848",
            steel: "#b8b8d0",
            fairy: "#ee99ac",
        };

        chartTypes = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: Object.keys(typeCount),
                datasets: [{
                    data: Object.values(typeCount),
                    backgroundColor: Object.keys(typeCount).map(
                        (type) => typeColors[type] || "#999",
                    ),
                    borderColor: "#fff",
                    borderWidth: 2,
                }, ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error creating types chart:", error);
    }
}

export
/**
 * Crea gráfico de estadísticas promedio por tipo
 */
async function createStatsAverageChart() {
    try {
        // Obtener algunos tipos y sus valores de stats
        const types = ["normal", "fire", "water", "electric", "grass"];
        const statsData = {};

        for (const typeName of types) {
            const response = await fetch(`${API_BASE}/type/${typeName}`);
            const typeData = await response.json();

            let totalAttack = 0,
                totalDefense = 0,
                totalHP = 0,
                count = 0;

            for (const pokemon of typeData.pokemon.slice(0, 10)) {
                const pokeData = await fetchPokemon(pokemon.pokemon.name);
                if (pokeData) {
                    for (const stat of pokeData.stats) {
                        if (stat.stat.name === "attack") totalAttack += stat.base_stat;
                        if (stat.stat.name === "defense") totalDefense += stat.base_stat;
                        if (stat.stat.name === "hp") totalHP += stat.base_stat;
                    }
                    count++;
                }
            }

            statsData[typeName] = {
                attack: Math.round(totalAttack / count),
                defense: Math.round(totalDefense / count),
                hp: Math.round(totalHP / count),
            };
        }

        const ctx = document.getElementById("chartStats").getContext("2d");

        if (chartStats) chartStats.destroy();

        chartStats = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(statsData),
                datasets: [{
                        label: "Attack",
                        data: Object.values(statsData).map((s) => s.attack),
                        backgroundColor: "#ff6b6b",
                    },
                    {
                        label: "Defense",
                        data: Object.values(statsData).map((s) => s.defense),
                        backgroundColor: "#4dabf7",
                    },
                    {
                        label: "HP",
                        data: Object.values(statsData).map((s) => s.hp),
                        backgroundColor: "#51cf66",
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error creating stats chart:", error);
    }
}

export
/**
 * Crea gráfico de estadísticas de un Pokémon específico
 */
function createPokemonStatsChart(stats) {
    const ctx = document.getElementById("chartPokemonStats").getContext("2d");

    if (chartPokemonStats) chartPokemonStats.destroy();

    const statNames = stats.map((s) => s.stat.name.toUpperCase());
    const statValues = stats.map((s) => s.base_stat);

    chartPokemonStats = new Chart(ctx, {
        type: "radar",
        data: {
            labels: statNames,
            datasets: [{
                label: "Estadísticas Base",
                data: statValues,
                borderColor: "#ff6b6b",
                backgroundColor: "rgba(255, 107, 107, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "#ff6b6b",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 5,
            }, ],
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 150,
                },
            },
            plugins: {
                legend: {
                    display: true,
                },
            },
        },
    });
}