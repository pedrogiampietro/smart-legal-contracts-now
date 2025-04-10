
import React, { useState } from "react";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Search, 
  Briefcase, 
  Home, 
  ShoppingBag, 
  Users, 
  Car, 
  FileCheck,
  Star,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Definição de modelos de contrato
const modelos = [
  {
    id: 1,
    titulo: "Contrato de Prestação de Serviços",
    categoria: "servicos",
    descricao: "Ideal para freelancers e prestadores de serviços autônomos.",
    downloads: 2489,
    icone: <FileText className="h-6 w-6 text-blue-600" />,
    popular: true,
  },
  {
    id: 2,
    titulo: "Contrato de Aluguel Residencial",
    categoria: "imoveis",
    descricao: "Para locação de imóveis residenciais com proteções legais.",
    downloads: 1872,
    icone: <Home className="h-6 w-6 text-blue-600" />,
    popular: true,
  },
  {
    id: 3,
    titulo: "Contrato de Compra e Venda",
    categoria: "comercial",
    descricao: "Documento para formalizar transações comerciais seguras.",
    downloads: 1643,
    icone: <ShoppingBag className="h-6 w-6 text-blue-600" />,
    popular: true,
  },
  {
    id: 4,
    titulo: "Contrato de Trabalho CLT",
    categoria: "trabalho",
    descricao: "Contrato formal seguindo as normas da CLT.",
    downloads: 1399,
    icone: <Briefcase className="h-6 w-6 text-blue-600" />,
    popular: false,
  },
  {
    id: 5,
    titulo: "Contrato de Sociedade",
    categoria: "societario",
    descricao: "Para formalização de sociedades empresariais.",
    downloads: 987,
    icone: <Users className="h-6 w-6 text-blue-600" />,
    popular: false,
  },
  {
    id: 6,
    titulo: "Contrato de Venda de Veículo",
    categoria: "veiculos",
    descricao: "Documento para compra e venda de veículos entre particulares.",
    downloads: 1219,
    icone: <Car className="h-6 w-6 text-blue-600" />,
    popular: false,
  },
  {
    id: 7,
    titulo: "NDA - Acordo de Confidencialidade",
    categoria: "comercial",
    descricao: "Protege informações sensíveis compartilhadas entre partes.",
    downloads: 1547,
    icone: <FileCheck className="h-6 w-6 text-blue-600" />,
    popular: false,
  },
  {
    id: 8,
    titulo: "Contrato de Locação Comercial",
    categoria: "imoveis",
    descricao: "Para aluguel de imóveis destinados ao uso comercial.",
    downloads: 908,
    icone: <Home className="h-6 w-6 text-blue-600" />,
    popular: false,
  },
  {
    id: 9,
    titulo: "Contrato de Parceria Comercial",
    categoria: "comercial",
    descricao: "Estabelece termos de colaboração entre empresas.",
    downloads: 763,
    icone: <Users className="h-6 w-6 text-blue-600" />,
    popular: false,
  }
];

// Categorias para filtro
const categorias = [
  { id: "todos", nome: "Todos", icone: <FileText className="h-5 w-5" /> },
  { id: "servicos", nome: "Serviços", icone: <Briefcase className="h-5 w-5" /> },
  { id: "imoveis", nome: "Imóveis", icone: <Home className="h-5 w-5" /> },
  { id: "comercial", nome: "Comercial", icone: <ShoppingBag className="h-5 w-5" /> },
  { id: "trabalho", nome: "Trabalho", icone: <Briefcase className="h-5 w-5" /> },
  { id: "societario", nome: "Societário", icone: <Users className="h-5 w-5" /> },
  { id: "veiculos", nome: "Veículos", icone: <Car className="h-5 w-5" /> },
];

const Modelos = () => {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("populares");

  // Filtragem de modelos com base na busca e categoria
  const modelosFiltrados = modelos
    .filter(modelo => 
      (busca === "" || modelo.titulo.toLowerCase().includes(busca.toLowerCase())) &&
      (categoriaAtiva === "todos" || modelo.categoria === categoriaAtiva)
    )
    .sort((a, b) => {
      if (ordenacao === "populares") {
        return b.downloads - a.downloads;
      } else if (ordenacao === "recentes") {
        // Aqui seria ordenado por data, mas não temos essa prop, então vamos usar id (como se fosse inverso)
        return b.id - a.id;
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Modelos de Contrato</h1>
            <p className="text-lg text-gray-600 mb-8">
              Escolha entre centenas de modelos de contrato revisados por especialistas para proteger seus direitos e negócios.
            </p>
          </div>
        </div>
      </section>

      {/* Ferramentas de busca e filtro */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Barra de pesquisa */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Buscar modelos de contrato..." 
                className="pl-10 pr-4 py-2"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {/* Menu de navegação por categorias */}
            <div className="flex-shrink-0">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white">
                      <Filter className="mr-2 h-4 w-4" />
                      Categorias
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {categorias.map((categoria) => (
                          <li key={categoria.id} onClick={() => setCategoriaAtiva(categoria.id)}>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCategoriaAtiva(categoria.id);
                                }}
                                className={`flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors ${
                                  categoriaAtiva === categoria.id ? "bg-blue-50" : ""
                                }`}
                              >
                                <div className="mr-3">{categoria.icone}</div>
                                <div>
                                  <div className="text-sm font-medium">{categoria.nome}</div>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Botões de ordenação */}
            <div className="flex space-x-2">
              <Button 
                variant={ordenacao === "populares" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrdenacao("populares")}
              >
                <Star className="mr-1 h-4 w-4" />
                Populares
              </Button>
              <Button 
                variant={ordenacao === "recentes" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrdenacao("recentes")}
              >
                Mais Recentes
              </Button>
            </div>
          </div>

          {/* Tags de categorias (visíveis em telas médias e grandes) */}
          <div className="hidden md:flex flex-wrap gap-2 mt-6">
            {categorias.map((categoria) => (
              <Button
                key={categoria.id}
                variant={categoriaAtiva === categoria.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaAtiva(categoria.id)}
                className="flex items-center"
              >
                <span className="mr-1">{categoria.icone}</span>
                {categoria.nome}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Listagem de modelos */}
      <section className="py-8 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          {modelosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelosFiltrados.map((modelo) => (
                <HoverCard key={modelo.id}>
                  <HoverCardTrigger asChild>
                    <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start mb-4">
                          <div className="bg-blue-50 p-3 rounded-full mr-3">
                            {modelo.icone}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">{modelo.titulo}</h3>
                            <p className="text-sm text-gray-500">{modelo.descricao}</p>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {modelo.downloads.toLocaleString()} downloads
                          </span>
                          {modelo.popular && (
                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                              <Star className="h-3 w-3 mr-1" fill="currentColor" />
                              Popular
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">{modelo.titulo}</h4>
                      <p className="text-sm text-gray-500">{modelo.descricao}</p>
                      <div className="pt-2">
                        <Link to={`/criar-contrato?modelo=${modelo.id}`}>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                            Usar este modelo
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Nenhum modelo encontrado</h3>
              <p className="mt-1 text-gray-500">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setBusca("");
                  setCategoriaAtiva("todos");
                }}
              >
                Ver todos os modelos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou o modelo ideal?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Podemos criar um contrato personalizado para atender às suas necessidades específicas.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/criar-contrato">Criar contrato personalizado</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modelos;
