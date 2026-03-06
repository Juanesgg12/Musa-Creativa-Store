document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
});

function cargarProductos() {
    fetch("http://localhost:8080/api/productos")
        .then(response => response.json())
        .then(data => {

            let contenido = "";

            data.forEach(producto => {
                contenido += `
                    <div class="card">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: ${producto.precio}</p>

                        <a href="detalle.html?id=${producto.id}">
                            Ver detalle
                        </a>
                        <button onclick="irEditar(${producto.id})" class="btn btn-outline">
                            Editar
                        </button>
                        
                        <button onclick="eliminarProducto(${producto.id})" class="btn btn-danger">
                            Eliminar
                        </button>
                    </div>
                `;
            });

            document.getElementById("lista").innerHTML = contenido;
        })
        .catch(error => {
            document.getElementById("lista").innerHTML = "Error cargando productos";
        });
}

function eliminarProducto(id) {
    fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                alert("Producto eliminado correctamente");
                cargarProductos(); // mejor que reload
            } else {
                alert("Error al eliminar");
            }
        })
        .catch(error => {
            alert("Error en la petición");
        });
}

function irEditar(id) {
    window.location.href = `editar.html?id=${id}`;
}