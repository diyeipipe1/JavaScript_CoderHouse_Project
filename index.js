// Tercera entrega puntos que faltaban
// Cambiar prompts y alerts por DOM 
// Notificar en HTML success o failure
// Almacenar datos en el storega


// Función para crear productos una vez activado el botón
function formularioProducto(){
    const divCrearProducto = document.getElementById("crearProductoDiv")

    // div para los errores
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-mensaje";
    divCrearProducto.appendChild(errorDiv);

    divCrearProducto.innerHTML = `
    <h2>Agregar producto</h2>
    <form id="agregarProductoForm">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br><br>
        
        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" step="0.01" required><br><br>

        <input type="submit" value="Submit">
    </form>
    ` 

    const form = document.getElementById("agregarProductoForm")

    form.addEventListener("submit", e => {
        e.preventDefault();

        const nombreInput = document.getElementById("nombre")
        const precioInput = document.getElementById("precio")

        const nombre = nombreInput.value;
        const precio = parseFloat(precioInput.value);

        if (nombre && !isNaN(precio)) {
            crearProducto(nombre, precio)

            let productosArray = localStorage.getItem("productosAgregados")

            if (productosArray){
                productosArray = JSON.parse(productosArray)
                productosArray.push({nombre: nombre, precio: precio})
            }else {
                productosArray = [{nombre: nombre, precio: precio}]
            }

            localStorage.setItem("productosAgregados", JSON.stringify(productosArray))
            errorDiv.textContent = "";
        }else{
            errorDiv.textContent = "Campos no ingresados correctamente";
        }
    })
}

// Función para crear productos en el HTML
function crearProducto(nombre, precio){
    let producto = document.createElement("div")
    producto.className = "panel"
    producto.onclick = () => {actualizarTablero(precio, nombre)}
    producto.innerHTML = `${nombre}<br>$${precio}`

    let productosDiv = document.getElementById("productos")
    productosDiv.appendChild(producto)
}

// Función para cargar los productos de localStorage si hay
function cargarProductos() {
    let productosArray = localStorage.getItem("productosAgregados")

    if (productosArray){
        productosArray = JSON.parse(productosArray)
        console.log(productosArray)
        productosArray.forEach(prod => {
            crearProducto(prod.nombre, prod.precio)
        });
    }
}


// Se cargan productos de localStorage
cargarProductos();

// Esta variable tendrá el precio total
let precioTotal = 0;

//Promedio
let numProductos = 0;

// Productos
let prods = []

// Función llamada cunado se hace click en uno de los productos, actualiza
// precio total/promedio y llama a la función general que actualiza el texto
function actualizarTablero(precio, nombre) {
    precioTotal += precio;
    numProductos += 1;
    actualizarTotal();
    actualizarPromedio();
    actualizaProductoMayorPrecio(precio, nombre);
}

// Actualiza texto del precio total
function actualizarTotal() {
    const elementoTotal = document.getElementById("total");
    elementoTotal.textContent = "Precio total: $" + precioTotal;
}

// Actualiza texto del precio promedio
function actualizarPromedio() {
    let promedio = 0;
    if (numProductos > 0) {
        promedio = precioTotal/numProductos
    }else{
        promedio = 0
    }

    const elementoProm = document.getElementById("promedio");
    elementoProm.textContent = "Promedio por producto: $" + promedio;
}

// Actualiza texto del producto de mayor precio
function actualizaProductoMayorPrecio(precio, nombre) {
    prods.push({precio: precio, nombre: nombre})

    let precioMax = 0
    let nombreMax = ""
    for (prod of prods) {
        if (precioMax < prod.precio){
            precioMax = prod.precio
            nombreMax = prod.nombre
        }
    }

    const elementoMax = document.getElementById("precioMayor");
    elementoMax.textContent = "Producto de mayor precio añadido: " + nombreMax;

}