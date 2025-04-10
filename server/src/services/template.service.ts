import { IContract, IParty, IClause } from "../models/Contract";

/**
 * Serviço para gerenciar templates de contratos
 */
export class TemplateService {
  /**
   * Gera o conteúdo HTML de um contrato básico de prestação de serviços
   * @param contract Dados do contrato
   * @returns HTML do contrato
   */
  static generateServiceContractTemplate(contract: IContract): string {
    const contratante = contract.parties.find(
      (party) => party.documentType === "cpf"
    );
    const contratado = contract.parties.find(
      (party) => party.documentType === "cnpj"
    );

    // Verificar se as partes foram definidas
    if (!contratante || !contratado) {
      throw new Error(
        "O contrato deve ter pelo menos duas partes: um contratante (CPF) e um contratado (CNPJ)"
      );
    }

    // Formatação das cláusulas
    const clausesHtml = contract.clauses
      .sort((a, b) => a.order - b.order)
      .map(
        (clause, index) => `
        <div class="clause">
          <h3>CLÁUSULA ${index + 1}ª - ${clause.title}</h3>
          <p>${clause.content}</p>
        </div>
      `
      )
      .join("");

    // Gerar o HTML do contrato
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Contrato de Prestação de Serviços - ${contract.title}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 40px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          h1 {
            font-size: 18px;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 16px;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          h3 {
            font-size: 14px;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          .parties {
            margin-bottom: 30px;
          }
          .clause {
            margin-bottom: 20px;
            text-align: justify;
          }
          .signature {
            margin-top: 50px;
            page-break-inside: avoid;
          }
          .signature-line {
            border-top: 1px solid #000;
            width: 250px;
            margin-top: 50px;
            margin-bottom: 10px;
          }
          .signature-block {
            display: inline-block;
            vertical-align: top;
            margin-right: 80px;
            margin-bottom: 40px;
          }
          .date-place {
            margin: 40px 0 60px;
            text-align: center;
          }
          .value {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>
          ${contract.title ? `<h2>${contract.title}</h2>` : ""}
        </div>

        <div class="parties">
          <p><strong>CONTRATANTE:</strong> ${
            contratante.name
          }, portador do CPF ${contratante.documentNumber}.</p>
          
          <p><strong>CONTRATADO:</strong> ${
            contratado.name
          }, inscrito no CNPJ sob o nº ${contratado.documentNumber}.</p>
        </div>

        <p>As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.</p>

        ${clausesHtml}

        ${
          contract.value
            ? `
        <div class="value">
          <p><strong>VALOR:</strong> R$ ${contract.value.toFixed(
            2
          )} (${this.valorPorExtenso(contract.value)}).</p>
        </div>
        `
            : ""
        }

        <div class="date-place">
          <p>${this.getLocalDate()}</p>
        </div>

        <div class="signatures">
          <div class="signature-block">
            <div class="signature-line"></div>
            <p>${contratante.name}<br>Contratante<br>CPF: ${
      contratante.documentNumber
    }</p>
          </div>
          
          <div class="signature-block">
            <div class="signature-line"></div>
            <p>${contratado.name}<br>Contratado<br>CNPJ: ${
      contratado.documentNumber
    }</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Gera o conteúdo HTML de um contrato detalhado com assinaturas
   * @param contract Dados do contrato
   * @returns HTML do contrato
   */
  static generateDetailedContractTemplate(contract: IContract): string {
    // Lista de partes formatada
    const partiesList = contract.parties
      .map(
        (party) => `
      <div class="party">
        <p><strong>Nome:</strong> ${party.name}</p>
        <p><strong>Email:</strong> ${party.email}</p>
        <p><strong>Documento:</strong> ${party.documentType.toUpperCase()}: ${
          party.documentNumber
        }</p>
        <p><strong>Status:</strong> ${
          party.signed ? "Assinado" : "Pendente"
        }</p>
        ${
          party.signedAt
            ? `<p><strong>Data da assinatura:</strong> ${party.signedAt.toLocaleDateString(
                "pt-BR"
              )}</p>`
            : ""
        }
      </div>
    `
      )
      .join('<hr class="divider">');

    // Lista de cláusulas formatada
    const clausesList = contract.clauses
      .sort((a, b) => a.order - b.order)
      .map(
        (clause) => `
        <div class="clause">
          <h3>${clause.title}</h3>
          <div>${clause.content}</div>
        </div>
      `
      )
      .join("");

    // Informações adicionais
    const additionalInfo = `
      <div class="additional-info">
        ${
          contract.value
            ? `<p><strong>Valor:</strong> R$ ${contract.value.toFixed(2)}</p>`
            : ""
        }
        ${
          contract.startDate
            ? `<p><strong>Data de início:</strong> ${contract.startDate.toLocaleDateString(
                "pt-BR"
              )}</p>`
            : ""
        }
        ${
          contract.endDate
            ? `<p><strong>Data de término:</strong> ${contract.endDate.toLocaleDateString(
                "pt-BR"
              )}</p>`
            : ""
        }
      </div>
    `;

    // Área de assinaturas
    const signatureArea = `
      <div class="signature-area">
        <h2>Assine este documento com facilidade e segurança usando nosso sistema de assinatura digital validada juridicamente.</h2>
        <h3>Status das Assinaturas</h3>
        
        <div class="signature-status">
          ${contract.parties
            .map(
              (party) => `
            <div class="signature-party ${party.signed ? "signed" : "pending"}">
              <div class="signature-initials">${this.getInitials(
                party.name
              )}</div>
              <div class="signature-info">
                <div class="signature-name">${party.name}</div>
                <div class="signature-role">${
                  party.documentType === "cpf" ? "Contratante" : "Contratada"
                }</div>
                <div class="signature-status-text">${
                  party.signed ? "Assinado" : "Pendente"
                }</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${contract.title}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 40px;
          }
          .contract-header {
            text-align: center;
            margin-bottom: 30px;
          }
          .contract-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .contract-type {
            font-size: 18px;
            color: #555;
            margin-bottom: 5px;
          }
          .contract-description {
            font-style: italic;
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 20px;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }
          .party {
            margin-bottom: 15px;
          }
          .clause {
            margin-bottom: 20px;
            text-align: justify;
          }
          .clause h3 {
            margin-bottom: 10px;
          }
          .signature-area {
            margin-top: 50px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .signature-status {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
          }
          .signature-party {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: 5px;
            background-color: #fff;
            border: 1px solid #ddd;
            width: 250px;
          }
          .signature-initials {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
          }
          .signature-info {
            flex: 1;
          }
          .signature-name {
            font-weight: bold;
          }
          .signature-role {
            font-size: 0.9em;
            color: #555;
          }
          .signature-status-text {
            margin-top: 5px;
            font-weight: bold;
          }
          .signed .signature-status-text {
            color: green;
          }
          .pending .signature-status-text {
            color: orange;
          }
          .divider {
            border: 0;
            border-top: 1px dashed #ccc;
            margin: 20px 0;
          }
          .additional-info {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="contract-header">
          <div class="contract-title">${contract.title}</div>
          <div class="contract-type">Tipo: ${contract.type}</div>
          ${
            contract.description
              ? `<div class="contract-description">${contract.description}</div>`
              : ""
          }
        </div>

        <h2 class="section-title">PARTES</h2>
        ${partiesList}

        <h2 class="section-title">INFORMAÇÕES DO CONTRATO</h2>
        ${additionalInfo}

        <h2 class="section-title">CLÁUSULAS</h2>
        ${clausesList}

        ${signatureArea}
      </body>
      </html>
    `;
  }

  /**
   * Obtém as iniciais de um nome
   * @param name Nome completo
   * @returns Iniciais do nome
   */
  private static getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  }

  /**
   * Retorna a data atual formatada
   * @returns Data atual no formato "Cidade, dia de mês de ano"
   */
  private static getLocalDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return `São Paulo, ${date.toLocaleDateString("pt-BR", options)}`;
  }

  /**
   * Converte um valor numérico para extenso
   * @param valor Valor a ser convertido
   * @returns Valor por extenso
   */
  private static valorPorExtenso(valor: number): string {
    // Implementação simplificada
    const valores = [
      [
        "",
        "um",
        "dois",
        "três",
        "quatro",
        "cinco",
        "seis",
        "sete",
        "oito",
        "nove",
        "dez",
        "onze",
        "doze",
        "treze",
        "quatorze",
        "quinze",
        "dezesseis",
        "dezessete",
        "dezoito",
        "dezenove",
      ],
      [
        "",
        "",
        "vinte",
        "trinta",
        "quarenta",
        "cinquenta",
        "sessenta",
        "setenta",
        "oitenta",
        "noventa",
      ],
      [
        "",
        "cento",
        "duzentos",
        "trezentos",
        "quatrocentos",
        "quinhentos",
        "seiscentos",
        "setecentos",
        "oitocentos",
        "novecentos",
      ],
    ];

    const formataInteiro = (numero: number): string => {
      if (numero === 0) return "zero";
      if (numero === 100) return "cem";

      let resultado = "";

      if (numero >= 100) {
        const centena = Math.floor(numero / 100);
        resultado += valores[2][centena] + " e ";
        numero %= 100;
      }

      if (numero < 20) {
        resultado += valores[0][numero];
      } else {
        const dezena = Math.floor(numero / 10);
        const unidade = numero % 10;
        resultado += valores[1][dezena];
        if (unidade > 0) resultado += " e " + valores[0][unidade];
      }

      return resultado;
    };

    const parteInteira = Math.floor(valor);
    const parteDecimal = Math.round((valor - parteInteira) * 100);

    let resultado = formataInteiro(parteInteira) + " reais";

    if (parteDecimal > 0) {
      resultado += " e " + formataInteiro(parteDecimal) + " centavos";
    }

    return resultado;
  }
}
