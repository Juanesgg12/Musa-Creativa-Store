const API = "http://localhost:8080/api/productos";

async function cargarCatalogo() {

    const respuesta = await fetch(API);
    const productos = await respuesta.json();

    const catalogo = document.getElementById("catalogo");

    catalogo.innerHTML = "";

    productos.forEach(producto => {

        catalogo.innerHTML += `
        
        
        
        <div class="card">
        
            <img src="${producto.imagenUrl}" width="200" alt="Imagen de ${producto.nombre}">
            
            <h3>${producto.nombre}</h3>

            <p>Precio: $${producto.precio}</p>

            <button onclick="verDetalle(${producto.id})">
                Ver producto
            </button>

        </div>

        `;

    });

}

function verDetalle(id){

    window.location.href = `detalle.html?id=${id}`;

}

cargarCatalogo();