document.addEventListener("DOMContentLoaded", function () {
    cargarDetalle();
});

function cargarDetalle() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("producto").innerHTML = "ID no proporcionado";
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
            document.getElementById("producto").innerHTML = `
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Precio:</strong> ${data.precio}</p>
                <p><strong>Descripción:</strong> ${data.descripcion}</p>
            `;
        })
        .catch(error => {
            document.getElementById("producto").innerHTML = "Producto no encontrado";
        });
}