export default class Carrito {
    #numProducts
    #myProducts

    constructor() {
        this.#numProducts = 0;
        this.#myProducts = new Map();
    }

    actualizarUnidades(sku, unidades, price) {
        if (unidades <= 0) {
            this.#myProducts.delete(sku);
        } else {
            this.#myProducts.set(sku, { unidades, price });
        }
        this.#numProducts = this.#myProducts.size;
    }

}
