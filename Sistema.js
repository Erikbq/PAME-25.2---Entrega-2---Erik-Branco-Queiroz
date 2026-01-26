// Arquivo: Sistema.js

// Importação das classes externas à Sistema
import { Veiculo } from './Veiculo.js';
import { Condutor } from './Condutor.js';
import { Agente } from './Agente.js';
import { Multa } from './Multa.js';


// Definição da classe Sistema.
export class Sistema{
    
    // Atributos privados da classe Sistema. Serão arrays que servirão como banco de dados.
    #veiculos;
    #condutores;
    #agentes;
    #multas
    #status_login;

    // Construtor da classe Sistema. Cria os arrays vazios.
    constructor(){
        this.#veiculos = [];
        this.#condutores = [];
        this.#agentes = [];
        this.#multas = [];
        this.#status_login = 0;
    }

    

}