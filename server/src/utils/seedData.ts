import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { connectDB } from "../config/database";
import User from "../models/User";
import ContractTemplate from "../models/ContractTemplate";

// Conectar ao banco de dados
connectDB();

// Dados do usuário admin
const adminUser = {
  name: "Administrador",
  email: "admin@contratofacil.com",
  password: "admin123",
  role: "admin",
};

// Dados de templates de contrato
const contractTemplates = [
  {
    title: "Contrato de Prestação de Serviços",
    description:
      "Modelo padrão para contratação de serviços entre empresas ou profissionais autônomos.",
    type: "Serviço",
    category: "Negócios",
    clauses: [
      {
        title: "OBJETO DO CONTRATO",
        content:
          "O presente instrumento tem como objeto a prestação de serviços de [DESCRIÇÃO DOS SERVIÇOS] pelo CONTRATADO ao CONTRATANTE, conforme especificações detalhadas no Anexo I.",
        order: 1,
      },
      {
        title: "OBRIGAÇÕES DO CONTRATADO",
        content:
          "São obrigações do CONTRATADO: (a) prestar os serviços conforme especificações deste Contrato; (b) manter sigilo sobre todas as informações a que tiver acesso em decorrência deste Contrato; (c) fornecer todo material e equipamento necessário para a execução dos serviços.",
        order: 2,
      },
      {
        title: "OBRIGAÇÕES DO CONTRATANTE",
        content:
          "São obrigações do CONTRATANTE: (a) fornecer todas as informações necessárias para a execução dos serviços; (b) efetuar os pagamentos devidos nas condições estabelecidas neste Contrato; (c) fiscalizar a execução dos serviços.",
        order: 3,
      },
      {
        title: "PRAZO",
        content:
          "O presente contrato terá vigência de [PRAZO], iniciando-se na data de sua assinatura, podendo ser prorrogado mediante acordo entre as partes.",
        order: 4,
      },
      {
        title: "VALOR E FORMA DE PAGAMENTO",
        content:
          "Pela prestação dos serviços, o CONTRATANTE pagará ao CONTRATADO o valor de R$ [VALOR], a ser pago da seguinte forma: [FORMA DE PAGAMENTO].",
        order: 5,
      },
      {
        title: "RESCISÃO",
        content:
          "O presente contrato poderá ser rescindido por qualquer das partes, mediante notificação prévia de 30 (trinta) dias, ou imediatamente em caso de descumprimento de qualquer cláusula contratual.",
        order: 6,
      },
    ],
    isPublic: true,
  },
  {
    title: "Contrato de Locação Comercial",
    description:
      "Modelo para locação de imóveis comerciais, como lojas, escritórios e salas comerciais.",
    type: "Locação",
    category: "Imobiliário",
    clauses: [
      {
        title: "OBJETO",
        content:
          "O LOCADOR dá em locação ao LOCATÁRIO o imóvel situado na [ENDEREÇO COMPLETO], para fins exclusivamente comerciais.",
        order: 1,
      },
      {
        title: "PRAZO",
        content:
          "A presente locação terá o prazo de [PRAZO] meses, iniciando-se em [DATA INÍCIO] e terminando em [DATA TÉRMINO], podendo ser prorrogado mediante acordo entre as partes.",
        order: 2,
      },
      {
        title: "VALOR DO ALUGUEL",
        content:
          "O valor mensal do aluguel será de R$ [VALOR], a ser pago até o dia [DIA] de cada mês, mediante [FORMA DE PAGAMENTO].",
        order: 3,
      },
      {
        title: "REAJUSTE",
        content:
          "O valor do aluguel será reajustado anualmente, de acordo com a variação do índice [ÍNDICE].",
        order: 4,
      },
      {
        title: "TRIBUTOS E DESPESAS",
        content:
          "Serão de responsabilidade do LOCATÁRIO todos os tributos e despesas incidentes sobre o imóvel, como IPTU, taxas de condomínio, água, luz, telefone e gás.",
        order: 5,
      },
      {
        title: "MANUTENÇÃO E CONSERVAÇÃO",
        content:
          "O LOCATÁRIO obriga-se a manter o imóvel em bom estado de conservação, realizando às suas expensas os reparos necessários.",
        order: 6,
      },
      {
        title: "BENFEITORIAS",
        content:
          "O LOCATÁRIO poderá realizar benfeitorias no imóvel, mediante prévia autorização escrita do LOCADOR. As benfeitorias necessárias serão indenizáveis, as úteis poderão ser levantadas pelo LOCATÁRIO, e as voluptuárias não serão indenizáveis nem poderão ser levantadas.",
        order: 7,
      },
    ],
    isPublic: true,
  },
  {
    title: "Acordo de Confidencialidade (NDA)",
    description:
      "Modelo de acordo de confidencialidade para proteger informações sensíveis compartilhadas entre partes.",
    type: "NDA",
    category: "Proteção de Informações",
    clauses: [
      {
        title: "OBJETO",
        content:
          "O presente acordo tem por objeto a proteção das informações confidenciais que venham a ser compartilhadas entre as Partes.",
        order: 1,
      },
      {
        title: "DEFINIÇÃO DE INFORMAÇÕES CONFIDENCIAIS",
        content:
          "Para os fins deste Acordo, consideram-se Informações Confidenciais todas as informações, dados, documentos, especificações técnicas, desenhos, modelos, planos de negócio, programas de computador e quaisquer outros materiais ou informações que sejam revelados por uma Parte (Parte Reveladora) à outra (Parte Receptora).",
        order: 2,
      },
      {
        title: "OBRIGAÇÕES DA PARTE RECEPTORA",
        content:
          "A Parte Receptora compromete-se a: (a) manter em sigilo todas as Informações Confidenciais; (b) utilizar as Informações Confidenciais exclusivamente para os fins permitidos por este Acordo; (c) não revelar, divulgar ou disponibilizar as Informações Confidenciais a terceiros sem o prévio consentimento escrito da Parte Reveladora.",
        order: 3,
      },
      {
        title: "PRAZO",
        content:
          "As obrigações de confidencialidade previstas neste Acordo permanecerão em vigor durante o prazo de [PRAZO] anos, a contar da data de sua assinatura, ou enquanto as informações mantiverem sua natureza confidencial.",
        order: 4,
      },
      {
        title: "EXCEÇÕES",
        content:
          "As obrigações de confidencialidade não se aplicam às informações que: (a) sejam de domínio público à época da revelação; (b) tornem-se de domínio público por ato não atribuível à Parte Receptora; (c) já sejam de conhecimento da Parte Receptora antes da revelação; (d) devam ser reveladas por força de lei ou ordem judicial.",
        order: 5,
      },
    ],
    isPublic: true,
  },
];

// Função para semear dados
const seedData = async (): Promise<void> => {
  try {
    // Limpar dados existentes
    await User.deleteMany({});
    await ContractTemplate.deleteMany({});

    console.log("Dados anteriores removidos");

    // Criar usuário admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    await User.create({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      role: adminUser.role,
    });

    console.log("Usuário admin criado");

    // Criar templates de contrato
    await ContractTemplate.insertMany(contractTemplates);

    console.log("Templates de contrato criados");

    console.log("Dados semeados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao semear dados:", error);
    process.exit(1);
  }
};

// Executar a função de seeding
seedData();
