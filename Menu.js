// Arquivo: Menu.js

// Importação da classe de contrele "Sistema"
import { Sistema } from "./Sistema.js";

// Importação das validações do aquivo de utilidades "utils"
import { solicitar_email } from "./Solicitacoes.js";
import { solicitar_senha } from "./Solicitacoes.js";
import { solicitar_cpf } from "./Solicitacoes.js";
import { solicitar_data } from "./Solicitacoes.js";
import { solicitar_nome } from "./Solicitacoes.js";
import { formata_cpf } from "./Solicitacoes.js";
import { formata_data } from "./Solicitacoes.js";
import { solicitar_id_cliente } from "./Solicitacoes.js";
import { solicitar_tipo_infracao } from "./Solicitacoes.js";    
import { solicitar_valor } from "./Solicitacoes.js";
import { formata_valor } from "./Solicitacoes.js";
import { solicitar_id_multa } from "./Solicitacoes.js";




// Importação da biblioteca de input
import readlineSync from 'readline-sync';

// Cria um objeto da classe Sistema
const sistema = new Sistema();

let encerrar_programa = false;

function main(){

        while(!encerrar_programa){
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

      const opcao_cadastro = readlineSync.questionInt();

      switch (opcao_cadastro) {
        case 1:
          console.log("----------  Opção escolhida: Fazer Login  ----------\n");

          // Solicitação e verificação do email
          const email = solicitar_email();

          // Solicitação e verificação da senha
          const senha = solicitar_senha();

          const retorno = sistema.fazer_login(email, senha);

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

        case 2:
          console.log(
            "----------  Opção escolhida: Fazer Cadastro  ----------\n",
          );
          console.log("Você está se cadastrando como?\n");
          console.log("1- Condutor\n");
          console.log("2- Agente de Trânsito\n");
          console.log("Digite o número referente a opção escolhida\n");

          const tipo_cadastro = readlineSync.questionInt();

          switch (tipo_cadastro) {
            case 1:
              console.log(
                "----------  Opção escolhida: Cadastro de Condutor  ----------\n",
              );

              // Solicitar e verificar o nome
              const nome_condutor = solicitar_nome();

              // Solicita e verifica o cpf
              const cpf_condutor = solicitar_cpf();

              // Solicita e verifica a data
              const data_nascimento_condutor = solicitar_data();

              // Solicitação e verificação do email
              const email_condutor = solicitar_email();

              // Solicitação e verificação da senha
              const senha_condutor = solicitar_senha();

              const retorno_condutor = sistema.cadastro_condutor(
                nome_condutor,
                cpf_condutor,
                data_nascimento_condutor,
                email_condutor,
                senha_condutor,
              );

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

              const retorno_agente = sistema.cadastro_agente(
                nome_agente,
                cpf_agente,
                email_agente,
                senha_agente,
              );

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

            default:
              console.log("Opção inválida. Tente novamente\n");
              break;
          }
          break;

        case 3:
          console.log("----------  Opção escolhida: Sair  ----------\n");
          console.log("Encerrando o sistema...\n");
          sair = true;
          encerrar_programa = true;
          break;

        default:
          console.log("Opção inválida. Tente novamente\n");
          break;
      }
    } while (!sair);
}

// Função menu agente
function menu_agente(){

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
        console.log("7- Deslogar\n");
        console.log(
          "----------------------------------------------------------------------------------------\n",
        );

        const opcao = readlineSync.questionInt();

        switch (opcao) {
            case 1:
                console.log("----------  Opção escolhida: Ver Meus Dados  ----------\n");
                const dados_agente = sistema.ver_dados_agente();
                console.log("Extraindo informações...");
                console.log("ID do Agente: " + dados_agente[0] + "\n");
                console.log("Nome do Agente: " + dados_agente[1] + "\n");
                console.log("CPF do Agente: " + dados_agente[2] + "\n");
                console.log("Email do Agente: " + dados_agente[3] + "\n");
                console.log("Número de Matrícula do Agente: " + dados_agente[4] + "\n");
                break;

            case 2:
                console.log("----------  Opção escolhida: Ver Lista de Veículos  ----------\n");
                const lista_carros = sistema.ver_lista_veiculos();
                console.log("Extraindo informações...");
                for (const carro of lista_carros) {
                    console.log("-------------------------------------------\n");
                    console.log("Placa: " + carro[0] + "\n");
                    console.log("Modelo: " + carro[1] + "\n");
                    console.log("Marca: " + carro[2] + "\n");
                    console.log("Cor: " + carro[3] + "\n");
                    console.log("-------------------------------------------\n");
                }
                break;

            case 3:
                console.log("----------  Opção escolhida: Ver Lista de Condutores  ----------\n");
                const lista_condutores = sistema.ver_lista_condutores();
                console.log("Extraindo informações...");
                for (const condutor of lista_condutores) {
                    console.log("-------------------------------------------\n");
                    console.log("ID do condutor: " + condutor[0] + "\n");
                    console.log("Nome do condutor: " + condutor[1] + "\n");
                    console.log("CPF do condutor: " + formata_cpf(condutor[2]) + "\n");
                    console.log("Data de nascimento do condutor: " + formata_data(condutor[3]) + "\n");
                    console.log("-------------------------------------------\n");
                }
                break;

            case 4:
                console.log("----------  Opção escolhida: Aplicar Multa  ----------\n");
                const id_cliente = solicitar_id_cliente();
                const tipo_infracao = solicitar_tipo_infracao();
                const valor = solicitar_valor();
                const data = solicitar_data();
                sistema.aplicar_multa(id_cliente, tipo_infracao, valor, data);
                console.log("Multa aplicada com sucesso!\n");
                break;
            
            case 5:
                console.log("----------  Opção escolhida: Ver Lista de Multas  ----------\n");
                const lista_multas = sistema.ver_multas();
                console.log("Extraindo informações...");
                for (const multa of lista_multas) {
                    console.log("-------------------------------------------\n");
                    console.log("ID da multa: " + multa[0] + "\n");
                    console.log("ID do condutor: " + multa[1] + "\n");
                    console.log("Tipo de infração: " + multa[3] + "\n");
                    console.log("Valor da multa: " + formata_valor(multa[4]) + "\n",);
                    console.log("Data de ocorrência: " + formata_data(multa[5]) + "\n");
                    console.log("Status da multa: " + multa[6] + "\n");
                    console.log("-------------------------------------------\n");
                }
                break;

            case 6:
                console.log("----------  Opção escolhida: Alterar Status da Multa  ----------\n");
                const id_multa = solicitar_id_multa();
                const novo_status = solicitar_status_multa();
                
                try{
                    if(sistema.alterar_status_multa(id_multa, novo_status)){
                        console.log("Status da multa alterado com sucesso!\n");
                    }
                    else{
                        throw new Error("Erro ao alterar status da multa.\n");
                    }
                }
                catch(error){
                    console.log(error.message);
                }
                break;

            case 7:
            console.log("----------  Opção escolhida: Deslogar  ----------\n");
            console.log("Deslogando...\n");
            sistema.deslogar();
            deslogar = true;
            break;


            default:
                console.log("Opção inválida. Tente novamente\n");
                break;
        }
    }while (!deslogar);
}

// Função menu condutor
function menu_condutor(){

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
      console.log("6- Deslogar\n");
      console.log(
        "----------------------------------------------------------------------------------------\n",
      );

      const opcao = readlineSync.questionInt();

      switch (opcao) {
        case 1:
          console.log(
            "----------  Opção escolhida: Ver Meus Dados  ----------\n",
          );
          const dados_condutor = sistema.ver_dados_condutor();
          console.log("Extraindo informações...");
          console.log("ID do Condutor: " + dados_condutor[0] + "\n");
          console.log("Nome do Condutor: " + dados_condutor[1] + "\n");
          console.log("CPF do Condutor: " + formata_cpf(dados_condutor[2]) + "\n");
          console.log("Data de Nascimento do Condutor: " + formata_data(dados_condutor[3]) + "\n");
          console.log("Email do Condutor: " + dados_condutor[4] + "\n");
          break;

        case 2:
          console.log(
            "----------  Opção escolhida: Ver Minhas Multas ----------\n",
          );
          const lista_minhas_multas = sistema.ver_multas_condutor();
          console.log("Extraindo informações...");
          for (const multa of lista_minhas_multas) {
            console.log("-------------------------------------------\n");
            console.log("ID da multa: " + multa[0] + "\n");
            console.log("Tipo de infração: " + multa[1] + "\n");
            console.log("Valor da multa: " + multa[2] + "\n");
            console.log("Data de ocorrência: " + multa[3] + "\n");
            console.log("Status da multa: " + multa[4] + "\n");
            console.log("-------------------------------------------\n");
          }
          break;

        case 3:
          console.log(
            "----------  Opção escolhida: Cadastrar Veículo ----------\n",
          );
          const placa = solicitar_id_cliente();
          const modelo = readlineSync.question();
          const marca = readlineSync.question();
          const cor = readlineSync.question();
          sistema.cadastrar_veiculo(placa, modelo, marca, cor);
          console.log("Carro cadastrado com sucesso!\n");
          break;

        case 4:
          console.log(
            "----------  Opção escolhida: Pagar Multa  ----------\n",
          );
          const id_multa_pagar = solicitar_id_cliente();
          if(sistema.pagar_multa(id_multa_pagar)){
            console.log("Multa paga com sucesso!\n");
          }
          else{
            console.log("Erro ao pagar multa. ID não encontrado.\n");
          };
          break;

        case 5:
          console.log(
            "----------  Opção escolhida: Recorrer Multa ----------\n",
          );
          const id_multa_recorrer = solicitar_id_cliente();
          if(sistema.recorrer_multa(id_multa_recorrer)){
            console.log("Multa recorrida com sucesso!\n");
          }
          else{
            console.log("Erro ao recorrer à multa. ID não encontrado.\n");
          };
          break;

        case 6:
          console.log("----------  Opção escolhida: Deslogar  ----------\n");
          console.log("Deslogando...\n");
          sistema.deslogar();
          deslogar = true;
          break;

        default:
          console.log("Opção inválida. Tente novamente\n");
          break;
      }
    } while (!deslogar);
}

main();
