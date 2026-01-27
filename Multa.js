// Arquivo: Multa.js

// Definição da classe Multa. O uso de export indica que esta classe pode ser importada em outros arquivos.
export class Multa {

    // Atributos privados da classe Multa.
    #id_multa;
    #id_cliente;
    #tipo_infracao;
    #valor;
    #data;
    #status = 0; // 0 = pendente; 1 = paga; 2 = cancelada; 3 = recorrida

    // Construtor da classe multa. 
    constructor(id_cliente, tipo_infracao, valor, data) {
        this.#id_cliente = id_cliente;
        this.#tipo_infracao = tipo_infracao;
        this.#valor = valor;
        this.#data = data;

        // Gera um ID único composto de 8 números para a multa.
        this.#id_multa = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    }

    // Getters para acessar os atributos privados da classe Multa.
    get id_multa() {
        return this.#id_multa;
    }

    get id_cliente() {
        return this.#id_cliente;
    }

    get tipo_infracao() {
        return this.#tipo_infracao;
    }

    get valor() {
        return this.#valor;
    }

    get data() {
        return this.#data;
    }

    get status() {
        return this.#status;
    }   

    // set para mudar o status da multa.
    set novo_statusstatus(novo_status) {
        this.#status = novo_status;
    }

}