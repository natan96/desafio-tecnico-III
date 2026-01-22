# Sistema de Consultas DICOM

Sistema completo para cadastro e gerenciamento de pacientes e exames médicos com modalidades DICOM.

## Pré-requisitos

- Node.js 18+
- npm 9+
- MySQL 8+

## Instalação e Execução

### Backend (API)

1. Entre na pasta do backend:

```bash
cd api-consultas-dicom
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com suas credenciais do banco de dados:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_banco"
PORT=3000
```

4. Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie o servidor:

```bash
npm run start:dev
```

O backend estará rodando em `http://localhost:3000`

### Frontend (Angular)

1. Entre na pasta do frontend:

```bash
cd consultas-dicom
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

O frontend estará rodando em `http://localhost:4200`

## Testes

### Backend (E2E Tests)

O backend possui 14 testes E2E implementados cobrindo todos os cenários de negócio:

```bash
cd api-consultas-dicom
npm run test:e2e
```

**Cenários testados:**

- Cenário 1: Cadastro de paciente com dados válidos
- Cenário 2: Erro ao cadastrar paciente com CPF duplicado
- Cenário 3: Cadastro de exame com idempotencyKey única
- Cenário 4: Retorno 200 ao reenviar exame com mesma idempotencyKey
- Cenário 5: Cadastro de múltiplos exames simultâneos sem duplicação
- Cenário 6: Erro 400 ao criar exame para paciente inexistente
- Cenário 7: Listagem de exames com dados do paciente
- Cenário 8: Retorno de lista vazia quando não há exames
- Cenário 11: Erro 400 para modalidade inválida
- Testes adicionais: CRUD completo, paginação, concorrência

**Resultados:** 14/14 testes passando (100%) em aproximadamente 3.4 segundos

### Frontend (Unit Tests)

O frontend possui 53 testes unitários cobrindo componentes e serviços:

```bash
cd consultas-dicom
npm test -- --watch=false
```

**Cenários testados:**

- Cenário 9: Loading states e spinners durante requisições
- Cenário 10: Tratamento de erros de rede e mensagens para o usuário
- Cenário 12: Validação visual de campos obrigatórios e mensagens de erro
- Testes de serviços: PacienteService e ExameService
- Testes de componentes: PacienteForm e ExameForm
- Validações de formulário, debounce em buscas, paginação

**Resultados:** 53/53 testes passando (100%) em aproximadamente 3.9 segundos

**Distribuição dos testes:**

- PacienteService: 11 testes
- ExameService: 12 testes
- PacienteFormComponent: 13 testes
- ExameFormComponent: 17 testes

## Funcionalidades Implementadas

### Backend

- Endpoints REST para cadastro, listagem e edição de pacientes
- Endpoints REST para cadastro, listagem e edição de exames
- Paginação em todas as listagens
- Idempotência no cadastro de exames (via idempotencyKey)
- Validações de dados e regras de negócio
- Tratamento de erros e concorrência
- Endpoint para listar pacientes com exames no dia consultado
- CORS habilitado

### Frontend

- Página Home com calendário (FullCalendar)
- Lista de pacientes com exames no dia
- Cadastro, listagem e edição de pacientes
- Cadastro, listagem e edição de exames
- Formulários com validação
- Paginação nas listagens
- Mensagens de sucesso/erro (ngx-toastr)
- **Tratamento de erros de rede**: Detecção automática de falhas de conexão (HTTP status 0)
- **Botões "Tentar novamente"**: Em caso de erro de rede, exibe alerta com botão para retentar a operação em:
  - Listagem de pacientes
  - Listagem de exames
  - Calendário da home
  - Carregamento de dados para edição (pacientes e exames)
- Design responsivo com Bootstrap 5
- Sidebar responsivo com offcanvas para mobile
- Integração completa com API

## Estrutura do Projeto

### Backend (NestJS + Prisma + MySQL)

```
api-consultas-dicom/
├── src/
│   ├── pacientes/          # Módulo de pacientes
│   ├── exames/             # Módulo de exames
│   ├── prisma/             # Serviço Prisma
│   └── database/           # DTOs de paginação
└── prisma/
    └── schema.prisma       # Schema do banco de dados
```

### Frontend (Angular 21 Standalone)

```
consultas-dicom/
└── src/app/
    ├── core/               # Estruturas globais
    │   ├── enums/          # Enumerações (Modalidades)
    │   ├── models/         # Modelos de dados
    │   ├── interfaces/     # Interfaces TypeScript
    │   ├── services/       # Serviços HTTP
    │   ├── interceptors/   # Interceptadores HTTP
    │   └── utils/          # Utilitários (configuração de menu)
    ├── pages/              # Páginas da aplicação
    │   ├── home/           # Página inicial com calendário
    │   ├── pacientes/      # Formulário e lista de pacientes
    │   └── exames/         # Formulário e lista de exames
    └── layout/             # Componentes de layout
        ├── header/         # Cabeçalho
        └── sidebar/        # Menu lateral
```

## Tecnologias Utilizadas

### Backend

- NestJS 10
- Prisma ORM
- MySQL
- TypeScript
- class-validator

### Frontend

- Angular 21 (Standalone Components)
- TypeScript
- Bootstrap 5
- Font Awesome 6
- FullCalendar
- ngx-toastr
- RxJS

## Validações Implementadas

### Paciente

- Nome: obrigatório, máx 100 caracteres
- CPF: obrigatório, único, 11 dígitos
- Celular: obrigatório, 11 dígitos
- Data de Nascimento: obrigatória
- Endereço completo: todos campos obrigatórios, exceto complemento
- UF: 2 caracteres maiúsculos

### Exame

- Modalidade: obrigatória, deve ser uma das modalidades DICOM válidas
- Data do Exame: obrigatória
- Paciente ID: obrigatório, deve existir no banco
- Idempotency Key: única, gerada automaticamente (UUID)

## Responsividade

- Desktop: Sidebar fixa lateral
- Tablet/Mobile (≤768px): Sidebar oculta + Menu offcanvas
- Todas as tabelas com scroll horizontal
- Layout otimizado para diferentes tamanhos de tela

## Recursos Adicionais

- **Idempotência**: Exames com a mesma idempotencyKey não são duplicados
- **Feedback Visual**: Loading spinners e mensagens toast
- **Navegação**: Rotas protegidas e navegação intuitiva
- **Performance**: Paginação para otimizar consultas
- **UX**: Validação em tempo real nos formulários

## Licença

Este projeto foi desenvolvido como desafio técnico.
