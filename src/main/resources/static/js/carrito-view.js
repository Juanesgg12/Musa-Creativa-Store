document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();
});

function mostrarCarrito() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const container = document.getElementById("carrito-container");

    let total = 0;
    let contenido = "";

    carrito.forEach((producto, index) => {

        total += producto.precio;

        contenido += `
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>

                <button onclick="eliminarDelCarrito(${index})">
                    Eliminar
                </button>
            </div>
            <hr>
        `;
    });

    container.innerHTML = contenido;

    document.getElementById("total").innerText = "Total: $" + total;
}