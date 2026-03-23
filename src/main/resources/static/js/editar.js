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
        .then(response => {
            if (!response.ok) {
                throw new Error("Producto no encontrado");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("imagenUrl").value = data.imagenUrl || "";
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("precio").value = data.precio;
            document.getElementById("descripcion").value = data.descripcion;
        })
        .catch(() => {
            alert("No se pudo cargar el producto");
            window.location.href = "index.html";
        });

    // Manejar actualización
    const form = document.getElementById("formEditar");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const productoActualizado = {
            imagenUrl: document.getElementById("imagenUrl").value,
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
            .then(() => {
                alert("Producto actualizado correctamente");
                window.location.href = "index.html";
            })
            .catch(() => {
                alert("Error al actualizar");
            });

    });

});