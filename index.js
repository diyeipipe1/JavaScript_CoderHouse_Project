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