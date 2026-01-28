// Arquivo: Sistema.js

// Importação das classes externas à Sistema
import { Veiculo } from './Veiculo.js';
import { Condutor } from './Condutor.js';
import { Agente } from './Agente.js';
import { Multa } from './Multa.js';


// Definição da classe Sistema.
export class Sistema {
  // Atributos privados da classe Sistema. Serão arrays que servirão como banco de dados.
  #condutores;
  #agentes;
  #colecao_carros;
  #colecao_multas;
  #usuario_logado; // 0 = não está logado; 1 = agente; 2 = condutor
  #email_atual;

  // Construtor da classe Sistema. Cria os arrays vazios.
  constructor() {
    this.#condutores = new Map();
    this.#agentes = new Map();
    this.#colecao_carros = [];
    this.#colecao_multas = new Map();
    this.#usuario_logado = 0;
    this.#email_atual = null;
  }

  // ---------------------  Funções auxiliares  --------------------------------
  #verifica_email_condutores(email) {
    if (this.#condutores.has(email)) {
      return true;
    } else {
      return false;
    }
  }

  #verifica_email_agentes(email) {
    if (this.#agentes.has(email)) {
      return true;
    } else {
      return false;
    }
  }

  #verifica_email_geral(email) {
    if (
      this.#verifica_email_condutores(email) ||
      this.#verifica_email_agentes(email)
    ) {
      return true;
    } else {
      return false;
    }
  }

  get usuario_logado() {
    return this.#usuario_logado;
  }

  // -----------------------------------------------------------------------------------

  // ----------------  Funções para usuário não logado  --------------------------------

  // Fazer login
  fazer_login(email, senha) {
    if (this.#verifica_email_agentes(email)) {
      if (this.#agentes.get(email).validarSenha(senha)) {
        this.#usuario_logado = 1;
        this.#email_atual = email;
        return true;
      } 
    } else if (this.#verifica_email_condutores(email)) {
      if (this.#condutores.get(email).validarSenha(senha)) {
        this.#usuario_logado = 2;
        this.#email_atual = email;
        return true;
      }
    } 
    return false;
  }

  // Fazer cadastro
  cadastro_condutor(nome, cpf, data_nascimento, email, senha) {
    if (!this.#verifica_email_geral(email)) {
      const novo_condutor = new Condutor(
        nome,
        cpf,
        data_nascimento,
        email,
        senha,
      );
      this.#condutores.set(email, novo_condutor);
      this.#usuario_logado = 2;
      this.#email_atual = email;
      return true;
    } else {
      return false;
    }
  }

  cadastro_agente(nome, cpf, email, senha) {
    if (!this.#verifica_email_geral(email)) {
      const novo_agente = new Agente(nome, cpf, email, senha);
      this.#agentes.set(email, novo_agente);
      this.#usuario_logado = 1;
      this.#email_atual = email;
      return true;
    } else {
      return false;
    }
  }

  // Sair do sistema

  sair_sistema() {
    return true;
  }
  // ---------------------------------------------------------------------------------------

  // -----------------------  Agente de trânsito (logado)  ---------------------------------

  ver_dados_agente() {
    const agente = this.#agentes.get(this.#email_atual);
    const dados_agente = [
      agente.id_agente,
      agente.nome,
      agente.cpf,
      agente.email,
      agente.numero_matricula,
    ];
    return dados_agente;
  }

  ver_lista_veiculos() {
    let lista_carros = [];
    for (const veiculo of this.#colecao_carros) {
      lista_carros.push([
        veiculo.placa,
        veiculo.modelo,
        veiculo.marca,
        veiculo.cor,
      ]);
    }
    return lista_carros;
  }

  ver_lista_condutores() {
    let lista_condutores = [];
    for (const condutor of this.#condutores.values()) {
      lista_condutores.push([
        condutor.id_condutor,
        condutor.nome,
        condutor.cpf,
        condutor.data_nascimento,
      ]);
    }
    return lista_condutores;
  }

  aplicar_multa(id_cliente, tipo_infracao, valor, data) {
    const multa = new Multa(id_cliente, tipo_infracao, valor, data);
    this.#colecao_multas.set(multa.id_multa, multa);
  }

  ver_multas() {
    let lista_multas = [];
    for (const multa of this.#colecao_multas.values()) {
      lista_multas.push([multa.id_multa, multa.id_cliente, multa.tipo_infracao, multa.valor, multa.data, multa.status]);
    }
    return lista_multas;
  }

  alterar_status_multa(id_multa, novo_status) {
    if(this.#colecao_multas.has(id_multa)){
        this.#colecao_multas.get(id_multa).atualiza_status(novo_status);
        return true;
    }
    return false;
  }
// -------------------------------------------------------------------------------------------------------------

// ------------------------------------------  Condutor (logado)  ----------------------------------------------
ver_dados_condutor() {
    const condutor = this.#condutores.get(this.#email_atual);
    const dados_condutor = [
      condutor.id_condutor,
      condutor.nome,
      condutor.cpf,
      condutor.data_nascimento,
      condutor.email,
    ];
    return dados_condutor;
  }

ver_multas_condutor() {
    let lista_multas = [];
    for (const multa of this.#colecao_multas.values()) {
        if(multa.id_cliente === this.#condutores.get(this.#email_atual).id_condutor){
            lista_multas.push([multa.id_multa, multa.tipo_infracao, multa.valor, multa.data, multa.status]);
        }
    }
    return lista_multas;
}

cadastrar_veiculo(placa, modelo, marca, cor) {
    const novo_veiculo = new Veiculo(placa, modelo, marca, cor);
    this.#colecao_carros.push(novo_veiculo);
    return true;
}

pagar_multa(id_multa){
    if(this.#colecao_multas.has(id_multa)){
        this.#colecao_multas.get(id_multa).atualiza_status("Paga");
        return this.#colecao_multas.get(id_multa).valor;
    }
    return false;
}

recorrer_multa(id_multa){
    if(this.#colecao_multas.has(id_multa)){
        this.#colecao_multas.get(id_multa).atualiza_status("Recorrida");
        return true;
    }
    return false;
}
// --------------------------------------------------------------------------------------

deslogar(){
  this.#usuario_logado = 0;
  this.#email_atual = null;
}

}