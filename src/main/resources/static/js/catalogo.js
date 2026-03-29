const API = "http://localhost:8080/api/productos";
let productosCatalogo = [];

async function cargarCatalogo() {
    const catalogo = document.getElementById("catalogo");

    try {
        const respuesta = await fetch(API);
        const productos = await respuesta.json();
        productosCatalogo = productos;

        catalogo.innerHTML = "";

        productos.forEach(producto => {
            const nombre = producto.nombre || "Producto";
            const precio = producto.precio ?? "N/A";
            const imagenUrl = typeof producto.imagenUrl === "string" ? producto.imagenUrl.trim() : "";
            const tieneImagen = imagenUrl !== "" && imagenUrl.toLowerCase() !== "null" && imagenUrl.toLowerCase() !== "undefined";
            const imagenHtml = tieneImagen
                ? `<img src="${imagenUrl}" width="200" alt="Imagen de ${nombre}">`
                : "";

            catalogo.innerHTML += `
        
        
        
        <div class="card">
            ${imagenHtml}
            
            <h3>${nombre}</h3>

            <p>Precio: $${precio}</p>

            <div class="card-actions">
                <button class="primary" onclick="verDetalle(${producto.id})">
                    Ver producto
                </button>
                <button class="primary" onclick="agregarAlCarritoPorId(${producto.id})">
                    Agregar al carrito
                </button>
            </div>

        </div>

        `;

        });
    } catch (error) {
        catalogo.innerHTML = "Error cargando catalogo";
    }

}

function agregarAlCarritoPorId(id) {
    const producto = productosCatalogo.find(item => String(item.id) === String(id));

    if (!producto) {
        alert("No se pudo agregar el producto al carrito");
        return;
    }

    agregarAlCarrito(producto);
}

function verDetalle(id){

    window.location.href = `detalle.html?id=${id}`;

}

cargarCatalogo();