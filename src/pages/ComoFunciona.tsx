
import React from "react";
import { 
  FileText, 
  List, 
  FileCheck, 
  Clock, 
  Shield, 
  PenTool, 
  AlertCircle,
  ChevronDown
} from "lucide-react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

const ComoFunciona = () => {
  const steps = [
    {
      icon: <List className="h-8 w-8 text-blue-600" />,
      title: "Preencha o questionário",
      description: "Responda perguntas simples sobre o seu contrato como as partes envolvidas, valores, e prazos."
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Escolha o modelo",
      description: "Selecione entre centenas de modelos de contratos já revisados por advogados especialistas."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Geração instantânea",
      description: "Nossa IA gerará seu contrato personalizado em menos de 2 minutos com todas suas especificações."
    },
    {
      icon: <PenTool className="h-8 w-8 text-blue-600" />,
      title: "Revise e edite",
      description: "Você pode revisar e fazer ajustes no seu contrato com nossa interface amigável."
    },
    {
      icon: <FileCheck className="h-8 w-8 text-blue-600" />,
      title: "Assine digitalmente",
      description: "Envie para assinatura digital sem sair da plataforma e garanta validade jurídica."
    }
  ];

  const faqs = [
    {
      question: "Os contratos gerados têm validade jurídica?",
      answer: "Sim! Todos os nossos contratos são baseados em modelos revisados por advogados e estão em conformidade com a legislação brasileira. Quando assinados digitalmente pela nossa plataforma, possuem validade jurídica completa."
    },
    {
      question: "Quanto tempo leva para gerar um contrato?",
      answer: "O processo de geração é praticamente instantâneo! Nossa IA processa seu questionário e produz um contrato personalizado em menos de 2 minutos."
    },
    {
      question: "Posso editar o contrato depois de gerado?",
      answer: "Absolutamente! Você pode revisar e fazer ajustes no seu contrato antes da assinatura, garantindo que todas as especificidades do seu acordo estejam contempladas."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sua privacidade é nossa prioridade. Todos os dados são criptografados e tratados de acordo com a Lei Geral de Proteção de Dados (LGPD). Não compartilhamos suas informações com terceiros."
    },
    {
      question: "O serviço substitui um advogado?",
      answer: "Nossa plataforma facilita a criação de contratos para situações comuns e bem estabelecidas. Para casos complexos ou com necessidades jurídicas específicas, sempre recomendamos a consulta a um advogado. Inclusive, oferecemos um serviço de revisão humana como opção adicional."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Como Funciona o ContratoFácil</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gere contratos personalizados, juridicamente válidos em minutos 
            sem precisar ser um especialista em direito.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/criar-contrato">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Criar contrato agora
              </Button>
            </Link>
            <Link to="/registro">
              <Button size="lg" variant="outline">
                Registrar-se grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Crie seu contrato em 5 passos simples</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-xl">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o ContratoFácil?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">Segurança Jurídica</h3>
              </div>
              <p className="text-gray-600">
                Todos os modelos são atualizados automaticamente quando há mudanças na legislação, 
                garantindo que seu contrato esteja sempre em conformidade com as leis vigentes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl">Economia de Tempo</h3>
              </div>
              <p className="text-gray-600">
                O que levaria horas para ser feito manualmente ou dias esperando um advogado, 
                é concluído em minutos com nossa plataforma inteligente.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl">Linguagem Clara</h3>
              </div>
              <p className="text-gray-600">
                Entenda exatamente o que está assinando com nossa explicação em linguagem simples 
                para cada cláusula jurídica complexa.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <FileCheck className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-bold text-xl">Personalização Total</h3>
              </div>
              <p className="text-gray-600">
                Cada contrato é único como seu negócio. Nossa IA personaliza todas as cláusulas 
                de acordo com suas necessidades específicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para criar seu primeiro contrato?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experimente gratuitamente e veja como é fácil e rápido gerar contratos juridicamente válidos.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/criar-contrato">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Criar contrato grátis
              </Button>
            </Link>
            <Link to="/modelos">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Ver modelos disponíveis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComoFunciona;
