// Arquivo: Menu.js

// Importação da classe de contrele "Sistema"
import { Sistema } from "./Sistema.js";

// Importação da biblioteca de input
import readlineSync from 'readline-sync';

// Cria um objeto da classe Sistema

function main(){
    const sistema = new Sistema();
        
    let sair = false;

    do{
        console.log("----------------------------------- Menu de Cadastro -----------------------------------\n",);
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
                const email = readlineSync.question("Digite o seu email: ");
        } 
    } while(!sair);
}

main();
