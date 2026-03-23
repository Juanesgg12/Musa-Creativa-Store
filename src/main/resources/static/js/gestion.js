const API = "http://localhost:8080/api/productos";

async function cargarProductos() {

    const respuesta = await fetch(API);
    const productos = await respuesta.json();

    const lista = document.getElementById("lista-productos");

    lista.innerHTML = "";

    productos.forEach(producto => {

        lista.innerHTML += `
        <div class="card">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>

            <button onclick="eliminarProducto(${producto.id})">
                Eliminar
            </button>

        </div>
        `;

    });

}

cargarProductos();



async function crearProducto() {

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagenUrl = document.getElementById("imagenUrl").value;

    const producto = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        imagenUrl: imagenUrl
    };

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(producto)

    });

    cargarProductos();

}

async function eliminarProducto(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarProductos();

}