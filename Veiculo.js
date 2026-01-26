// Arquivo: Veiculo.js

// Definição da classe Veiculo. O uso de export indica que esta classe pode ser importada em outros arquivos.
export class Veiculo {

    // Atributos privados da classe Veiculo. O uso de "#" antes do nome torna-os privados.
    #placa;
    #modelo;
    #marca;
    #cor;

    // Construtor da classe Veiculo.
    constructor(placa, modelo, marca, cor) {

        this.#placa = placa;
        this.#modelo = modelo;
        this.#marca = marca;
        this.#cor = cor;

    }

    // Getters para acessar os atributos privados da classe Veiculo.
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