
document.addEventListener("DOMContentLoaded", function (event) {
    let miCurrency;
    let products = [];

    fetch("https://jsonblob.com/api/1300799779502940160")
        .then((response) => response.json())

        .then((currency) => {
            miCurrency = currency.currency;
            products = currency.products;

            console.log(miCurrency);
            console.log(products);
            cargarTablaProducts(products);
        });

});

