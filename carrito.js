export default class Carrito {
    #numProducts
    #myProducts

    constructor() {
        this.#numProducts = 0;
        this.#myProducts = new Map();
    }

}
