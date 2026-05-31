 // URL EXACTA

 const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
 let chartInstance = null;


 async function loadList(url) {
     const res = await fetch(url);
     const data = await res.json();

     // Paginación

     document.getElementById('nextBtn').onclick = () => loadList(data.next);
     document.getElementById('prevBtn').onclick = () => loadList(data.previous);
     document.getElementById('nextBtn').disabled = !data.next;
     document.getElementById('prevBtn').disabled = !data.previous;

     const listDiv = document.getElementById('poke-list');
     listDiv.innerHTML = "";
     data.results.forEach(p => {
         const div = document.createElement('div');
         div.className = 'item';
         div.innerText = p.name;
         div.onclick = () => loadDetails(p.url);
         listDiv.appendChild(div);
     });
 }


 async function loadDetails(url) {
     const res = await fetch(url);
     const p = await res.json();
     console.log(p);
     document.getElementById('dashboard-view').style.display = 'block';
     document.getElementById('title').innerText = p.name.toUpperCase();  // Datos básicos

     document.getElementById('p-id').innerText = p.id;
     document.getElementById('p-height').innerText = p.height;
     document.getElementById('p-weight').innerText = p.weight;
     document.getElementById('p-exp').innerText = p.base_experience;
     document.getElementById('p-isdef').innerText = p.is_default;
     document.getElementById('p-order').innerText = p.order;

     document.getElementById('p-larea').innerHTML = p.location_area_encounters;


     // Mostrar Sprites (Imagen frontal, trasera, shiny, etc.)
     const sprites = document.getElementById('sprites-container');
     sprites.innerHTML = "";
     const imgUrls = [p.sprites.front_default, p.sprites.back_default, p.sprites.front_shiny];
     imgUrls.forEach(src => { if (src) sprites.innerHTML += `<img src="${src}" width="100">`; });

     // Tipos

     document.getElementById('p-types').innerHTML = p.types.map(t => `<span class="badge" style="background:#ef4444">${t.type.name}</span>`).join('');  // Habilidades

     document.getElementById('p-abilities').innerHTML = p.abilities.map(a => `<li>${a.ability.name} ${a.is_hidden ? '(Oculta)' : ''}</li>`).join('');

     // Movimientos

     document.getElementById('p-moves').innerHTML = p.moves.map(m => `<span class="badge" style="background:#3b82f6; margin-bottom:5px; display:inline-block">${m.move.name}</span>`).join('');

     // Índices

     document.getElementById('p-indices').innerHTML = p.game_indices.map(i => `<li>Versión: ${i.version.name} (ID: ${i.game_index})</li>`).join('');

     //past_abilities

     document.getElementById('p-past_abilities').innerHTML =
         p.past_abilities.map(i =>
             i.abilities.map(j =>
                 `<li>ability: ${j.ability} <br> name: ${j.is_hidden} <br> slot: ${j.slot}</li>`
             ).join('')
         );
     document.getElementById('p-past_abilities_gen').innerHTML =
         p.past_abilities.map(i =>
             `<li>Generacio: ${i.generation.name} </li>`
         ).join('');


     //forms

     document.getElementById('p-forms').innerHTML = p.forms.map(i => `<li>Forma: ${i.name} </li>`).join('');

     //past_stats


     document.getElementById('p-past_stats_gen').innerHTML =
         p.past_stats.map(i =>
             `<li>Generacio: ${i.generation.name} </li>`
         ).join('');

     document.getElementById('p-past_stats').innerHTML =
         p.past_stats.map(i =>
             i.stats.map(j =>
                 `<li>Base stat: ${j.base_stat} </li>`
             ).join('')
         );

     //past_types (repasar la variables)

     document.getElementById('p-past_types').innerHTML = p.past_types.map(t => console.log(t), `<span class="badge" style="background:#ef4444">${t}</span>`).join('');  // Habilidades


     // JSON Completo

     document.getElementById('json-raw').innerText = JSON.stringify(p, null, 2);

     // Gráfico de Stats

     updateChart(p.stats);
 }


 function updateChart(stats) {
     const ctx = document.getElementById('statsChart').getContext('2d');
     if (chartInstance) chartInstance.destroy();
     chartInstance = new Chart(ctx, { type: 'radar', data: { labels: stats.map(s => s.stat.name.toUpperCase()), datasets: [{ label: 'Base Stats', data: stats.map(s => s.base_stat), backgroundColor: 'rgba(239, 83, 80, 0.2)', borderColor: '#ef5350' }] }, options: { scales: { r: { beginAtZero: true } } } });
 }


 loadList(BASE_URL);