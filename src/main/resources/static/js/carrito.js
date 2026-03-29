function agregarAlCarrito(producto) {

    // Obtener carrito actual
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar producto
    carrito.push(producto);

    // Guardar nuevamente
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito 🛒");
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    location.reload();
}