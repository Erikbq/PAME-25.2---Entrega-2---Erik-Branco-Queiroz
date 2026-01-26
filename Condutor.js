import crypto from 'node:crypto';

export class Condutor {
    #id_condutor;
    #nome;
    #cpf;
    #data_nascimento;
    #email;
    #senha;

    constructor(nome, cpf, data_nascimento, email, senha_plana) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nascimento = data_nascimento;
        this.#email = email;

        this.#id_condutor = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

        this.#senha = this.#gerarHashSenha(senha_plana);
    }

    #gerarHashSenha(senha_analisada) {
        return crypto.createHash('sha256').update(senha_analisada).digest('hex');
    }

    validarSenha(senha_tentativa) {
        const hash_tentativa = this.#gerarHashSenha(senha_tentativa);
        return hash_tentativa === this.#senha;
    }

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