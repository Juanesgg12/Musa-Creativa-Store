document.addEventListener("DOMContentLoaded", function () {
    cargarDetalle();
});

function cargarDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const productoContainer = document.getElementById("producto");
    const imgDetalle = document.getElementById("imgDetalle");

    if (!id) {
        productoContainer.innerHTML = "ID no proporcionado";
        return;
    }

    fetch(`http://localhost:8080/api/productos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Producto no encontrado");
            }
            return response.json();
        })
        .then(data => {
            productoContainer.innerHTML = `
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Precio:</strong> ${data.precio}</p>
                <p><strong>Descripcion:</strong> ${data.descripcion}</p>
            `;

            if (imgDetalle) {
                imgDetalle.src = data.imagenUrl || "";
            }
        })
        .catch(() => {
            productoContainer.innerHTML = "Producto no encontrado";
        });
}