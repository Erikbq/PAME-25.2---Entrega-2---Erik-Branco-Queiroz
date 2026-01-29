// Arquivo: Agente.js

// Importa o módulo nativo "crypto" do Node.js para utilizar o hash.
import crypto from 'node:crypto';

// Definição da classe Agente.
export class Agente {
  // Atributos privados da classe Agente.
  #id_agente;
  #nome;
  #cpf;
  #email;
  #senha_hash;
  #numero_matricula;

  // Construtor da classe Agente.
  constructor(nome, cpf, email, senha_plana, matricula) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#email = email;

    // Gera um ID único composto de 8 números para o agente.
    this.#id_agente = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");

    // Gera o hash da senha fornecida. Isso evita que a senha bruta seja armazenada diretamente.
    this.#senha_hash = this.#gerarHashSenha(senha_plana);

    // Gera um número de matrícula único com 6 números.
    this.#numero_matricula = matricula;
  }

  // Método privado para gerar o hash da senha utilizando o padrão SHA-256.
  #gerarHashSenha(senha_analisada) {
    return crypto.createHash("sha256").update(senha_analisada).digest("hex");
  }

  // Método público para validar a senha fornecida comparando o hash. Única ponte com o atributo senha_hash.
  validarSenha(senha_tentativa) {
    const hash_tentativa = this.#gerarHashSenha(senha_tentativa);
    return hash_tentativa === this.#senha_hash;
  }

  // Getters para acessar os atributos privados da classe Agente.
  get id_agente() {
    return this.#id_agente;
  }

  get nome() {
    return this.#nome;
  }

  get cpf() {
    return this.#cpf;
  }

  get email() {
    return this.#email;
  }

  get numero_matricula() {
    return this.#numero_matricula;
  }

  // Setters para modificar os atributos privados da classe Agente.
  set nome(novo_nome) {
    this.#nome = novo_nome;
  }

  set email(novo_email) {
    this.#email = novo_email;
  }

  // Para senha precisa fazer o hash
  atualizarSenha(nova_senha_plana) {
    this.#senha_hash = this.#gerarHashSenha(nova_senha_plana);
  }
}