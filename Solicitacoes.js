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
    // Cria variável que receberá o email final
  let email_correto;

  while (true) {
    // Pega o input do usuário
    const email = readlineSync.question("Digite o seu email: ");

    // Verifica se o email é válido
    if (verificar_email(email)) {
      email_correto = transforma_email(email);
      break;
    } else {
      console.log("Email inválido. Tente novamente");
      continue;
    }
  }
  // Retorna o email final
  return email_correto;
}

// Função para verificar senha
function verificar_senha(senha) {
  // Critérios
  // Verifica se tem letras minúsculas
  const tem_minuscula = /[a-z]/.test(senha);
  // Verifica se tem letras maiúsculas
  const tem_maiuscula = /[A-Z]/.test(senha);
  // Verifica se tem números
  const tem_numero = /[0-9]/.test(senha);
  // Verifica se tem símbolos
  const tem_simbolo = /[\W_]/.test(senha);
  // Verifica se tem tamanho mínimo
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

// Função para solicitar senha
export function solicitar_senha() {
    // Cria variável que receberá a senha final
  let senha_correta;
  while (true) {
    // Pede a senha, mas não a mostra enquanto digita
    const senha = readlineSync.question("Digite a sua senha: ", {
      hideEchoBack: false,
      mask: "*",
    });

    // Verifica a senha
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

// Função para solicitar nome
export function solicitar_nome() {
    // Cria variável que receberá o nome final
  let nome_correto;
  while (true) {
    // Pega o input do usuário
    const nome = readlineSync.question("Qual é o seu nome? ");

    // Verifica se o nome está vazio
    if (!nome) {
      console.log("Digite algo no campo\n");
      continue;
    }

    // Remove tudo que não é letra e nem espaço
    const apenasLetras = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

    // Verifica se ficou vazio após o tratamento
    if (!apenasLetras) {
      console.log("Nome inválido. Tente novamente\n");
      continue;
    }

    // Resolve o problema dos espaços (trim()  + múltiplos espaços viram um só)
    const semEspacosExtras = apenasLetras.trim().replace(/\s+/g, " ");

    // Formata capitalização (Primeira Maiúscula, resto minúscula)
    const palavras = semEspacosExtras.toLowerCase().split(" ");

    // Pega a primeira letra maiúscula + o resto da palavra. Utiliza map para iterar funções sobre o array palavras.
    const palavrasFormatadas = palavras.map((palavra) => {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    });

    // Junta as palavras com um espaço entre elas
    nome_correto = palavrasFormatadas.join(" ");
    break;
  }
  return nome_correto;
}

// Função para solicitar CPF
export function solicitar_cpf() {
    // Cria variável que receberá o cpf final
  let cpf_correto;
  while (true) {
    // Pega o input do usuário
    const cpf = readlineSync.question("Qual é o seu CPF? ");

    // Verifica se o cpf está vazio
    if (!cpf) {
      console.log("Digite algo no campo\n");
      continue;
    }

    // Remove tudo que não é número
    const cpf_limpo = cpf.replace(/\D/g, "");

    // Verifica se o cpf tem 11 dígitos
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

// Função para solicitar data de nascimento
export function solicitar_data_nascimento() {
    // Cria variável que receberá a data final
  let data_correta;
  while (true) {
    // Pega o input do usuário
    const data_nascimento = readlineSync.question(
      "Qual é a sua data de nascimento (dd/mm/aaaa)? ",
    );

    // Verifica se a data está vazia
    if (!data_nascimento) {
      console.log("Digite algo no campo\n");
      continue;
    }

    // Remove tudo que não é número
    const data_limpa = data_nascimento.replace(/\D/g, "");

    // Verifica se a data tem 8 dígitos
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

// Função de formatação do cpf
export function formata_cpf(cpf) {
    // Formata o cpf no modelo XXX.XXX.XXX-XX
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função de formatação da data
export function formata_data(data) {
    // Formata a data no modelo DD/MM/AAAA
  return data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
}

// Função de solicitação do id do cliente
export function solicitar_id_cliente() {
    // Cria variável que receberá o id final
  let id_cliente_correto;
  while (true) {
    // Pega o input do usuário
    const id_cliente = readlineSync.question("Qual é o ID do condutor? ");

    // Verifica se o id está vazio
    try {
      if (!id_cliente) {
        throw new Error("Digite algo no campo\n");
      }
      // Remove tudo que não é número
      const id_limpo = id_cliente.replace(/\D/g, "");

      // Verifica se o id ficou vazio
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

// Função de solicitação do tipo de infração
export function solicitar_tipo_infracao() {
    // Cria a variável que receberá o tipo de infração final
  let tipo_infracao_correta;
  while (true) {
    // Pega o input do usuário
    const tipo_infracao = readlineSync.question("Qual é o tipo de infração? ");

    // Verifica se o tipo de infração está vazio
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

// Função de solicitação do valor da multa
export function solicitar_valor() {
    // Cria variável que receberá o valor final
  let valor_final;

  while (true) {
    // Pega o input do usuário
    const valor = readlineSync.question("Qual e o valor da multa? ");

    // Verifica se o valor está vazio
    try {
      if (!valor) {
        throw new Error("Digite algo no campo.");
      }

      // Transforma todas as vírgulas em pontos
      let valor_formatado = valor.replace(",", ".");

      // Verifica se existem somente digitos e um ponto
      if (/[^0-9.]/.test(valor_formatado)) {
        throw new Error("Digite apenas números e/ou separador decimal.");
      }

      // Transforma a string em float
      const numero = parseFloat(valor_formatado);

      // Verifica se o número é válido
      if (isNaN(numero) || numero <= 0) {
        throw new Error("Valor inválido.");
      }

      // Transforma em string mantendo os decimais
      valor_final = numero.toFixed(2);
      break;
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  return valor_final;
}

// Função de formatação do valor
export function formata_valor(valor) {
  return valor + " R$";
}

// Função de solicitação do id da multa
export function solicitar_id_multa() {
    // Cria variável que receberá o id final
  let id_multa_correto;
  while (true) {
    // Pega o input do usuário
    const id_multa = readlineSync.question("Qual é o ID da multa? ");

    // Verifica se o id está vazio
    try {
      if (!id_multa) {
        throw new Error("Digite algo no campo\n");
      }
      // Remove tudo que não é número
      const id_limpo = id_multa.replace(/\D/g, "");
      // Verifica se o id ficou vazio
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

// Função de solicitação do status da multa
export function solicitar_status_multa() {
    // Cria variável que receberá o status final
  let status_multa;
  while (true) {
    console.log("Escolha qual será o novo status da multa: \n");
    console.log("1- Pendente\n");
    console.log("2- Paga\n");
    console.log("3- Cancelada\n");
    console.log("4- Recorrida\n");

    // Pega o input do usuário
    const status = readlineSync.questionInt();

    // Define a escolha
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

// Função de solicitação da placa
export function solicitar_placa() {
    // Cria variável que receberá a placa final
  let placa_correta;
  while (true) {
    // Pega o input do usuário
    const placa = readlineSync.question("Qual é a placa do veículo? ");

    // Verifica se a placa está vazia
    try {
      if (!placa) {
        throw new Error("Digite algo no campo\n");
      }
      // Verifica se a placa tem 7 dígitos
      if (!(placa.length === 7)) {
        throw new Error("Placa inválida");
      }
      // Verifica se a placa segue o padrão oficial
      if (!/^[a-zA-Z]{3}[0-9][a-zA-Z0-9][0-9]{2}$/.test(placa)) {
        throw new Error("Formato de placa inválido");
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

// Função de solicitação da matrícula
export function solicitar_matricula() {
    // Cria variável que receberá a matrícula final
  let matricula_correta;
  while (true) {
    // Pega o input do usuário
    const matricula = readlineSync.question(
      "Qual é o seu número de matrícula? ",
    );

    // Verifica se a matrícula está vazia
    try {
      if (!matricula) {
        throw new Error("Digite algo no campo\n");
      }
      // Remove tudo que não é número
      const matricula_limpa = matricula.replace(/\D/g, "");
      if (!matricula_limpa) {
        throw new Error("Número de matrícula inválido. Digite apenas números.");
      }
      matricula_correta = matricula_limpa;
      break;
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  return matricula_correta;
}

// Função de solicitação da data
export function solicitar_data() {
    // Cria variável que receberá a data final
  let data_correta;
  while (true) {
    // Pega o input do usuário
    const data = readlineSync.question(
      "Qual é a data da ocorrência da multa (dd/mm/aaaa)? ",
    );

    // Verifica se a data está vazia
    if (!data) {
      console.log("Digite algo no campo\n");
      continue;
    }

    // Remove tudo que não é número
    const data_limpa = data.replace(/\D/g, "");

    // Verifica se a data tem 8 dígitos
    try {
      if (!(data_limpa.length === 8)) {
        throw new Error("Data inválida");
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