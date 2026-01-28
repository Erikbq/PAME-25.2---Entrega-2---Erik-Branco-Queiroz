// Importação da biblioteca de input
import readlineSync from "readline-sync";

// Função para verificar o email
function verificar_email(email){
    // Validar se o email está vazio
    if(!email){
        return false;
    }
    // Verifica se contém @
    else if(!email.includes("@")){
        return false;
    }
    else{
        return true;
    }
}

// Função para transformar o email
function transforma_email(email){
    // Manipular o email. trim() retira espaços vazios nas pontas
    const email_limpo = email.toLowerCase().trim();
    return email_limpo;
}

// Função para solicitar email
export function solicitar_email(){
    let email_correto;
    while(true){
        const email = readlineSync.question("Digite o seu email: ");
        if(verificar_email(email)){
            email_correto = transforma_email(email);
            break;
        }
        else{
            console.log("Email inválido. Tente novamente");
            continue;
        }
    }
    return email_correto;
}


// Função para verificar senha 
function verificar_senha(senha){

    // Critérios
    const tem_minuscula = /[a-z]/.test(senha);
    const tem_maiuscula = /[A-Z]/.test(senha);
    const tem_numero = /[0-9]/.test(senha);
    const tem_simbolo = /[\W_]/.test(senha);
    const tamanho_minimo = senha.length >= 8;

    // Faz a validação
    if(tem_maiuscula && tem_minuscula && tem_numero && tem_simbolo && tamanho_minimo){
        return true;
    }
    else{
        return false;
    }
}

export function solicitar_senha(){
    let senha_correta;
    while(true){
        // Pede a senha, mas não a mostra enquanto digita
        const senha = readlineSync.question("Digite a sua senha: ", {hideEchoBack: true});
    
        if(verificar_senha(senha)){
            senha_correta = senha;
            break;
        }
        else{
            console.log("A senha precisa conter ao menos 8 digitos, sendo eles letras maiúsculas, minúsculas, números e símbolos");
            continue;
        }
    }
    return senha_correta;
}

export function solicitar_nome(){
    let nome_correto;
    while (true) {
      const nome = readlineSync.question("Qual é o seu nome? ");

      if (!nome) {
        console.log("Digite algo no campo\n");
        continue;
      }

      // 1. Remove tudo que NÃO é letra e nem espaço
      const apenasLetras = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

      if (!apenasLetras){
        console.log("Nome inválido. Tente novamente\n");
        continue;
      }

      // 2. Resolve o problema dos espaços (trim()  + múltiplos espaços viram um só)
      const semEspacosExtras = apenasLetras.trim().replace(/\s+/g, " ");

      // 3. Formata Capitalização (Primeira Maiúscula, resto minúscula)
      const palavras = semEspacosExtras.toLowerCase().split(" ");

        // Pega a 1ª letra maiúscula + o resto da palavra. Utiliza map para iterar finções sobre o array palavras.
      const palavrasFormatadas = palavras.map((palavra) => {return palavra.charAt(0).toUpperCase() + palavra.slice(1);});

      nome_correto = palavrasFormatadas.join(" ");
      break;
    }
    return nome_correto;
}

export function solicitar_cpf(){
    let cpf_correto;
    while(true){
        const cpf = readlineSync.question("Qual é o seu CPF? ");

        if(!cpf){
            console.log("Digite algo no campo\n");
            continue;
        }

        const cpf_limpo = cpf.replace(/\D/g, '');
    
        try{
            if(cpf_limpo.length < 11){
                throw new Error("CPF inválido");
            }
        }
        catch(error){
            console.log(error.message);
            continue;
        }
        cpf_correto = cpf_limpo;
        break;
    }
    return cpf_correto;
}

export function solicitar_data(){
    let data_correta;
    while(true){
        const data_nascimento = readlineSync.question("Qual é a sua data de nascimento (dd/mm/aaaa)? ");

        if(!data_nascimento){
            console.log("Digite algo no campo\n");
            continue;
        }

        const data_limpa = data_nascimento.replace(/\D/g, '');
    
        try{
            if(data_limpa.length < 8){
                throw new Error("Data de nascimento inválida");
            }
        }
        catch(error){
            console.log(error.message);
            continue;
        }
        data_correta = data_limpa;
        break;
    }
    return data_correta;

}