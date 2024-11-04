import Carrito from "./carrito.js";

const carrito = new Carrito();

document.addEventListener("DOMContentLoaded", function (event) {
    let miCurrency;
    let products = [];

    fetch("http://jsonblob.com/api/1303086686257668096")
        .then((response) => response.json())

        .then((currency) => {
            miCurrency = currency.currency;
            products = currency.products;

            console.log(miCurrency);
            console.log(products);
            cargarTablaProducts(products);
        });

        function cargarTablaProducts(products) {
            
            const tablaProducts = document.getElementById("tablaProducts");
        
            products.forEach((product) => {
                const output = {
                    sku: product.SKU,
                    title: product.title,
                    price: product.price,
                };
        
                let precioUnidadTotal = Number(output.price); 
        
                    // COLUMNA PRODUCTO.
                    const outputSku = document.createElement("td");
                    const productDiv = document.createElement("div");
        
                    const productName = document.createElement("span");
                    productName.innerText = output.title;
        
                    const productSKU = document.createElement("span");
                    productSKU.innerText = "Nº de referencia: " + output.sku;
                    productSKU.style.display = "block"; 
        
                    productDiv.appendChild(productName); 
                    productDiv.appendChild(productSKU); 
                    outputSku.appendChild(productDiv); 
        
                    // COLUMNA CANTIDAD.
                    const cantidad = document.createElement("td");
                    const cantidadDiv = document.createElement("div");
        
                    // Casilla que muestra la cantidad.
                    const cantidadNum = document.createElement("input");
                    cantidadNum.type = "number";
                    cantidadNum.value = 0; 
                    cantidadNum.classList.add("btnCantidad");
        
                    // Botón para restar productos.
                    const btnRestar = document.createElement("button");
                    btnRestar.innerText = "-";
                    btnRestar.classList.add("btnCantidad");
                 
                    btnRestar.onclick = function () {
                        let cantidadActual = parseInt(cantidadNum.value) || 0;
                        if (cantidadActual > 0) {
                            cantidadNum.value = cantidadActual - 1;
                            actualizarTotal();
                        }
                    };
        
                    // Botón para sumar productos.
                    const btnSumar = document.createElement("button");
                    btnSumar.innerText = "+";
                    btnSumar.classList.add("btnCantidad");
                    btnSumar.onclick = function () {
                        let cantidadActual = parseInt(cantidadNum.value) || 0;
                        cantidadNum.value = cantidadActual + 1;
                        actualizarTotal();
                    };
        
                    cantidadDiv.appendChild(btnRestar);
                    cantidadDiv.appendChild(cantidadNum);
                    cantidadDiv.appendChild(btnSumar);
                    cantidad.appendChild(cantidadDiv); 
        
                    // COLUMNA PRECIO UNIDAD
                    const price = document.createElement("td");
                    price.innerText = precioUnidadTotal.toFixed(2);
        
                    // COLUMNA TOTAL
                    const total = document.createElement("td");
                    total.innerText = (
                        precioUnidadTotal * parseInt(cantidadNum.value) || 0
                    ).toFixed(2);
        
                    function actualizarTotal() {

                        const cantidadActual = parseInt(cantidadNum.value) || 0;

                        total.innerText = (precioUnidadTotal * cantidadActual).toFixed(2);
        
                        // Llama a la funcion actualizarUnidades de la clase Carrito
                        carrito.actualizarUnidades(
                            output.sku,
                            cantidadActual,
                            precioUnidadTotal
                        );
        
                        // Llama a la funcion obtenerInformacionCarrito de la clase Carrito
                        const infoCarrito = carrito.obtenerInformacionCarrito();
        
                        infoCarrito.forEach((producto) => {
                            console.log(
                                `Producto: ${producto.sku}, Unidades: ${producto.unidades
                                }, Precio unitario: ${producto.price.toFixed(2)}, Total: ${producto.total
                                }`
                            );
                        });
        
                        // Llama a la funcion cacularTotal de la clase Carrito
                        const totalCarrito = carrito.calcularTotal();
                        console.log("Total del carrito:", totalCarrito);
        
                        const listaProductosDiv = document.getElementById("listaProductos");
                        listaProductosDiv.innerHTML = ""; 
                        infoCarrito.forEach((producto) => {
                          
                            const title = products.find(p => p.SKU === producto.sku).title;
                
                            const item = document.createElement("div");
                            item.classList.add("producto"); 
                            item.innerText = `${producto.unidades} x ${title}`; 
        
                            const precioItem = document.createElement("div");
                            const precioUnitario =
                                parseFloat(products.find((p) => p.SKU === producto.sku)?.price) ||
                                0; 
                            precioItem.innerText = `${producto.unidades
                                } x ${precioUnitario.toFixed(2)} €`; 
                            precioItem.classList.add("precio"); 
        
                            listaProductosDiv.appendChild(item);
                            listaProductosDiv.appendChild(precioItem);
                        });
        
                        document.getElementById("total").innerText = `${totalCarrito} €`;  
                        
                    }
                    
            const tr = document.createElement("tr");
            tr.append(outputSku, cantidad, price, total);

            tablaProducts.append(tr);
        
            });
        }
});

