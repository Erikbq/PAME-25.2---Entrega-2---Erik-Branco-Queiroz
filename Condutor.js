// Arquivo: Condutor.js

// Importa o módulo nativo "crypto" do Node.js para utilizar o hash.
import crypto from 'node:crypto';

// Definição da classe Condutor. O uso de export indica que esta classe pode ser importada em outros arquivos.
export class Condutor {

    // Atributos privados da classe Condutor.
    #id_condutor;
    #nome;
    #cpf;
    #data_nascimento;
    #email;
    #senha_hash;

    // Construtor da classe Condutor. 
    constructor(nome, cpf, data_nascimento, email, senha_plana) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nascimento = data_nascimento;
        this.#email = email;

        // Gera um ID único composto de 8 números para o condutor.
        this.#id_condutor = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

        // Gera o hash da senha fornecida. Isso evita que a senha bruta seja armazenada diretamente.
        this.#senha_hash = this.#gerarHashSenha(senha_plana);
    }

    // Método privado para gerar o hash da senha utilizando o padrão SHA-256.
    #gerarHashSenha(senha_analisada) {
        return crypto.createHash('sha256').update(senha_analisada).digest('hex');
    }

    // Método público para validar a senha fornecida comparando o hash. Única ponte com o atributo senha_hash.
    validarSenha(senha_tentativa) {
        const hash_tentativa = this.#gerarHashSenha(senha_tentativa);
        return hash_tentativa === this.#senha_hash;
    }

    // Getters para acessar os atributos privados da classe Condutor.
    get id_condutor() {
        return this.#id_condutor;
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get data_nascimento() {
        return this.#data_nascimento;
    }

    get email() {
        return this.#email;
    }   
}