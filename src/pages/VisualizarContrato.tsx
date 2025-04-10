
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, FileText, Mail, Pencil, Lock, Share2 } from "lucide-react";

const VisualizarContrato = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preview");
  
  // Dados simulados do contrato
  const contrato = {
    titulo: "Contrato de Prestação de Serviços",
    dataGeracao: "10/04/2025",
    status: "Pendente de assinatura",
  };

  // Conteúdo simulado do contrato (seria gerado pela IA)
  const conteudoContrato = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATANTE: João Silva, brasileiro, CPF 123.456.789-00, residente à Rua das Flores, 123, São Paulo/SP.

CONTRATADO: Empresa XYZ Ltda, CNPJ 00.123.456/0001-78, com sede à Av. Paulista, 1000, São Paulo/SP.

As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.

CLÁUSULA PRIMEIRA - DO OBJETO
O presente contrato tem como objeto a prestação de serviços de desenvolvimento de website pela CONTRATADA.

CLÁUSULA SEGUNDA - DO PRAZO
Os serviços deverão ser executados e entregues no prazo de 60 (sessenta) dias.

CLÁUSULA TERCEIRA - DO VALOR
Pela prestação dos serviços, o CONTRATANTE pagará à CONTRATADA o valor de R$ 5.000,00 (cinco mil reais).

CLÁUSULA QUARTA - DA FORMA DE PAGAMENTO
O pagamento será efetuado em 2 (duas) parcelas iguais, sendo a primeira no início dos trabalhos e a segunda na entrega.

CLÁUSULA QUINTA - DAS OBRIGAÇÕES DO CONTRATANTE
São obrigações do CONTRATANTE:
a) Fornecer à CONTRATADA todas as informações necessárias à realização do serviço;
b) Efetuar o pagamento nos prazos e forma definidos neste contrato;
c) Notificar a CONTRATADA sobre qualquer irregularidade encontrada na execução dos serviços.

CLÁUSULA SEXTA - DAS OBRIGAÇÕES DA CONTRATADA
São obrigações da CONTRATADA:
a) Prestar os serviços conforme especificações deste contrato;
b) Responsabilizar-se pelos danos causados diretamente ao CONTRATANTE ou a terceiros;
c) Manter sigilo sobre todas as informações fornecidas pelo CONTRATANTE.

CLÁUSULA SÉTIMA - DA RESCISÃO
O presente contrato poderá ser rescindido por acordo entre as partes ou unilateralmente, por qualquer uma delas, mediante notificação prévia de 30 (trinta) dias.

E, por estarem assim justos e contratados, firmam o presente instrumento em 2 (duas) vias de igual teor.

São Paulo, 10 de abril de 2025.
  `;

  const handleDownloadPDF = () => {
    toast({
      title: "Download iniciado",
      description: "Seu contrato está sendo baixado em formato PDF.",
    });
    // Lógica para download do PDF
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar contrato",
      description: "Link de compartilhamento copiado para a área de transferência.",
    });
    // Lógica para compartilhar contrato
  };

  const handleEditContract = () => {
    toast({
      title: "Editar contrato",
      description: "Abrindo editor de contrato...",
    });
    // Redirecionar para edição
  };

  const handleRequestSignature = () => {
    toast({
      title: "Solicitação enviada",
      description: "Um e-mail foi enviado para as partes para assinatura digital.",
    });
    // Lógica para solicitar assinatura
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{contrato.titulo}</h1>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>Gerado em: {contrato.dataGeracao}</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-600 font-medium">{contrato.status}</span>
              </div>
            </div>
            
            <div className="flex mt-4 md:mt-0 space-x-2">
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-1 h-4 w-4" />
                PDF
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleShare}
              >
                <Share2 className="mr-1 h-4 w-4" />
                Compartilhar
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleEditContract}
              >
                <Pencil className="mr-1 h-4 w-4" />
                Editar
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="preview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="preview">Visualizar</TabsTrigger>
              <TabsTrigger value="simples">Versão Simples</TabsTrigger>
              <TabsTrigger value="assinatura">Assinatura</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview">
              <Card className="p-6">
                <div className="whitespace-pre-wrap font-serif text-justify"
                  style={{lineHeight: "1.6"}}
                >
                  {conteudoContrato}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="simples">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Este contrato, de forma simples:</h3>
                    <ul className="mt-3 space-y-4">
                      <li className="flex">
                        <div className="mr-3 flex-shrink-0">📝</div>
                        <div>
                          <strong className="font-medium">O que é?</strong>
                          <p className="text-gray-700">
                            Um contrato entre João Silva e a Empresa XYZ para desenvolvimento de um website.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mr-3 flex-shrink-0">💰</div>
                        <div>
                          <strong className="font-medium">Quanto custa?</strong>
                          <p className="text-gray-700">
                            R$ 5.000,00 pagos em duas parcelas iguais (início e entrega).
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mr-3 flex-shrink-0">⏱️</div>
                        <div>
                          <strong className="font-medium">Quanto tempo?</strong>
                          <p className="text-gray-700">
                            O projeto deve ser concluído em 60 dias.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mr-3 flex-shrink-0">✅</div>
                        <div>
                          <strong className="font-medium">O que o cliente precisa fazer?</strong>
                          <p className="text-gray-700">
                            Fornecer informações necessárias e realizar os pagamentos no prazo.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mr-3 flex-shrink-0">✅</div>
                        <div>
                          <strong className="font-medium">O que a empresa precisa fazer?</strong>
                          <p className="text-gray-700">
                            Desenvolver o website conforme especificações e manter sigilo sobre as informações.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mr-3 flex-shrink-0">🚫</div>
                        <div>
                          <strong className="font-medium">Como cancelar?</strong>
                          <p className="text-gray-700">
                            Qualquer parte pode cancelar com 30 dias de aviso prévio.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <p className="text-sm text-yellow-700">
                      Esta é uma versão simplificada para entendimento rápido. 
                      Para fins legais, a versão completa do contrato é a que prevalece.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="assinatura">
              <Card className="p-6">
                <div className="text-center mb-8">
                  <Lock className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Assinatura Digital</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Assine este documento com facilidade e segurança usando nosso sistema de 
                    assinatura digital validada juridicamente.
                  </p>
                </div>
                
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Status das Assinaturas</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            JS
                          </div>
                          <div>
                            <p className="font-medium">João Silva</p>
                            <p className="text-xs text-gray-500">Contratante</p>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Pendente
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            XY
                          </div>
                          <div>
                            <p className="font-medium">Empresa XYZ</p>
                            <p className="text-xs text-gray-500">Contratada</p>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Pendente
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleRequestSignature}
                    className="w-full flex items-center justify-center"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Solicitar Assinaturas por Email
                  </Button>
                  
                  <div className="text-center">
                    <Button variant="link" className="text-sm">
                      Assinar pessoalmente agora
                    </Button>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <p className="text-xs text-blue-700">
                      Nossa assinatura digital é legalmente válida de acordo com a Lei 14.063/2020 
                      e equivale a uma assinatura física em papel.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VisualizarContrato;
