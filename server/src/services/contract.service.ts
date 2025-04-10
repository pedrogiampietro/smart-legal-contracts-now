import { Types } from "mongoose";
import Contract, {
  IContract,
  IParty,
  ContractStatus,
} from "../models/Contract";
import { PdfService } from "./pdf.service";
import { TemplateService } from "./template.service";
import crypto from "crypto";

/**
 * Serviço para gerenciar contratos
 */
export class ContractService {
  /**
   * Gera o conteúdo HTML para um contrato e o atualiza no banco de dados
   * @param contractId ID do contrato
   * @returns Contrato atualizado com conteúdo HTML
   */
  static async generateContractContent(contractId: string): Promise<IContract> {
    // Buscar o contrato
    const contract = await Contract.findById(contractId);

    if (!contract) {
      throw new Error("Contrato não encontrado");
    }

    // Gerar o conteúdo HTML baseado no tipo de contrato
    let htmlContent = "";

    if (contract.type.toLowerCase().includes("serviço")) {
      // Para contratos de prestação de serviços, usar o template específico
      htmlContent = TemplateService.generateServiceContractTemplate(contract);
    } else {
      // Para outros tipos de contrato, usar o template detalhado
      htmlContent = TemplateService.generateDetailedContractTemplate(contract);
    }

    // Atualizar o contrato com o conteúdo HTML
    contract.content = htmlContent;

    // Se o contrato for um rascunho e tiver todas as informações necessárias,
    // atualizar para pendente
    if (contract.status === "draft" && this.isContractComplete(contract)) {
      contract.status = "pending";
    }

    // Salvar o contrato atualizado
    await contract.save();

    return contract;
  }

  /**
   * Gera um PDF para um contrato
   * @param contractId ID do contrato
   * @returns Caminho para o arquivo PDF gerado
   */
  static async generateContractPdf(contractId: string): Promise<string> {
    // Buscar o contrato
    const contract = await Contract.findById(contractId);

    if (!contract) {
      throw new Error("Contrato não encontrado");
    }

    // Se o contrato não tiver conteúdo, gerar primeiro
    if (!contract.content) {
      await this.generateContractContent(contractId);
    }

    // Gerar o PDF
    return PdfService.generateContractPdf(contract);
  }

  /**
   * Verifica se todas as partes do contrato assinaram
   * @param contract Contrato a ser verificado
   * @returns Verdadeiro se todas as partes assinaram
   */
  static allPartiesSigned(contract: IContract): boolean {
    return contract.parties.every((party) => party.signed);
  }

  /**
   * Verifica se um contrato está completo para ser enviado às partes
   * @param contract Contrato a ser verificado
   * @returns Verdadeiro se o contrato estiver completo
   */
  static isContractComplete(contract: IContract): boolean {
    // Verificar se tem título
    if (!contract.title || contract.title.trim() === "") {
      return false;
    }

    // Verificar se tem tipo
    if (!contract.type || contract.type.trim() === "") {
      return false;
    }

    // Verificar se tem pelo menos uma parte
    if (!contract.parties || contract.parties.length === 0) {
      return false;
    }

    // Verificar se todas as partes têm as informações básicas
    for (const party of contract.parties) {
      if (!party.name || !party.email || !party.documentNumber) {
        return false;
      }
    }

    // Verificar se tem pelo menos uma cláusula
    if (!contract.clauses || contract.clauses.length === 0) {
      return false;
    }

    return true;
  }

  /**
   * Registra a assinatura de uma parte no contrato
   * @param contractId ID do contrato
   * @param email Email da parte que está assinando
   * @returns Contrato atualizado
   */
  static async signContract(
    contractId: string,
    email: string
  ): Promise<IContract> {
    // Buscar o contrato
    const contract = await Contract.findById(contractId);

    if (!contract) {
      throw new Error("Contrato não encontrado");
    }

    // Verificar se o contrato está no estado correto para assinatura
    if (contract.status !== "pending") {
      throw new Error(
        `Contrato não está disponível para assinatura. Status atual: ${contract.status}`
      );
    }

    // Encontrar a parte pelo email
    const partyIndex = contract.parties.findIndex(
      (party) => party.email === email
    );

    if (partyIndex === -1) {
      throw new Error("Email não encontrado entre as partes do contrato");
    }

    // Atualizar o status de assinatura
    contract.parties[partyIndex].signed = true;
    contract.parties[partyIndex].signedAt = new Date();

    // Verificar se todas as partes assinaram
    if (this.allPartiesSigned(contract)) {
      contract.status = "active";

      // Aqui poderia ser adicionada a lógica para registrar o contrato em blockchain
      // Gerando um hash único para simular
      contract.blockchainHash = this.generateBlockchainHash(contract);
    }

    // Salvar as alterações
    await contract.save();

    return contract;
  }

  /**
   * Envia o contrato para as partes assinarem
   * @param contractId ID do contrato
   * @returns Contrato com status atualizado
   */
  static async sendContractForSignature(
    contractId: string
  ): Promise<IContract> {
    // Buscar o contrato
    const contract = await Contract.findById(contractId);

    if (!contract) {
      throw new Error("Contrato não encontrado");
    }

    // Verificar se o contrato está completo
    if (!this.isContractComplete(contract)) {
      throw new Error(
        "O contrato está incompleto e não pode ser enviado para assinatura"
      );
    }

    // Gerar ou atualizar o conteúdo do contrato
    await this.generateContractContent(contractId);

    // Atualizar o status para pendente
    contract.status = "pending";

    // Salvar o contrato
    await contract.save();

    // Aqui poderia ter a lógica para enviar emails para as partes
    // Isso seria implementado em um serviço de email separado

    return contract;
  }

  /**
   * Gera um hash para simular o registro em blockchain
   * @param contract Contrato a ser registrado
   * @returns Hash do contrato
   */
  private static generateBlockchainHash(contract: IContract): string {
    const data = JSON.stringify({
      id: contract._id,
      title: contract.title,
      parties: contract.parties.map((p) => ({
        name: p.name,
        document: p.documentNumber,
        signed: p.signed,
        signedAt: p.signedAt,
      })),
      clauses: contract.clauses.map((c) => ({
        title: c.title,
        content: c.content,
      })),
      timestamp: new Date().toISOString(),
    });

    return crypto.createHash("sha256").update(data).digest("hex");
  }

  /**
   * Cancela um contrato
   * @param contractId ID do contrato
   * @returns Contrato com status atualizado
   */
  static async cancelContract(contractId: string): Promise<IContract> {
    // Buscar o contrato
    const contract = await Contract.findById(contractId);

    if (!contract) {
      throw new Error("Contrato não encontrado");
    }

    // Verificar se o contrato pode ser cancelado
    if (contract.status === "active" && this.allPartiesSigned(contract)) {
      throw new Error(
        "Contrato já está ativo e assinado por todas as partes, não pode ser cancelado"
      );
    }

    // Atualizar o status
    contract.status = "cancelled";

    // Salvar o contrato
    await contract.save();

    return contract;
  }
}
