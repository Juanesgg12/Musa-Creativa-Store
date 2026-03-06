document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID no proporcionado");
        window.location.href = "index.html";
        return;
    }

    // Cargar datos actuales
    fetch(`http://localhost:8080/api/productos/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("precio").value = data.precio;
            document.getElementById("descripcion").value = data.descripcion;
        });

    // Manejar actualización
    const form = document.getElementById("formEditar");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const productoActualizado = {
            nombre: document.getElementById("nombre").value,
            precio: parseFloat(document.getElementById("precio").value),
            descripcion: document.getElementById("descripcion").value
        };

        fetch(`http://localhost:8080/api/productos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoActualizado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al actualizar");
                }
                return response.json();
            })
            .then(data => {
                alert("Producto actualizado correctamente");
                window.location.href = "index.html";
            })
            .catch(error => {
                alert("Error al actualizar");
            });

    });

});