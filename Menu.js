// Arquivo: Menu.js

// Importação da classe de contrele "Sistema"
import { Sistema } from "./Sistema.js";

// Importação das validações do aquivo de utilidades "utils"
import { solicitar_email } from "./Solicitacoes.js";
import { solicitar_senha } from "./Solicitacoes.js";
import { solicitar_cpf } from "./Solicitacoes.js";
import { solicitar_data } from "./Solicitacoes.js";
import { solicitar_nome } from "./Solicitacoes.js";


// Importação da biblioteca de input
import readlineSync from 'readline-sync';

// Cria um objeto da classe Sistema

function main(){
    const sistema = new Sistema();
        
    let sair = false;
    let tipo_usuario = 0;

    do{
        console.log("----------------------------------- Menu Usuário -----------------------------------\n",);
        console.log("SEJA MUITO BEM VINDO!\n");
        console.log("Escolha uma das seguintes opções e digite o número referente à ela:\n");
        console.log("1- Fazer Login\n");
        console.log("2- Fazer Cadastro\n");
        console.log("3- Sair\n");
        console.log("----------------------------------------------------------------------------------------\n");

        const opcao_cadastro = readlineSync.questionInt();

        switch (opcao_cadastro) {
            case 1:
                console.log("----------  Opção escolhida: Fazer Login  ----------\n");

                // Solicitação e verificação do email
                const email = solicitar_email();

                // Solicitação e verificação da senha
                const senha = solicitar_senha();

                const retorno = sistema.fazer_login(email, senha);
                
                if(retorno === true){
                    console.log("Login realizado com sucesso!\n");
                    tipo_usuario = sistema.usuario_logado;
                }
                else{
                    console.log("Email ou senha incorretos ou não cadastrados.\n");
                    console.log("Se não tiver uma conta cadastrada escolha a opção 2 para se cadastrar\n");
                }
                break;

            case 2:
                console.log("----------  Opção escolhida: Fazer Cadastro  ----------\n");
                console.log("Você está se cadastrando como?\n");
                console.log("1- Condutor\n");
                console.log("2- Agente de Trânsito\n");
                console.log("Digite o número referente a opção escolhida\n");

                const tipo_cadastro = readlineSync.questionInt();

                switch (tipo_cadastro) {
                    case 1:
                        console.log("----------  Opção escolhida: Cadastro de Condutor  ----------\n");

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

                        const retorno_condutor = sistema.cadastro_condutor(nome_condutor, cpf_condutor, data_nascimento_condutor, email_condutor, senha_condutor);

                        if(retorno_condutor === true){
                            console.log("Cadastro realizado com sucesso!\n");
                            tipo_usuario = sistema.usuario_logado;
                        }
                        else{
                            console.log("Email ou senha incorretos ou usuário já cadastrado.\n");
                            console.log("Se já tiver uma conta cadastrada escolha a opção 1 para se logar\n");
                        }
                        break;
        
                    case 2:
                        console.log("----------  Opção escolhida: Cadastro de Agente  ----------\n");

                        // Solicitar e verificar o nome
                        const nome_agente = solicitar_nome();

                        // Solicita e verifica o cpf
                        const cpf_agente = solicitar_cpf();

                        // Solicitação e verificação do email
                        const email_agente = solicitar_email();

                        // Solicitação e verificação da senha
                        const senha_agente = solicitar_senha();

                        const retorno_agente = sistema.cadastro_agente(nome_agente, cpf_agente, email_agente, senha_agente);

                        if(retorno_agente === true){
                            console.log("Cadastro realizado com sucesso!\n");
                            tipo_usuario = sistema.usuario_logado;
                        }
                        else{
                            console.log("Email ou senha incorretos ou usuário já cadastrado.\n");
                            console.log("Se já tiver uma conta cadastrada escolha a opção 1 para se logar\n",);
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
                break;

            default:
                console.log("Opção inválida. Tente novamente\n");
                break;
            }
    } while(!sair);
}

main();
