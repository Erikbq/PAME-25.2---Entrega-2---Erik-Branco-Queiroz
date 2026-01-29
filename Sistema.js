// Arquivo: Sistema.js

// Importação das classes externas à Sistema
import { Veiculo } from './Veiculo.js';
import { Condutor } from './Condutor.js';
import { Agente } from './Agente.js';
import { Multa } from './Multa.js';
import { inverte_data } from './Solicitacoes.js';


// Definição da classe Sistema.
export class Sistema {
  // Atributos privados da classe Sistema. Serão arrays que servirão como banco de dados.
  #condutores;
  #agentes;
  #colecao_carros;
  #colecao_multas;
  #usuario_logado; // 0 = não está logado; 1 = agente; 2 = condutor
  #email_atual;
  #id_atual;

  // Construtor da classe Sistema. Cria as estruturas de dados vazias.
  constructor() {
    this.#condutores = new Map();
    this.#agentes = new Map();
    this.#colecao_carros = new Map();
    this.#colecao_multas = new Map();
    this.#usuario_logado = 0;
    this.#email_atual = null;
    this.#id_atual = null;
  }

  // ---------------------  Funções auxiliares  --------------------------------

  // Verifica se o email já está cadastrado no banco de dados de condutores
  #verifica_email_condutores(email) {
    if (this.#condutores.has(email)) {
      return true;
    } else {
      return false;
    }
  }

  // Verifica se o email já está cadastrado no banco de dados de agentes
  #verifica_email_agentes(email) {
    if (this.#agentes.has(email)) {
      return true;
    } else {
      return false;
    }
  }

  // Verifica se o email já está cadastrado no banco de dados geral
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

  // Retorna o atributo usuario_logado
  get usuario_logado() {
    return this.#usuario_logado;
  }

  // -----------------------------------------------------------------------------------

  // ----------------  Funções para usuário não logado  --------------------------------

  // Fazer login
  fazer_login(email, senha) {
    // Verifica email e senha no banco de dados de agentes
    // Caso seja validado, os atributos são alterados para mudar o usuário
    if (this.#verifica_email_agentes(email)) {
      if (this.#agentes.get(email).validarSenha(senha)) {
        this.#usuario_logado = 1;
        this.#email_atual = email;
        this.#id_atual = this.#agentes.get(email).id_agente;
        return true;
      }
    }
    // Verifica email e senha no banco de dados de condutores
    // Caso seja validado, os atributos são alterados para mudar o usuário
    else if (this.#verifica_email_condutores(email)) {
      if (this.#condutores.get(email).validarSenha(senha)) {
        this.#usuario_logado = 2;
        this.#email_atual = email;
        this.#id_atual = this.#condutores.get(email).id_condutor;
        return true;
      }
    }
    return false;
  }

  // Fazer cadastro de condutores
  cadastro_condutor(nome, cpf, data_nascimento, email, senha) {
    // Verifica se o email já está cadastrado
    if (!this.#verifica_email_geral(email)) {
      // Cria um novo objeto Condutor
      const novo_condutor = new Condutor(
        nome,
        cpf,
        data_nascimento,
        email,
        senha,
      );
      // Adiciona o novo condutor ao banco de dados de condutores
      // e altera os atributos internos da classe para mudar de usuário
      this.#condutores.set(email, novo_condutor);
      this.#usuario_logado = 2;
      this.#email_atual = email;
      this.#id_atual = novo_condutor.id_condutor;
      return true;
    } else {
      return false;
    }
  }

  // Fazer cadastro de agentes
  cadastro_agente(nome, cpf, email, senha, matricula) {
    // Verifica se o email já está cadastrado
    if (!this.#verifica_email_geral(email)) {
      // Cria um novo objeto Agente
      const novo_agente = new Agente(nome, cpf, email, senha, matricula);
      // Adiciona o novo agente ao banco de dados de agentes
      // e altera os atributos internos da classe para mudar de usuário
      this.#agentes.set(email, novo_agente);
      this.#usuario_logado = 1;
      this.#email_atual = email;
      this.#id_atual = novo_agente.id_agente;
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

  // Ver os próprios dados
  ver_dados_agente() {
    // Pega o objeto atual
    const agente = this.#agentes.get(this.#email_atual);
    // Cria um array com as informações
    const dados_agente = [
      agente.id_agente,
      agente.nome,
      agente.cpf,
      agente.email,
      agente.numero_matricula,
    ];
    return dados_agente;
  }

  // Ver a lista de veículos no banco de dados
  ver_lista_veiculos() {
    // Cria um array vazio
    let lista_carros = [];
    // Itera por todos os objetos Veiculo cadastrados
    for (const veiculo of this.#colecao_carros.values()) {
      lista_carros.push([
        veiculo.placa,
        veiculo.modelo,
        veiculo.marca,
        veiculo.cor,
        veiculo.id_dono_veiculo,
      ]);
    }
    return lista_carros;
  }

  // Ver a lista de condutores no banco de dados
  ver_lista_condutores() {
    // Cria um array vazio
    let lista_condutores = [];
    // Itera por todos os objetos Condutor cadastrados
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

  // Aplicar multa
  aplicar_multa(id_cliente, tipo_infracao, valor, data) {
    // Cria um novo objeto Multa
    const multa = new Multa(id_cliente, tipo_infracao, valor, data);
    // Adiciona o novo objeto Multa ao banco de dados
    this.#colecao_multas.set(multa.id_multa, multa);
  }

  // Ver lista de multas
  ver_multas() {
    // Cria um array vazio
    let lista_multas = [];
    // Itera por todos os objetos Multa cadastrados
    for (const multa of this.#colecao_multas.values()) {
      // Adiciona um array com todos os atributos da multa à lista_multas
      lista_multas.push([
        multa.id_multa,
        multa.id_cliente,
        multa.tipo_infracao,
        multa.valor,
        multa.data,
        multa.status,
      ]);
    }
    return lista_multas;
  }

  // Alterar status da multa
  alterar_status_multa(id_multa, novo_status) {
    // Verifica se a multa existe
    if (this.#colecao_multas.has(id_multa)) {
      // Altera o status da multa
      this.#colecao_multas.get(id_multa).atualiza_status(novo_status);
      return true;
    }
    return false;
  }

  // Retorna a arrecadação total das multas
  relatorio_multas(data_inicial, data_final) {
    // Cria uma variável para armazenar o valor final
    let arrecadacao_multas = 0;
    // Itera por todos os objetos Multa cadastrados
    for (const multa of this.#colecao_multas.values()) {
      // Verifica se está no prazo escolhidp
      if (
        inverte_data(multa.data) >= data_inicial &&
        inverte_data(multa.data) <= data_final
      ) {
        // Verifica se a multa está paga
        if (multa.status === "Paga") {
          arrecadacao_multas += parseFloat(multa.valor);
        }
      }
    }
    return arrecadacao_multas;
  }

  // Editar dados do agente
  editar_dados_agente(senha_atual, novo_nome, novo_email, nova_senha) {
    // Pega o objeto atual
    const agente = this.#agentes.get(this.#email_atual);

    // Verifica se a senha atual está correta
    if (!agente.validarSenha(senha_atual)) {
      return false;
    }

    // Atualiza Nome
    if (novo_nome) agente.nome = novo_nome;

    // Atualiza Senha
    if (nova_senha) agente.atualizarSenha(nova_senha);

    // Atualiza Email
    if (novo_email && novo_email !== this.#email_atual) {
      // Verifica se o email já existe em outro lugar
      if (this.#verifica_email_geral(novo_email)) {
        throw new Error("Este email já está em uso.");
      }

      // Remove a entrada antiga do Map
      this.#agentes.delete(this.#email_atual);

      // Atualiza o objeto
      agente.email = novo_email;

      // Insere na nova chave do Map
      this.#agentes.set(novo_email, agente);

      // Atualiza o rastreador de sessão
      this.#email_atual = novo_email;
    }

    return true;
  }
  // -------------------------------------------------------------------------------------------------------------

  // ------------------------------------------  Condutor (logado)  ----------------------------------------------

  // Ver os próprios dados
  ver_dados_condutor() {
    // Pega o objeto atual
    const condutor = this.#condutores.get(this.#email_atual);
    // Cria um array com as informações
    const dados_condutor = [
      condutor.id_condutor,
      condutor.nome,
      condutor.cpf,
      condutor.data_nascimento,
      condutor.email,
    ];
    return dados_condutor;
  }

  // Ver lista de multas próprias
  ver_multas_condutor() {
    // Cria um array vazio
    let lista_multas = [];
    // Itera por todos os objetos Multa cadastrados
    for (const multa of this.#colecao_multas.values()) {
      if (multa.id_cliente === this.#id_atual) {
        // Adiciona um array com todas as informações da multa à lista_multas
        lista_multas.push([
          multa.id_multa,
          multa.tipo_infracao,
          multa.valor,
          multa.data,
          multa.status,
        ]);
      }
    }
    return lista_multas;
  }

  // Cadastrar veículo
  cadastrar_veiculo(placa, modelo, marca, cor) {
    // Verifica se a placa já está cadastrada
    if (this.#colecao_carros.has(placa)) {
      return false;
    }
    // Cria um novo objeto Veiculo
    const novo_veiculo = new Veiculo(placa, modelo, marca, cor, this.#id_atual);
    // Adiciona o novo objeto Veiculo ao banco de dados
    this.#colecao_carros.set(placa, novo_veiculo);
    return true;
  }

  // Pagar multa
  pagar_multa(id_multa) {
    // Verifica se a multa existe
    if (this.#colecao_multas.has(id_multa)) {
      // Verifica se a multa está pendente
      if (this.#colecao_multas.get(id_multa).status === "Pendente") {
        // Altera o status da multa
        this.#colecao_multas.get(id_multa).atualiza_status("Paga");
        return true;
      }
    }
    return false;
  }

  // Recorrer multa
  recorrer_multa(id_multa) {
    // Verifica se a multa existe
    if (this.#colecao_multas.has(id_multa)) {
      // Altera o status da multa
      this.#colecao_multas.get(id_multa).atualiza_status("Recorrida");
      return true;
    }
    return false;
  }

  // Excluir veículo
  excluir_veiculo(placa) {
    // Verifica se a placa existe
    if (this.#colecao_carros.has(placa)) {
      // Remove o objeto Veiculo do banco de dados
      this.#colecao_carros.delete(placa);
      return true;
    }
    return false;
  }

  // Editar dados do condutor
  editar_dados_condutor(senha_atual, novo_nome, novo_email, nova_data, nova_senha,) {
    // Pega o objeto atual
    const condutor = this.#condutores.get(this.#email_atual);

    // Verifica se a senha atual está correta
    if (!condutor.validarSenha(senha_atual)) {
      return false;
    }

    // Atualiza Nome
    if (novo_nome) condutor.nome = novo_nome;
    // Atualiza Data de Nascimento
    if (nova_data) condutor.data_nascimento = nova_data;
    // Atualiza Senha
    if (nova_senha) condutor.atualizarSenha(nova_senha);

    // Atualiza Email
    if (novo_email && novo_email !== this.#email_atual) {
      // Verifica se o email já existe em outro lugar
      if (this.#verifica_email_geral(novo_email)) {
        throw new Error("Este email já está em uso.");
      }
      // Remove a entrada antiga do Map
      this.#condutores.delete(this.#email_atual);
      // Atualiza o objeto
      condutor.email = novo_email;
      // Insere na nova chave do Map
      this.#condutores.set(novo_email, condutor);
      // Atualiza o rastreador de sessão
      this.#email_atual = novo_email;
    }

    return true;
  }
  // --------------------------------------------------------------------------------------

  // ------------------------------ Métodos Gerais ----------------------------------------

  // deslogar usuário
  deslogar() {
    // Altera os atributos internos para deslogar o usuário
    this.#usuario_logado = 0;
    this.#email_atual = null;
    this.#id_atual = null;
  }

  // Buscar carro por placa
  buscar_por_placa(placa) {
    // Verifica se a placa existe
    if (!this.#colecao_carros.has(placa)) {
      return false;
    }

    // Pega o objeto Veiculo
    const carro = this.#colecao_carros.get(placa);
    // Cria um array com as informações
    const lista_carro = [
      carro.placa,
      carro.modelo,
      carro.marca,
      carro.cor,
      carro.id_dono_veiculo,
    ];
    return lista_carro;
  }
  // ---------------------------------------------------------------------------------------
}