// Arquivo: Menu.js

// Importação da classe de contrele "Sistema"
import { Sistema } from "./Sistema.js";

// Importação das validações do aquivo de solicitações Solicitacoes.js
import { solicitar_email } from "./Solicitacoes.js";
import { solicitar_senha } from "./Solicitacoes.js";
import { solicitar_cpf } from "./Solicitacoes.js";
import { solicitar_data_nascimento } from "./Solicitacoes.js";
import { solicitar_nome } from "./Solicitacoes.js";
import { formata_cpf } from "./Solicitacoes.js";
import { formata_data } from "./Solicitacoes.js";
import { solicitar_id_cliente } from "./Solicitacoes.js";
import { solicitar_tipo_infracao } from "./Solicitacoes.js";    
import { solicitar_valor } from "./Solicitacoes.js";
import { formata_valor } from "./Solicitacoes.js";
import { solicitar_id_multa } from "./Solicitacoes.js";
import { solicitar_status_multa } from "./Solicitacoes.js";
import { solicitar_placa } from "./Solicitacoes.js";
import { solicitar_matricula } from "./Solicitacoes.js";
import { solicitar_data } from "./Solicitacoes.js";
import { inverte_data } from "./Solicitacoes.js";


// Importação da biblioteca de input
import readlineSync from 'readline-sync';

// Cria um objeto da classe Sistema
const sistema = new Sistema();

// Variável para encerrar o programa
let encerrar_programa = false;

// Função principal para controlar o fluxo de execução
function main(){

        // Chama a função para criar informações para testes
        // Descomentar para utilizar nos testes
        //cria_para_teste();

        // Loop que controla a existência do programa 
        while(!encerrar_programa){
            // Verifica quem está usando o sistema no momento
            switch(sistema.usuario_logado){
                case 0:
                    menu_usuario();
                    break;
                case 1:
                    menu_agente();
                    break;
                case 2:
                    menu_condutor();
                    break;
            }
        }
}

// Função menu usuário
function menu_usuario(){

    // Controla o logout do condutor
    let sair = false;

    do {
      console.log(
        "----------------------------------- Menu Usuário -----------------------------------\n",
      );
      console.log("SEJA MUITO BEM VINDO!\n");
      console.log(
        "Escolha uma das seguintes opções e digite o número referente a ela:\n",
      );
      console.log("1- Fazer Login\n");
      console.log("2- Fazer Cadastro\n");
      console.log("3- Sair\n");
      console.log(
        "----------------------------------------------------------------------------------------\n",
      );

      // Pega o input do usuário
      const opcao_cadastro = readlineSync.questionInt();

      // Verifica a opção escolhida
      switch (opcao_cadastro) {
        // Fazer login
        case 1:
          console.log("----------  Opção escolhida: Fazer Login  ----------\n");

          // Solicitação e verificação do email
          const email = solicitar_email();

          // Solicitação e verificação da senha
          const senha = solicitar_senha();

          // Faz o login e pega o retorno da função
          const retorno = sistema.fazer_login(email, senha);

          // Verifica se deu erro
          if (retorno === true) {
            console.log("Login realizado com sucesso!\n");
            sair = true;
          } else {
            console.log("Email ou senha incorretos ou não cadastrados.\n");
            console.log(
              "Se não tiver uma conta cadastrada escolha a opção 2 para se cadastrar\n",
            );
          }
          break;

        // Fazer cadastro
        case 2:
          console.log(
            "----------  Opção escolhida: Fazer Cadastro  ----------\n",
          );
          console.log("Você está se cadastrando como?\n");
          console.log("1- Condutor\n");
          console.log("2- Agente de Trânsito\n");
          console.log("Digite o número referente a opção escolhida\n");

          // Pega o input do usuário
          const tipo_cadastro = readlineSync.questionInt();

          // Verifica a opção escolhida
          switch (tipo_cadastro) {
            // Cadastro de condutor
            case 1:
              console.log(
                "----------  Opção escolhida: Cadastro de Condutor  ----------\n",
              );

              // Solicitar e verificar o nome
              const nome_condutor = solicitar_nome();

              // Solicita e verifica o cpf
              const cpf_condutor = solicitar_cpf();

              // Solicita e verifica a data
              const data_nascimento_condutor = solicitar_data_nascimento();

              // Solicitação e verificação do email
              const email_condutor = solicitar_email();

              // Solicitação e verificação da senha
              const senha_condutor = solicitar_senha();

              // Faz o cadastro de condutor e pega o retorno da função
              const retorno_condutor = sistema.cadastro_condutor(
                nome_condutor,
                cpf_condutor,
                data_nascimento_condutor,
                email_condutor,
                senha_condutor,
              );

              // Verifica se deu erro
              if (retorno_condutor === true) {
                console.log("Cadastro realizado com sucesso!\n");
                sair = true;
              } else {
                console.log(
                  "Email ou senha incorretos ou usuário já cadastrado.\n",
                );
                console.log(
                  "Se já tiver uma conta cadastrada escolha a opção 1 para se logar\n",
                );
              }
              break;

            // Cadastro de agente
            case 2:
              console.log(
                "----------  Opção escolhida: Cadastro de Agente  ----------\n",
              );

              // Solicitar e verificar o nome
              const nome_agente = solicitar_nome();

              // Solicita e verifica o cpf
              const cpf_agente = solicitar_cpf();

              // Solicitação e verificação do email
              const email_agente = solicitar_email();

              // Solicitação e verificação da senha
              const senha_agente = solicitar_senha();

              // Solicita e verifica a matrícula
              const matricula_agente = solicitar_matricula();

              // Faz o cadastro de agente e pega o retorno da função
              const retorno_agente = sistema.cadastro_agente(
                nome_agente,
                cpf_agente,
                email_agente,
                senha_agente,
                matricula_agente,
              );

              // Verifica se deu erro
              if (retorno_agente === true) {
                console.log("Cadastro realizado com sucesso!\n");
                sair = true;
              } else {
                console.log(
                  "Email ou senha incorretos ou usuário já cadastrado.\n",
                );
                console.log(
                  "Se já tiver uma conta cadastrada escolha a opção 1 para se logar\n",
                );
              }
              break;

            // Trata de qualquer outro caso que não foi trabalhado
            default:
              console.log("Opção inválida. Tente novamente\n");
              break;
          }
          break;

        // Sair do sistema
        case 3:
          console.log("----------  Opção escolhida: Sair  ----------\n");
          console.log("Encerrando o sistema...\n");
          // Altera as variáveis para encerrar o sistema
          sair = true;
          encerrar_programa = true;
          break;

        // Trata de qualquer outro caso que não foi trabalhado
        default:
          console.log("Opção inválida. Tente novamente\n");
          break;
      }
    } while (!sair);
}

// Função menu agente
function menu_agente(){

    // Controla o logout do condutor
    let deslogar = false;

    do{
        console.log(
          "----------------------------------- Menu Agente -----------------------------------\n",
        );
        console.log("SEJA MUITO BEM VINDO!\n");
        console.log(
          "Escolha uma das seguintes opções e digite o número referente a ela:\n",
        );
        console.log("1- Ver Meus Dados\n");
        console.log("2- Ver Lista de Veículos\n");
        console.log("3- Ver Lista de Condutores\n");
        console.log("4- Aplicar Multa\n");
        console.log("5- Ver Lista de Multas\n");
        console.log("6- Alterar Status da Multa\n");
        console.log("7- Buscar Carro Por Placa\n");
        console.log("8- Relatório de Multas");
        console.log("9- Deslogar\n");
        console.log(
          "----------------------------------------------------------------------------------------\n",
        );

        // Pega o input do usuário
        const opcao = readlineSync.questionInt();

        // Verifica a opção escolhida
        switch (opcao) {
          // Ver meus dados
          case 1:
            console.log(
              "----------  Opção escolhida: Ver Meus Dados  ----------\n",
            );
            // Pega os dados do agente
            const dados_agente = sistema.ver_dados_agente();
            console.log("Extraindo informações...");
            console.log("ID do Agente: " + dados_agente[0] + "\n");
            console.log("Nome do Agente: " + dados_agente[1] + "\n");
            console.log(
              "CPF do Agente: " + formata_cpf(dados_agente[2]) + "\n",
            );
            console.log("Email do Agente: " + dados_agente[3] + "\n");
            console.log(
              "Número de Matrícula do Agente: " + dados_agente[4] + "\n",
            );
            break;

          // Ver lista de veículos
          case 2:
            console.log(
              "----------  Opção escolhida: Ver Lista de Veículos  ----------\n",
            );
            // Pega a lista de veículos
            const lista_carros = sistema.ver_lista_veiculos();
            // Verifica se a lista está vazia e lança erro em caso positivo
            try {
              if (lista_carros.length === 0) {
                throw new Error("Não há veículos cadastrados.\n");
              }
              console.log("Extraindo informações...");
              // Imprime as informações
              for (const carro of lista_carros) {
                console.log("-------------------------------------------\n");
                console.log("Placa: " + carro[0] + "\n");
                console.log("Modelo: " + carro[1] + "\n");
                console.log("Marca: " + carro[2] + "\n");
                console.log("Cor: " + carro[3] + "\n");
                console.log("ID do dono do veículo: " + carro[4] + "\n");
                console.log("-------------------------------------------\n");
              }
            } catch (error) {
              // Trata o erro
              console.log(error.message);
            }
            break;

          // Ver lista de condutores cadastrados
          case 3:
            console.log(
              "----------  Opção escolhida: Ver Lista de Condutores  ----------\n",
            );
            // Pega a lista de condutores
            const lista_condutores = sistema.ver_lista_condutores();
            // Verifica se a lista está vazia e lança erro em caso positivo
            try {
              if (lista_condutores.length === 0) {
                throw new Error("Não há condutores cadastrados.\n");
              }
              console.log("Extraindo informações...");
              // Imprime as informações
              for (const condutor of lista_condutores) {
                console.log("-------------------------------------------\n");
                console.log("ID do condutor: " + condutor[0] + "\n");
                console.log("Nome do condutor: " + condutor[1] + "\n");
                console.log(
                  "CPF do condutor: " + formata_cpf(condutor[2]) + "\n",
                );
                console.log(
                  "Data de nascimento do condutor: " +
                    formata_data(condutor[3]) +
                    "\n",
                );
                console.log("-------------------------------------------\n");
              }
            } catch (error) {
              // Trata dos erros
              console.log(error.message);
            }
            break;

          // Aplicar multa
          case 4:
            console.log(
              "----------  Opção escolhida: Aplicar Multa  ----------\n",
            );
            // Solicitações de informação
            const id_cliente = solicitar_id_cliente();
            const tipo_infracao = solicitar_tipo_infracao();
            const valor = solicitar_valor();
            const data = solicitar_data();
            // Aplica a multa
            sistema.aplicar_multa(id_cliente, tipo_infracao, valor, data);
            console.log("Multa aplicada com sucesso!\n");
            break;

          // Ver lista de multas
          case 5:
            console.log(
              "----------  Opção escolhida: Ver Lista de Multas  ----------\n",
            );
            // Pega a lista de multas
            const lista_multas = sistema.ver_multas();
            // Verifica se a lista está vazia e lança erro em caso positivo
            try {
              if (lista_multas.length === 0) {
                throw new Error("Não há multas cadastradas.\n");
              }
              console.log("Extraindo informações...");
              // Imprime as informações
              for (const multa of lista_multas) {
                console.log("-------------------------------------------\n");
                console.log("ID da multa: " + multa[0] + "\n");
                console.log("ID do condutor: " + multa[1] + "\n");
                console.log("Tipo de infração: " + multa[2] + "\n");
                console.log(
                  "Valor da multa: " + formata_valor(multa[3]) + "\n",
                );
                console.log(
                  "Data de ocorrência: " + formata_data(multa[4]) + "\n",
                );
                console.log("Status da multa: " + multa[5] + "\n");
                console.log("-------------------------------------------\n");
              }
            } 
            // Trata dos erros
            catch (error) {
              console.log(error.message);
            }
            break;

          // Alterar status da multa
          case 6:
            console.log(
              "----------  Opção escolhida: Alterar Status da Multa  ----------\n",
            );
            // Solicitações de informação
            const id_multa = solicitar_id_multa();
            const novo_status = solicitar_status_multa();

            // Aplica a alteração e verifica se deu erro
            try {
              if (sistema.alterar_status_multa(id_multa, novo_status)) {
                console.log("Status da multa alterado com sucesso!\n");
              } else {
                throw new Error("Erro ao alterar status da multa.\n");
              }
            } 
            // Trata dos erros
            catch (error) {
              console.log(error.message);
            }
            break;

          // Buscar carro por placa
          case 7:
            console.log(
              "----------  Opção escolhida: Buscar Carro Por Placa  ----------\n",
            );
            // Solicita a placa
            const placa_a = solicitar_placa();
            // Faz a busca por placa
            const carro = sistema.buscar_por_placa(placa_a);
            // Verifica se deu erro
            if (carro === false) {
              console.log("Carro não encontrado.\n");
            } 
            // Imprime as informações
            else {
              console.log("Extraindo informações...");
              console.log("Placa: " + carro[0] + "\n");
              console.log("Modelo: " + carro[1] + "\n");
              console.log("Marca: " + carro[2] + "\n");
              console.log("Cor: " + carro[3] + "\n");
              console.log("ID do dono do veículo: " + carro[4] + "\n");
            }
            break;

          // Relatório de multas
          case 8:
            console.log(
              "----------  Opção escolhida: Relatório de Multas  ----------\n",
            );
            // Solicitações de informação
            const data_inicio = solicitar_data();
            const data_fim = solicitar_data();  

            // Pega o relatório
            const arrecadacao = sistema.relatorio_multas(inverte_data(data_inicio), inverte_data(data_fim));
            console.log("Extraindo informações...\n");
            console.log("Somando multas...\n");
            console.log("A arrecadação de multas no peíodo de " + formata_data(data_inicio) + " até " + formata_data(data_fim) + " foi de " + formata_valor(arrecadacao) + "\n");
            
            break;

          // Deslogar
          case 9:
            console.log("----------  Opção escolhida: Deslogar  ----------\n");
            console.log("Deslogando...\n");
            // Altera as variáveis para deslogar o usuário
            sistema.deslogar();
            deslogar = true;
            break;

          // Trata de qualquer outro caso que não foi trabalhado
          default:
            console.log("Opção inválida. Tente novamente\n");
            break;
        }
    }while (!deslogar);
}

// Função menu condutor
function menu_condutor(){

    // Controla o logout do condutor
    let deslogar = false;

    do {
      console.log(
        "----------------------------------- Menu Condutor -----------------------------------\n",
      );
      console.log("SEJA MUITO BEM VINDO!\n");
      console.log(
        "Escolha uma das seguintes opções e digite o número referente a ela:\n",
      );
      console.log("1- Ver Meus Dados\n");
      console.log("2- Ver Minhas Multas\n");
      console.log("3- Cadastrar Veículo\n");
      console.log("4- Pagar Multa\n");
      console.log("5- Recorrer Multa\n");
      console.log("6- Buscar Carro Por Placa\n");
      console.log("7- Excluir Veículo\n");
      console.log("8- Deslogar\n");
      console.log(
        "----------------------------------------------------------------------------------------\n",
      );

      // Pega o input do usuário
      const opcao = readlineSync.questionInt();

      // Verifica a opção escolhida
      switch (opcao) {
        // Ver meus dados
        case 1:
          console.log(
            "----------  Opção escolhida: Ver Meus Dados  ----------\n",
          );
          // Pega os dados do condutor
          const dados_condutor = sistema.ver_dados_condutor();
          console.log("Extraindo informações...");
          // Imprime as informações
          console.log("ID do Condutor: " + dados_condutor[0] + "\n");
          console.log("Nome do Condutor: " + dados_condutor[1] + "\n");
          console.log(
            "CPF do Condutor: " + formata_cpf(dados_condutor[2]) + "\n",
          );
          console.log(
            "Data de Nascimento do Condutor: " +
              formata_data(dados_condutor[3]) +
              "\n",
          );
          console.log("Email do Condutor: " + dados_condutor[4] + "\n");
          break;

        // Ver lista de multas próprias
        case 2:
          console.log(
            "----------  Opção escolhida: Ver Minhas Multas ----------\n",
          );
          // Pega a lista de multas
          const lista_minhas_multas = sistema.ver_multas_condutor();
          // Verifica se a lista está vazia
          try {
            if (lista_minhas_multas.length === 0) {
              throw new Error("Não há multas cadastradas.\n");
            }
            console.log("Extraindo informações...");
            // Imprime as informações
            for (const multa of lista_minhas_multas) {
              console.log("-------------------------------------------\n");
              console.log("ID da multa: " + multa[0] + "\n");
              console.log("Tipo de infração: " + multa[1] + "\n");
              console.log("Valor da multa: " + multa[2] + "\n");
              console.log("Data de ocorrência: " + multa[3] + "\n");
              console.log("Status da multa: " + multa[4] + "\n");
              console.log("-------------------------------------------\n");
            }
          } 
          // Trata dos erros
          catch (error) {
            console.log(error.message);
          }
          break;

        // Cadastrar veículo
        case 3:
          console.log(
            "----------  Opção escolhida: Cadastrar Veículo ----------\n",
          );
          // Solicitações de informação
          const placa = solicitar_placa();
          const modelo = readlineSync.question("Qual é o modelo do veículo? ");
          const marca = readlineSync.question("Qual é a marca do veículo? ");
          const cor = readlineSync.question("Qual é a cor do veículo? ");
          // Cadastra o veículo
          sistema.cadastrar_veiculo(placa, modelo, marca, cor);
          console.log("Carro cadastrado com sucesso!\n");
          break;

        // Pagar multa
        case 4:
          console.log("----------  Opção escolhida: Pagar Multa  ----------\n");
          // Solicita o id da multa a ser paga
          const id_multa_pagar = solicitar_id_multa();
          // Faz o pagamente e verifica se deu erro
          if (sistema.pagar_multa(id_multa_pagar)) {
            console.log("Multa paga com sucesso!\n");
          } else {
            console.log("Erro ao pagar multa. ID não encontrado.\n");
          }
          break;

        // Recorrer multa
        case 5:
          console.log(
            "----------  Opção escolhida: Recorrer Multa ----------\n",
          );
          // Solicita o id da multa a ser recorrida
          const id_multa_recorrer = solicitar_id_multa();
          // Recorre e verifica se deu erro
          if (sistema.recorrer_multa(id_multa_recorrer)) {
            console.log("Multa recorrida com sucesso!\n");
          } else {
            console.log("Erro ao recorrer à multa. ID não encontrado.\n");
          }
          break;

        // Buscar carro por placa
        case 6:
          console.log(
            "----------  Opção escolhida: Buscar Carro Por Placa  ----------\n",
          );
          // Solicita a placa
          const placa_c = solicitar_placa();
          // Faz a busca por placa
          const carro = sistema.buscar_por_placa(placa_c);
          // Verifica se deu erro
          if (carro === false) {
            console.log("Carro não encontrado.\n");
          } 
          // Imprime as informações
          else {
            console.log("Extraindo informações...");
            console.log("Placa: " + carro[0] + "\n");
            console.log("Modelo: " + carro[1] + "\n");
            console.log("Marca: " + carro[2] + "\n");
            console.log("Cor: " + carro[3] + "\n");
            console.log("ID do dono do veículo: " + carro[4] + "\n");
          }
          break;

        // Excluir veículo
        case 7:
          console.log(
            "----------  Opção escolhida: Excluir Veículo ----------\n",
          );
          // Solicita a placa
          const placa_e = solicitar_placa();
          // Exclui o veículo e verifica se deu erro
          if (sistema.excluir_veiculo(placa_e)) {
            console.log("Veículo excluído com sucesso!\n");
          } else {
            console.log("Erro ao excluir carro. Placa não encontrada.\n");
          }
          break;

        // Deslogar
        case 8:
          console.log("----------  Opção escolhida: Deslogar  ----------\n");
          console.log("Deslogando...\n");
          // Altera as variáveis para deslogar o usuário
          sistema.deslogar();
          deslogar = true;
          break;

        // Trata de qualquer outro caso que não foi trabalhado
        default:
          console.log("Opção inválida. Tente novamente\n");
          break;
      }
    } while (!deslogar);
}

// Função para criar informações para testes
function cria_para_teste(){
    sistema.cadastro_agente("Gabriel Santos", "11111111111", "gabrielsantos@example.com", "Testesenha!1", "123456");
    sistema.cadastro_condutor("Julia Carvalho", "22222222222", "01012001", "juliacarvalho@example.com", "Testesenha!2");
    sistema.cadastrar_veiculo("yyy1020", "corolla", "toyota", "preto");
    sistema.aplicar_multa("123456", "Ultrapassar sinal", "120", "09012026");
    sistema.deslogar();
}

main();