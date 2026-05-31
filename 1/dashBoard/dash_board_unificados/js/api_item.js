// item del stat y su imagen

export async function itemstatimg(urlimg, statName) {
    try {
        const resItem = await fetch(urlimg);
        const dataItem = await resItem.json();
        //console.log('dataItem', dataItem);
        // 1. Buscamos el CONTENEDOR (no una imagen fija)
        // Asegúrate de que en tu HTML sea un <div> o <span>: <div id="img-hp"></div>
        document.getElementById(`img-${statName}`).innerHTML = '';
        const contenedor = document.getElementById(`img-${statName}`);

        //console.log('contenedor', contenedor);
        if (contenedor) {
            // 2. Creamos un nuevo elemento imagen para este item
            const nuevaImg = document.createElement('img');
            nuevaImg.src = dataItem.sprites.default;
            nuevaImg.alt = dataItem.name;
            nuevaImg.title = dataItem.name; // Al pasar el ratón se ve el nombre
            nuevaImg.style.width = "30px"; // Tamaño pequeño para que quepan varias
            nuevaImg.style.overflowY = 'scroll';
            // 3. La añadimos al contenedor sin borrar las anteriores
            contenedor.appendChild(nuevaImg);
        }
    } catch (error) {
        console.error("Error cargando imagen del item:", error);
    }
}