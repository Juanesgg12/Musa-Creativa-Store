document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formProducto");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const producto = {
            nombre: document.getElementById("nombre").value,
            precio: parseFloat(document.getElementById("precio").value),
            descripcion: document.getElementById("descripcion").value
        };

        fetch("http://localhost:8080/api/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al crear producto");
                }
                return response.json();
            })
            .then(data => {
                alert("Producto creado correctamente");
                window.location.href = "index.html";
            })
            .catch(error => {
                alert("Error al guardar");
            });

    });

});