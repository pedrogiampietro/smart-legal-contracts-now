
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Shield, Clock, File, Award } from "lucide-react";
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
  
  const testimonials = [
    {
      name: "Ana Silva",
      role: "Empreendedora",
      content: "O ContratoFácil economizou horas do meu tempo e milhares de reais em despesas legais. Recomendo para todos os empreendedores!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Carlos Mendes",
      role: "Contador",
      content: "Uso o ContratoFácil para todos os meus clientes. A plataforma é intuitiva e os contratos são extremamente profissionais.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Júlia Costa",
      role: "Advogada",
      content: "Como profissional jurídica, posso atestar a qualidade e validade dos contratos gerados. Uma ferramenta excelente.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - Enhanced with animation and clearer CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-6">
              Mais de 10.000 contratos já gerados
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Contratos jurídicos <span className="text-blue-300">personalizados</span> com Inteligência Artificial
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
              Crie, personalize e assine contratos profissionais em minutos, 
              sem precisar contratar um advogado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/criar-contrato">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-bold text-lg py-6 px-8">
                  Criar Contrato Grátis <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/como-funciona">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 py-6 px-8">
                  Como Funciona
                </Button>
              </Link>
            </div>
            <div className="flex justify-center items-center gap-8 text-sm mt-8">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>Pronto em 2 minutos</span>
              </div>
              <div className="flex items-center">
                <File className="w-5 h-5 mr-2" />
                <span>Validado por advogados</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - New */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Por que escolher o ContratoFácil?</h2>
              <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                Desenvolvido por uma equipe de advogados e especialistas em tecnologia, o ContratoFácil 
                automatiza a criação de contratos mantendo a validade jurídica.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="bg-blue-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Economize Tempo</h3>
                <p className="text-gray-600">
                  Gere contratos em minutos, não em dias. Nossa IA automatiza 
                  todo o processo mantendo a qualidade jurídica.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Segurança Jurídica</h3>
                <p className="text-gray-600">
                  Todos os modelos são verificados por advogados 
                  experientes e atualizados conforme mudanças na legislação.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custo Benefício</h3>
                <p className="text-gray-600">
                  Economize milhares de reais em honorários advocatícios 
                  com nossos planos acessíveis para todos os orçamentos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works - Enhanced with numbers and better styling */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Como funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3">Responda um questionário</h3>
                <p className="text-gray-600">
                  Perguntas simples sobre as partes, valores e condições específicas do seu contrato.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3">Nossa IA gera o contrato</h3>
                <p className="text-gray-600">
                  Criamos um contrato personalizado baseado em modelos validados por advogados experientes.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3">Assine e compartilhe</h3>
                <p className="text-gray-600">
                  Assine digitalmente, compartilhe com as outras partes e tenha seu contrato armazenado com segurança.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - New */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">O que nossos clientes dizem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </div>
              ))}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {contractTypes.map((type, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg border transition-all hover:shadow-md ${type.popular ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
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
                <Button variant="outline" className="mt-4">Ver todos os modelos</Button>
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
                      <CheckCircle className="text-green-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
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
                <div className="rounded-lg overflow-hidden shadow-xl">
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
              <div className="bg-white rounded-lg shadow p-8 border border-gray-100 transition duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">Gratuito</h3>
                <div className="text-3xl font-bold mb-4">R$ 0<span className="text-gray-500 text-base font-normal">/mês</span></div>
                <ul className="mb-8 space-y-3">
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
              <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-200 ring-1 ring-blue-500 relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full font-medium">
                  Mais Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Pessoal</h3>
                <div className="text-3xl font-bold mb-4">R$ 29<span className="text-gray-500 text-base font-normal">/mês</span></div>
                <ul className="mb-8 space-y-3">
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
              <div className="bg-white rounded-lg shadow p-8 border border-gray-100 transition duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">Profissional</h3>
                <div className="text-3xl font-bold mb-4">R$ 99<span className="text-gray-500 text-base font-normal">/mês</span></div>
                <ul className="mb-8 space-y-3">
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
        <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Comece a criar contratos seguros hoje mesmo</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores que economizam tempo e dinheiro com o ContratoFácil.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/registro">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8">
                  Criar Sua Conta Grátis
                </Button>
              </Link>
              <Link to="/contato">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-8">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
