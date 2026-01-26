export class Veiculo {

    #placa;
    #modelo;
    #marca;
    #cor;

    constructor(placa, modelo, marca, cor) {

        this.#placa = placa;
        this.#modelo = modelo;
        this.#marca = marca;
        this.#cor = cor;

    }

    get placa() {
        return this.#placa;
    }

    get modelo() {
        return this.#modelo;
    }

    get marca() {
        return this.#marca;
    }   

    get cor() { 
        return this.#cor;
    }
}