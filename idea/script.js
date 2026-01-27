const forma = document.getElementById("root");

// Función para obtener y mostrar información de un usuario aleatorio
async function usersr() {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
      throw new Error("Error al cargar el usuario");
    }
    const datau = await response.json();
    const user = datau.results[0];
    console.log(datau);
    forma.innerHTML = `
      <h2>${user.name.first} ${user.name.last}</h2>
      <img src="${user.picture.large}" alt="Foto de ${user.name.first}">
    <div class="user-contact"  style="margin-top: 20px;">
      <p>Email: ${user.email}</p>
      <p>Teléfono: ${user.phone}</p>
      <p>Celular: ${user.cell}</p>
</div>
<div class="user-location" style="margin-top: 20px;">
        <p>País: ${user.location.country}</p>
        <p>Ciudad: ${user.location.city}</p>
        <p>Calle: ${user.location.street.name} ${user.location.street.number}</p>
        <p>Código Postal: ${user.location.postcode}</p><p>Nacionalidad: ${user.nat}</p>
    </div>
    <div class="user-info" style="margin-top: 20px;">
        <p>Nombre: ${user.name.title} ${user.name.first} ${user.name.last}</p>
        <p>Usuario: ${user.login.username}</p>
        <p>Género: ${user.gender}</p>
        <p>Edad: ${user.dob.age} años</p>
        <p>Fecha de Nacimiento: ${new Date(user.dob.date).toLocaleDateString()}</p>
        <p>ID: ${user.id.name} ${user.id.value}</p>
</div>
    `;
  } catch (error) {
    forma.innerHTML = `<p>${error.message}</p>`;
  }
};
usersr();
