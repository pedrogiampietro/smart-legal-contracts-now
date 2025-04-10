# API de Contratos Legais Inteligentes

API RESTful para gerenciamento de contratos legais com autenticação, autorização e integração com blockchain.

## Tecnologias

- Node.js
- Express
- TypeScript
- MongoDB/Mongoose
- JWT para autenticação
- bcryptjs para criptografia

## Pré-requisitos

- Node.js v22.12.0 ou superior
- MongoDB instalado e rodando
- pnpm (recomendado) ou npm

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
cd server
pnpm install
```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` baseado no modelo fornecido
   - Defina as variáveis de ambiente conforme necessário

4. Execute o seed para popular o banco de dados com dados iniciais:

```bash
pnpm seed
```

5. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

## Endpoints da API

### Autenticação

- `POST /api/auth/register` - Registrar um novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obter usuário autenticado

### Contratos

- `GET /api/contracts` - Listar todos os contratos do usuário
- `POST /api/contracts` - Criar um novo contrato
- `GET /api/contracts/:id` - Obter um contrato específico
- `PUT /api/contracts/:id` - Atualizar um contrato
- `DELETE /api/contracts/:id` - Excluir um contrato
- `PUT /api/contracts/:id/sign` - Assinar um contrato
- `GET /api/contracts/stats` - Obter estatísticas de contratos

### Templates de Contrato

- `GET /api/templates` - Listar todos os templates públicos
- `GET /api/templates/:id` - Obter um template específico
- `GET /api/templates/metadata` - Obter metadados de templates (categorias, tipos)
- `POST /api/templates` - Criar um novo template (apenas admin)
- `PUT /api/templates/:id` - Atualizar um template (apenas admin)
- `DELETE /api/templates/:id` - Excluir um template (apenas admin)

## Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Compila o TypeScript para JavaScript
- `pnpm start` - Inicia o servidor em produção
- `pnpm seed` - Popula o banco de dados com dados iniciais

## Dados de Seed

Ao executar o seed, os seguintes dados serão criados:

### Usuário Admin

- Email: admin@contratofacil.com
- Senha: admin123

### Templates de Contrato

- Contrato de Prestação de Serviços
- Contrato de Locação Comercial
- Acordo de Confidencialidade (NDA)

## Licença

ISC
