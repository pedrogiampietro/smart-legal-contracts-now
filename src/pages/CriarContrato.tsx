
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CriarContrato = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    tipoContrato: "",
    nomeContratante: "",
    cpfCnpjContratante: "",
    enderecoContratante: "",
    nomeContratado: "",
    cpfCnpjContratado: "",
    enderecoContratado: "",
    objeto: "",
    valor: "",
    prazo: "",
    formaPagamento: "",
    detalhesAdicionais: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Validação básica
    if (step === 1 && !formData.tipoContrato) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione o tipo de contrato.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2) {
      if (!formData.nomeContratante || !formData.cpfCnpjContratante) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha os dados do contratante.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.nomeContratado || !formData.cpfCnpjContratado) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha os dados do contratado.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 3) {
      if (!formData.objeto || !formData.valor || !formData.prazo) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha os detalhes do contrato.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleGenerateContract();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerateContract = () => {
    setIsGenerating(true);
    
    // Simulando chamada à API de geração de contrato
    setTimeout(() => {
      toast({
        title: "Contrato gerado com sucesso!",
        description: "Você será redirecionado para visualização do contrato.",
      });
      
      setIsGenerating(false);
      navigate("/visualizar-contrato/123"); // Redirecionar para página de visualização
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Criar Contrato</h1>
          
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex justify-between mb-2">
              {["Tipo", "Partes", "Detalhes", "Revisão"].map((label, index) => (
                <div key={index} className="text-center flex-1">
                  <div 
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 
                      ${index + 1 < step ? 'bg-green-500 text-white' : 
                        index + 1 === step ? 'bg-blue-600 text-white' : 
                        'bg-gray-200 text-gray-600'}`}
                  >
                    {index + 1}
                  </div>
                  <div className={`text-xs ${index + 1 === step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
          
          <Card className="p-6">
            {/* Step 1: Tipo de Contrato */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Escolha o tipo de contrato</h2>
                <div className="mb-6">
                  <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
                  <Select 
                    value={formData.tipoContrato}
                    onValueChange={(value) => handleSelectChange("tipoContrato", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o tipo de contrato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prestacao-servicos">Prestação de Serviços</SelectItem>
                      <SelectItem value="compra-venda">Compra e Venda</SelectItem>
                      <SelectItem value="locacao">Locação de Imóvel</SelectItem>
                      <SelectItem value="confidencialidade">Termo de Confidencialidade</SelectItem>
                      <SelectItem value="trabalho">Contrato de Trabalho</SelectItem>
                      <SelectItem value="sociedade">Sociedade Limitada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {/* Step 2: Dados das Partes */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Dados das partes</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Contratante</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="nomeContratante">Nome / Razão Social</Label>
                      <Input 
                        id="nomeContratante" 
                        name="nomeContratante"
                        value={formData.nomeContratante}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpfCnpjContratante">CPF / CNPJ</Label>
                      <Input 
                        id="cpfCnpjContratante" 
                        name="cpfCnpjContratante"
                        value={formData.cpfCnpjContratante}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enderecoContratante">Endereço</Label>
                      <Input 
                        id="enderecoContratante" 
                        name="enderecoContratante"
                        value={formData.enderecoContratante}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Contratado</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="nomeContratado">Nome / Razão Social</Label>
                      <Input 
                        id="nomeContratado" 
                        name="nomeContratado"
                        value={formData.nomeContratado}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpfCnpjContratado">CPF / CNPJ</Label>
                      <Input 
                        id="cpfCnpjContratado" 
                        name="cpfCnpjContratado"
                        value={formData.cpfCnpjContratado}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enderecoContratado">Endereço</Label>
                      <Input 
                        id="enderecoContratado" 
                        name="enderecoContratado"
                        value={formData.enderecoContratado}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Detalhes do Contrato */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Detalhes do contrato</h2>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="objeto">Objeto do Contrato</Label>
                    <Textarea 
                      id="objeto" 
                      name="objeto"
                      value={formData.objeto}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Descreva o serviço, produto ou objetivo do contrato"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="valor">Valor do Contrato</Label>
                    <Input 
                      id="valor" 
                      name="valor"
                      value={formData.valor}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Ex: R$ 1.000,00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prazo">Prazo de Vigência</Label>
                    <Input 
                      id="prazo" 
                      name="prazo"
                      value={formData.prazo}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Ex: 12 meses, até 31/12/2025"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                    <Select 
                      value={formData.formaPagamento}
                      onValueChange={(value) => handleSelectChange("formaPagamento", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a-vista">À vista</SelectItem>
                        <SelectItem value="parcelado">Parcelado</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="detalhesAdicionais">Detalhes Adicionais (opcional)</Label>
                    <Textarea 
                      id="detalhesAdicionais" 
                      name="detalhesAdicionais"
                      value={formData.detalhesAdicionais}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Cláusulas específicas ou condições especiais"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Revisão */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Revisão das Informações</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium">Tipo de Contrato</h3>
                    <p className="mt-1 text-gray-700">
                      {formData.tipoContrato === "prestacao-servicos" && "Prestação de Serviços"}
                      {formData.tipoContrato === "compra-venda" && "Compra e Venda"}
                      {formData.tipoContrato === "locacao" && "Locação de Imóvel"}
                      {formData.tipoContrato === "confidencialidade" && "Termo de Confidencialidade"}
                      {formData.tipoContrato === "trabalho" && "Contrato de Trabalho"}
                      {formData.tipoContrato === "sociedade" && "Sociedade Limitada"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium">Contratante</h3>
                      <p className="mt-1 text-gray-700">{formData.nomeContratante}</p>
                      <p className="text-gray-700">{formData.cpfCnpjContratante}</p>
                      <p className="text-gray-700">{formData.enderecoContratante}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Contratado</h3>
                      <p className="mt-1 text-gray-700">{formData.nomeContratado}</p>
                      <p className="text-gray-700">{formData.cpfCnpjContratado}</p>
                      <p className="text-gray-700">{formData.enderecoContratado}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Objeto do Contrato</h3>
                    <p className="mt-1 text-gray-700">{formData.objeto}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium">Valor</h3>
                      <p className="mt-1 text-gray-700">{formData.valor}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Prazo</h3>
                      <p className="mt-1 text-gray-700">{formData.prazo}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Forma de Pagamento</h3>
                      <p className="mt-1 text-gray-700">
                        {formData.formaPagamento === "a-vista" && "À vista"}
                        {formData.formaPagamento === "parcelado" && "Parcelado"}
                        {formData.formaPagamento === "mensal" && "Mensal"}
                        {formData.formaPagamento === "outro" && "Outro"}
                      </p>
                    </div>
                  </div>
                  
                  {formData.detalhesAdicionais && (
                    <div>
                      <h3 className="font-medium">Detalhes Adicionais</h3>
                      <p className="mt-1 text-gray-700">{formData.detalhesAdicionais}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">
                    Revise as informações acima. Ao gerar o contrato, nossa IA utilizará estas 
                    informações para criar um documento juridicamente válido.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isGenerating}
                >
                  Voltar
                </Button>
              )}
              {step === 1 && <div></div>}
              
              <Button 
                type="button"
                onClick={handleNext}
                disabled={isGenerating}
                className="ml-auto"
              >
                {isGenerating ? 
                  "Gerando..." : 
                  step < 4 ? "Continuar" : "Gerar Contrato"}
              </Button>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CriarContrato;
