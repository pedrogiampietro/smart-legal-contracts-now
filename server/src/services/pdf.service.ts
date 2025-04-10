import * as pdf from "html-pdf";
import path from "path";
import { IContract } from "../models/Contract";
import { TemplateService } from "./template.service";
import fs from "fs";

// Diretório para armazenar PDFs temporários
const TEMP_DIR = path.join(__dirname, "../../temp");

// Certifique-se de que o diretório temporário existe
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Opções para geração de PDF
const PDF_OPTIONS: pdf.CreateOptions = {
  format: "A4",
  orientation: "portrait",
  border: {
    top: "20mm",
    right: "20mm",
    bottom: "20mm",
    left: "20mm",
  },
  footer: {
    height: "10mm",
    contents: {
      default:
        '<span style="color: #444; font-size: 10px; text-align: center; width: 100%; display: block;">Página {{page}} de {{pages}}</span>',
    },
  },
  type: "pdf",
  renderDelay: 1000,
};

/**
 * Serviço para geração de PDFs de contratos
 */
export class PdfService {
  /**
   * Gera um PDF a partir do conteúdo HTML do contrato
   * @param contract Contrato a ser convertido em PDF
   * @returns Caminho do arquivo PDF gerado
   */
  static async generateContractPdf(contract: IContract): Promise<string> {
    // Verificar se o contrato tem conteúdo
    if (!contract.content) {
      throw new Error("O contrato não possui conteúdo para gerar o PDF");
    }

    // Nome do arquivo com ID do contrato para evitar colisões
    const fileName = `contract_${contract._id}.pdf`;
    const filePath = path.join(TEMP_DIR, fileName);

    return new Promise((resolve, reject) => {
      // Tenta remover o arquivo se já existir (para evitar conflitos)
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn(
            `Não foi possível remover o arquivo existente: ${filePath}`,
            err
          );
        }
      }

      pdf.create(contract.content, PDF_OPTIONS).toFile(filePath, (err, res) => {
        if (err) {
          console.error("Erro ao gerar PDF:", err);
          reject(err);
          return;
        }
        resolve(res.filename);
      });
    });
  }

  /**
   * Gera HTML para o contrato com base nos dados
   * @param contract Dados do contrato
   * @returns HTML formatado do contrato
   */
  static generateContractHtml(contract: IContract): string {
    // Usar o novo serviço de template para geração de HTML
    if (contract.type.toLowerCase().includes("serviço")) {
      return TemplateService.generateServiceContractTemplate(contract);
    } else {
      return TemplateService.generateDetailedContractTemplate(contract);
    }
  }

  /**
   * Remove um arquivo PDF temporário
   * @param filePath Caminho do arquivo a ser removido
   */
  static async removeTempFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
