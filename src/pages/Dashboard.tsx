import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Files,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Activity,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { contracts, IContract, IContractStats } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Componente para o status do contrato
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "expired":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "cancelled":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "draft":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Mapeamento de status para português
  const getStatusLabel = () => {
    switch (status) {
      case "active":
        return "Ativo";
      case "pending":
        return "Pendente";
      case "expired":
        return "Expirado";
      case "cancelled":
        return "Cancelado";
      case "draft":
        return "Rascunho";
      default:
        return status;
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusColor()} border-0`}>
      {getStatusLabel()}
    </Badge>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [userContracts, setUserContracts] = useState<IContract[]>([]);
  const [contractStats, setContractStats] = useState<IContractStats | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Buscar contratos e estatísticas da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Buscar contratos do usuário
        const contractsData = await contracts.getAll();
        setUserContracts(contractsData);

        // Buscar estatísticas
        const statsData = await contracts.getStats();
        setContractStats(statsData);
      } catch (error: any) {
        console.error("Erro ao buscar dados:", error);
        toast({
          title: "Erro ao carregar dados",
          description:
            error.response?.data?.message ||
            "Não foi possível carregar os dados do dashboard.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Função para formatar data
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Função para obter o valor em moeda
  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Renderizar loading
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitore e gerencie seus contratos legais
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/criar-contrato">
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Novo Contrato
                </Button>
              </Link>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
              <TabsTrigger value="contratos">Contratos</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Aba de Visão Geral */}
            <TabsContent value="visao-geral" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Files className="h-5 w-5 text-blue-600" />
                      Contratos
                    </CardTitle>
                    <CardDescription>
                      Total de contratos gerenciados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {contractStats?.total || 0}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {contractStats?.byStatus
                        ?.map(
                          (stat) =>
                            `${stat.count} ${
                              stat._id === "active"
                                ? "ativos"
                                : stat._id === "pending"
                                ? "pendentes"
                                : stat._id === "expired"
                                ? "expirados"
                                : stat._id === "draft"
                                ? "rascunhos"
                                : stat._id
                            }`
                        )
                        .join(", ") || "Nenhum contrato cadastrado"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      Vencimentos
                    </CardTitle>
                    <CardDescription>
                      Contratos com vencimento próximo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {contractStats?.upcomingExpiration || 0}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Próximos 30 dias
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Taxa de Conclusão
                    </CardTitle>
                    <CardDescription>
                      Contratos finalizados com sucesso
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {contractStats?.total && contractStats.total > 0 ? (
                      <>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">
                            {Math.round(
                              ((contractStats.byStatus?.find(
                                (s) => s._id === "active"
                              )?.count || 0) /
                                contractStats.total) *
                                100
                            )}
                            %
                          </div>
                        </div>
                        <Progress
                          value={Math.round(
                            ((contractStats.byStatus?.find(
                              (s) => s._id === "active"
                            )?.count || 0) /
                              contractStats.total) *
                              100
                          )}
                          className="h-2 mt-2"
                        />
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Nenhum contrato disponível
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contratos Recentes</CardTitle>
                  <CardDescription>
                    Últimos contratos adicionados ou modificados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userContracts.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Vencimento</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Partes
                          </TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userContracts.slice(0, 3).map((contrato) => (
                          <TableRow key={contrato._id}>
                            <TableCell className="font-medium">
                              <Link
                                to={`/visualizar-contrato/${contrato._id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {contrato.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={contrato.status} />
                            </TableCell>
                            <TableCell>
                              {formatDate(contrato.endDate)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {contrato.parties
                                .map((party) => party.name)
                                .join(", ")}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(contrato.value)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Files className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <p>Você ainda não possui contratos.</p>
                      <Link to="/criar-contrato" className="mt-2 inline-block">
                        <Button variant="outline" size="sm" className="mt-2">
                          Criar meu primeiro contrato
                        </Button>
                      </Link>
                    </div>
                  )}
                  {userContracts.length > 0 && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("contratos")}
                      >
                        Ver todos os contratos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Alertas
                    </CardTitle>
                    <CardDescription>
                      Ações importantes pendentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userContracts.filter(
                      (c) =>
                        c.status === "pending" ||
                        (c.status === "active" &&
                          c.endDate &&
                          new Date(c.endDate) <
                            new Date(
                              new Date().setDate(new Date().getDate() + 30)
                            ))
                    ).length > 0 ? (
                      <div className="space-y-4">
                        {userContracts
                          .filter((c) => c.status === "pending")
                          .slice(0, 2)
                          .map((contract) => (
                            <div
                              key={contract._id}
                              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
                            >
                              <p className="text-sm font-medium text-yellow-800">
                                {contract.title}
                              </p>
                              <p className="text-sm text-yellow-700 mt-1">
                                Aguardando assinatura{" "}
                                {contract.parties.filter((p) => !p.signed)
                                  .length > 0
                                  ? `de ${contract.parties
                                      .filter((p) => !p.signed)
                                      .map((p) => p.name)
                                      .join(", ")}`
                                  : ""}
                              </p>
                            </div>
                          ))}
                        {userContracts
                          .filter(
                            (c) =>
                              c.status === "active" &&
                              c.endDate &&
                              new Date(c.endDate) <
                                new Date(
                                  new Date().setDate(new Date().getDate() + 30)
                                )
                          )
                          .slice(0, 2)
                          .map((contract) => (
                            <div
                              key={contract._id}
                              className="bg-red-50 border-l-4 border-red-400 p-4 rounded"
                            >
                              <p className="text-sm font-medium text-red-800">
                                {contract.title}
                              </p>
                              <p className="text-sm text-red-700 mt-1">
                                Vence em{" "}
                                {Math.ceil(
                                  (new Date(contract.endDate!).getTime() -
                                    new Date().getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                dias
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p>Nenhum alerta pendente</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      Atividade Recente
                    </CardTitle>
                    <CardDescription>Últimas ações realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userContracts.length > 0 ? (
                      <div className="space-y-4">
                        {userContracts.slice(0, 3).map((contract, index) => {
                          const activityType =
                            index === 0
                              ? "create"
                              : index === 1
                              ? "sign"
                              : "update";
                          return (
                            <div key={contract._id} className="flex">
                              <div className="flex-shrink-0 mr-3">
                                <div
                                  className={`h-8 w-8 rounded-full ${
                                    activityType === "create"
                                      ? "bg-blue-100"
                                      : activityType === "sign"
                                      ? "bg-green-100"
                                      : "bg-purple-100"
                                  } flex items-center justify-center`}
                                >
                                  {activityType === "create" ? (
                                    <FileText className="h-4 w-4 text-blue-600" />
                                  ) : activityType === "sign" ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Files className="h-4 w-4 text-purple-600" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {activityType === "create"
                                    ? `${contract.title} criado`
                                    : activityType === "sign"
                                    ? `${contract.title} assinado`
                                    : `${contract.title} atualizado`}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(contract.createdAt)}{" "}
                                  {activityType === "update"
                                    ? "(atualizado)"
                                    : ""}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p>Nenhuma atividade recente</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba de Contratos */}
            <TabsContent value="contratos" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">
                        Todos os Contratos
                      </CardTitle>
                      <CardDescription>
                        Gerencie todos os seus contratos
                      </CardDescription>
                    </div>
                    <Link to="/criar-contrato">
                      <Button size="sm" className="flex items-center gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Novo
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {userContracts.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Vencimento</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Partes
                            </TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userContracts.map((contrato) => (
                            <TableRow key={contrato._id}>
                              <TableCell className="font-medium">
                                <Link
                                  to={`/visualizar-contrato/${contrato._id}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {contrato.title}
                                </Link>
                              </TableCell>
                              <TableCell>{contrato.type}</TableCell>
                              <TableCell>
                                <StatusBadge status={contrato.status} />
                              </TableCell>
                              <TableCell>
                                {formatDate(contrato.endDate)}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {contrato.parties
                                  .map((party) => party.name)
                                  .join(", ")}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(contrato.value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Files className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <p>Você ainda não possui contratos.</p>
                      <Link to="/criar-contrato" className="mt-2 inline-block">
                        <Button variant="outline" size="sm" className="mt-2">
                          Criar meu primeiro contrato
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Distribuição de Contratos
                  </CardTitle>
                  <CardDescription>
                    Análise do portfólio de contratos por status e tipo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userContracts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-sm font-medium mb-4">
                            Por Status
                          </h3>
                          <div className="space-y-4">
                            {contractStats?.byStatus?.map((stat) => {
                              const percentage = Math.round(
                                (stat.count / (contractStats.total || 1)) * 100
                              );
                              return (
                                <div key={stat._id}>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                      {stat._id === "active"
                                        ? "Ativos"
                                        : stat._id === "pending"
                                        ? "Pendentes"
                                        : stat._id === "expired"
                                        ? "Expirados"
                                        : stat._id === "draft"
                                        ? "Rascunhos"
                                        : stat._id === "cancelled"
                                        ? "Cancelados"
                                        : stat._id}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {percentage}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={percentage}
                                    className="h-2"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-4">Por Tipo</h3>
                          <div className="space-y-4">
                            {contractStats?.byType?.map((stat) => {
                              const percentage = Math.round(
                                (stat.count / (contractStats.total || 1)) * 100
                              );
                              return (
                                <div key={stat._id}>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                      {stat._id}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {percentage}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={percentage}
                                    className="h-2"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-8" />

                      <div>
                        <h3 className="text-sm font-medium mb-6">
                          Contratos por Período
                        </h3>
                        <div className="h-[200px] flex items-end gap-2">
                          {userContracts.length > 0 ? (
                            <>
                              <div className="flex-1 flex flex-col items-center">
                                <div
                                  className="w-full bg-blue-600 rounded-t"
                                  style={{
                                    height: `${Math.min(
                                      userContracts.filter((c) => {
                                        const date = new Date(c.createdAt);
                                        const now = new Date();
                                        return (
                                          date >=
                                            new Date(
                                              now.getFullYear(),
                                              now.getMonth() - 3,
                                              1
                                            ) &&
                                          date <
                                            new Date(
                                              now.getFullYear(),
                                              now.getMonth(),
                                              1
                                            )
                                        );
                                      }).length * 20,
                                      180
                                    )}px`,
                                  }}
                                ></div>
                                <p className="text-xs mt-2">Há 3 meses</p>
                                <p className="text-xs text-gray-500">
                                  {
                                    userContracts.filter((c) => {
                                      const date = new Date(c.createdAt);
                                      const now = new Date();
                                      return (
                                        date >=
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth() - 3,
                                            1
                                          ) &&
                                        date <
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth() - 2,
                                            1
                                          )
                                      );
                                    }).length
                                  }{" "}
                                  contratos
                                </p>
                              </div>
                              <div className="flex-1 flex flex-col items-center">
                                <div
                                  className="w-full bg-blue-600 rounded-t"
                                  style={{
                                    height: `${Math.min(
                                      userContracts.filter((c) => {
                                        const date = new Date(c.createdAt);
                                        const now = new Date();
                                        return (
                                          date >=
                                            new Date(
                                              now.getFullYear(),
                                              now.getMonth() - 2,
                                              1
                                            ) &&
                                          date <
                                            new Date(
                                              now.getFullYear(),
                                              now.getMonth() - 1,
                                              1
                                            )
                                        );
                                      }).length * 20,
                                      180
                                    )}px`,
                                  }}
                                ></div>
                                <p className="text-xs mt-2">Há 2 meses</p>
                                <p className="text-xs text-gray-500">
                                  {
                                    userContracts.filter((c) => {
                                      const date = new Date(c.createdAt);
                                      const now = new Date();
                                      return (
                                        date >=
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth() - 2,
                                            1
                                          ) &&
                                        date <
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth() - 1,
                                            1
                                          )
                                      );
                                    }).length
                                  }{" "}
                                  contratos
                                </p>
                              </div>
                              <div className="flex-1 flex flex-col items-center">
                                <div
                                  className="w-full bg-blue-600 rounded-t"
                                  style={{
                                    height: `${Math.min(
                                      userContracts.filter((c) => {
                                        const date = new Date(c.createdAt);
                                        const now = new Date();
                                        return (
                                          date >=
                                            new Date(
                                              now.getFullYear(),
                                              now.getMonth() - 1,
                                              1
                                            ) &&
                                          date <
                                            new Date(
                                              now.getFullYear(),
                                              now.getMonth(),
                                              1
                                            )
                                        );
                                      }).length * 20,
                                      180
                                    )}px`,
                                  }}
                                ></div>
                                <p className="text-xs mt-2">Mês passado</p>
                                <p className="text-xs text-gray-500">
                                  {
                                    userContracts.filter((c) => {
                                      const date = new Date(c.createdAt);
                                      const now = new Date();
                                      return (
                                        date >=
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth() - 1,
                                            1
                                          ) &&
                                        date <
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth(),
                                            1
                                          )
                                      );
                                    }).length
                                  }{" "}
                                  contratos
                                </p>
                              </div>
                              <div className="flex-1 flex flex-col items-center">
                                <div
                                  className="w-full bg-blue-600 rounded-t"
                                  style={{
                                    height: `${Math.min(
                                      userContracts.filter((c) => {
                                        const date = new Date(c.createdAt);
                                        const now = new Date();
                                        return (
                                          date >=
                                          new Date(
                                            now.getFullYear(),
                                            now.getMonth(),
                                            1
                                          )
                                        );
                                      }).length * 20,
                                      180
                                    )}px`,
                                  }}
                                ></div>
                                <p className="text-xs mt-2">Este mês</p>
                                <p className="text-xs text-gray-500">
                                  {
                                    userContracts.filter((c) => {
                                      const date = new Date(c.createdAt);
                                      const now = new Date();
                                      return (
                                        date >=
                                        new Date(
                                          now.getFullYear(),
                                          now.getMonth(),
                                          1
                                        )
                                      );
                                    }).length
                                  }{" "}
                                  contratos
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-4 text-gray-500 w-full">
                              <p>Sem dados suficientes para exibir o gráfico</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <p>Sem dados suficientes para análise</p>
                      <p className="text-sm mt-2">
                        Crie contratos para ver estatísticas
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
