
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const benefits = [
    "Contratos personalizados em 2 minutos",
    "Modelos validados por advogados",
    "89% mais seguro que copiar da internet",
    "Assinatura digital integrada",
    "Atualizações automáticas conforme mudanças na lei",
  ];

  const contractTypes = [
    { name: "Prestação de Serviços", popular: true },
    { name: "Compra e Venda" },
    { name: "Locação de Imóvel" },
    { name: "Termo de Confidencialidade" },
    { name: "Contrato de Trabalho" },
    { name: "Sociedade Limitada" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contratos jurídicos personalizados com IA
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Crie, personalize e assine contratos profissionais em minutos, 
              sem precisar de um advogado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link to="/criar-contrato">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  Criar Contrato Grátis
                </Button>
              </Link>
              <Link to="/como-funciona">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  Como Funciona
                </Button>
              </Link>
            </div>
            <p className="text-sm opacity-75">
              Mais de 10.000 contratos já foram gerados por nossa plataforma
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3">Responda um questionário</h3>
                <p className="text-gray-600">
                  Perguntas simples sobre as partes, valores e condições específicas do contrato.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3">Nossa IA gera o contrato</h3>
                <p className="text-gray-600">
                  Criamos um contrato personalizado baseado em modelos validados juridicamente.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3">Assine e compartilhe</h3>
                <p className="text-gray-600">
                  Assine digitalmente, compartilhe com as outras partes e tenha seu contrato armazenado com segurança.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contract Types */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Modelos de contratos disponíveis</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Nossa plataforma possui mais de 50 modelos de contratos para diversas situações.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contractTypes.map((type, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${type.popular ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{type.name}</span>
                    {type.popular && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/modelos">
                <Button variant="outline">Ver todos os modelos</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-12">
                <h2 className="text-3xl font-bold mb-6">Por que usar o ContratoFácil?</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/registro">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Começar Agora
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Contrato digital" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gray-50" id="precos">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Planos para todos os perfis</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Do freelancer à grande empresa, temos um plano ideal para suas necessidades.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h3 className="text-xl font-bold mb-2">Gratuito</h3>
                <div className="text-3xl font-bold mb-4">R$ 0<span className="text-gray-500 text-base font-normal">/mês</span></div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>1 contrato simples/mês</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Marca d'água no documento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Exportação em PDF</span>
                  </li>
                </ul>
                <Link to="/registro">
                  <Button className="w-full" variant="outline">Começar Grátis</Button>
                </Link>
              </div>
              
              {/* Personal Plan */}
              <div className="bg-white rounded-lg shadow p-6 border border-blue-200 ring-1 ring-blue-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Mais Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Pessoal</h3>
                <div className="text-3xl font-bold mb-4">R$ 29<span className="text-gray-500 text-base font-normal">/mês</span></div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>5 contratos por mês</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Sem marca d'água</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Assinatura digital</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Suporte por email</span>
                  </li>
                </ul>
                <Link to="/registro">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Assinar Agora</Button>
                </Link>
              </div>
              
              {/* Professional Plan */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h3 className="text-xl font-bold mb-2">Profissional</h3>
                <div className="text-3xl font-bold mb-4">R$ 99<span className="text-gray-500 text-base font-normal">/mês</span></div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Contratos ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Cláusulas complexas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Assinatura digital</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>Histórico de versões</span>
                  </li>
                </ul>
                <Link to="/registro">
                  <Button className="w-full" variant="outline">Assinar Agora</Button>
                </Link>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">
                Precisa de mais recursos ou um plano para sua empresa?
              </p>
              <Link to="/contato">
                <Button variant="link" className="text-blue-600">
                  Contate-nos para planos empresariais
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Comece a criar contratos seguros hoje mesmo</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores que economizam tempo e dinheiro com o ContratoFácil.
            </p>
            <Link to="/registro">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Criar Sua Conta Grátis
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
