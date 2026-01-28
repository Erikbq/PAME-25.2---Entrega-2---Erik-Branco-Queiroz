// Importação da biblioteca de input
import readlineSync from "readline-sync";

// Função para verificar o email
function verificar_email(email) {
  // Validar se o email está vazio
  if (!email) {
    return false;
  }
  // Verifica se contém @
  else if (!email.includes("@")) {
    return false;
  } else {
    return true;
  }
}

// Função para transformar o email
function transforma_email(email) {
  // Manipular o email. trim() retira espaços vazios nas pontas
  const email_limpo = email.toLowerCase().trim();
  return email_limpo;
}

// Função para solicitar email
export function solicitar_email() {
  let email_correto;
  while (true) {
    const email = readlineSync.question("Digite o seu email: ");
    if (verificar_email(email)) {
      email_correto = transforma_email(email);
      break;
    } else {
      console.log("Email inválido. Tente novamente");
      continue;
    }
  }
  return email_correto;
}

// Função para verificar senha
function verificar_senha(senha) {
  // Critérios
  const tem_minuscula = /[a-z]/.test(senha);
  const tem_maiuscula = /[A-Z]/.test(senha);
  const tem_numero = /[0-9]/.test(senha);
  const tem_simbolo = /[\W_]/.test(senha);
  const tamanho_minimo = senha.length >= 8;

  // Faz a validação
  if (
    tem_maiuscula &&
    tem_minuscula &&
    tem_numero &&
    tem_simbolo &&
    tamanho_minimo
  ) {
    return true;
  } else {
    return false;
  }
}

export function solicitar_senha() {
  let senha_correta;
  while (true) {
    // Pede a senha, mas não a mostra enquanto digita
    const senha = readlineSync.question("Digite a sua senha: ", {
      hideEchoBack: false,
      mask: "*"
    });

    if (verificar_senha(senha)) {
      senha_correta = senha;
      break;
    } else {
      console.log(
        "A senha precisa conter ao menos 8 digitos, sendo eles letras maiúsculas, minúsculas, números e símbolos",
      );
      continue;
    }
  }
  return senha_correta;
}

export function solicitar_nome() {
  let nome_correto;
  while (true) {
    const nome = readlineSync.question("Qual é o seu nome? ");

    if (!nome) {
      console.log("Digite algo no campo\n");
      continue;
    }

    // 1. Remove tudo que NÃO é letra e nem espaço
    const apenasLetras = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

    if (!apenasLetras) {
      console.log("Nome inválido. Tente novamente\n");
      continue;
    }

    // 2. Resolve o problema dos espaços (trim()  + múltiplos espaços viram um só)
    const semEspacosExtras = apenasLetras.trim().replace(/\s+/g, " ");

    // 3. Formata Capitalização (Primeira Maiúscula, resto minúscula)
    const palavras = semEspacosExtras.toLowerCase().split(" ");

    // Pega a 1ª letra maiúscula + o resto da palavra. Utiliza map para iterar finções sobre o array palavras.
    const palavrasFormatadas = palavras.map((palavra) => {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    });

    nome_correto = palavrasFormatadas.join(" ");
    break;
  }
  return nome_correto;
}

export function solicitar_cpf() {
  let cpf_correto;
  while (true) {
    const cpf = readlineSync.question("Qual é o seu CPF? ");

    if (!cpf) {
      console.log("Digite algo no campo\n");
      continue;
    }

    const cpf_limpo = cpf.replace(/\D/g, "");

    try {
      if (!(cpf_limpo.length === 11)) {
        throw new Error("CPF inválido");
      }
    } catch (error) {
      console.log(error.message);
      continue;
    }
    cpf_correto = cpf_limpo;
    break;
  }
  return cpf_correto;
}

export function solicitar_data() {
  let data_correta;
  while (true) {
    const data_nascimento = readlineSync.question(
      "Qual é a sua data de nascimento (dd/mm/aaaa)? ",
    );

    if (!data_nascimento) {
      console.log("Digite algo no campo\n");
      continue;
    }

    const data_limpa = data_nascimento.replace(/\D/g, "");

    try {
      if (!(data_limpa.length === 8)) {
        throw new Error("Data de nascimento inválida");
      }
    } catch (error) {
      console.log(error.message);
      continue;
    }
    data_correta = data_limpa;
    break;
  }
  return data_correta;
}

export function formata_cpf(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formata_data(data) {
  return data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
}

export function solicitar_id_cliente() {
  let id_cliente_correto;
  while (true) {
    const id_cliente = readlineSync.question("Qual é o ID do condutor? ");

    try {
      if (!id_cliente) {
        throw new Error("Digite algo no campo\n");
      }
      const id_limpo = id_cliente.replace(/\D/g, "");
      if (!id_limpo) {
        throw new Error("ID inválido");
      }
      id_cliente_correto = id_limpo;
      break;
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  return id_cliente_correto;
}

export function solicitar_tipo_infracao() {
  let tipo_infracao_correta;
  while (true) {
    const tipo_infracao = readlineSync.question("Qual é o tipo de infração? ");

    try {
      if (!tipo_infracao) {
        throw new Error("Digite algo no campo\n");
      }
      tipo_infracao_correta = tipo_infracao;
      break;
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  return tipo_infracao_correta;
}

export function solicitar_valor() {
  let valor_final;

    while (true) {
        const valor = readlineSync.question("Qual e o valor da multa? ");

        try {
            if (!valor) {
                throw new Error("Digite algo no campo.");
            }

            let valor_formatado = valor.replace(",", ".");

            if (/[^0-9.]/.test(valor_formatado)) {
                throw new Error("Digite apenas números e/ou separador decimal.");
            }

            const numero = parseFloat(valor_formatado);

            if (isNaN(numero) || numero <= 0) {
                throw new Error("Valor inválido.");
            }

            valor_final = numero.toFixed(2);
            break;
        } 
        catch (error) {
            console.log(error.message);
            continue;
        }
    }
    return valor_final;
}

export function formata_valor(valor){
    return (valor + " R$");
}

export function solicitar_id_multa(){
  let id_multa_correto;
  while (true) {
    const id_multa = readlineSync.question("Qual é o ID da multa? ");

    try {
      if (!id_multa) {
        throw new Error("Digite algo no campo\n");
      }
      const id_limpo = id_multa.replace(/\D/g, "");
      if (!id_limpo) {
        throw new Error("ID inválido");
      }
      id_multa_correto = id_limpo;
      break;
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  return id_multa_correto;
}

export function solicitar_status_multa() {
  let status_multa;
  while (true) {
    console.log("Escolha qual será o novo status da multa: \n");
    console.log("1- Pendente\n");
    console.log("2- Paga\n");
    console.log("3- Cancelada\n");
    console.log("4- Recorrida\n");

    const status = readlineSync.questionInt();

    switch (status) {
      case 1:
        status_multa = "Pendente";
        break;
      case 2:
        status_multa = "Paga";
        break;
      case 3:
        status_multa = "Cancelada";
        break;
      case 4:
        status_multa = "Recorrida";
        break;
      default:
        console.log("Opção inválida. Tente novamente\n");
        continue;
    }
    break;
  }
  return status_multa;
}

export function solicitar_placa(){
  let placa_correta;
  while (true) {
    const placa = readlineSync.question("Qual é a placa do veículo? ");

    try {
      if (!placa) {
        throw new Error("Digite algo no campo\n");
      }
      if (!(placa.length === 7)) {
        throw new Error("Placa inválida");
      }
      placa_correta = placa;
      break;
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  return placa_correta;
}