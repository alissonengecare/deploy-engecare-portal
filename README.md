# Portal Engecare

Portal de gestão e acompanhamento de projetos da Engecare, desenvolvido com Next.js, Material UI e TypeScript.

![Engecare Logo](/public/logo.png)

## Visão Geral

O Portal Engecare é uma plataforma completa para gestão e acompanhamento de projetos de engenharia, permitindo visualização de indicadores estratégicos, cronogramas, documentos e comunicação entre equipes.

### Principais Funcionalidades

- **Dashboard Principal**: Visualização de indicadores estratégicos, gráfico de progresso por fase e atividades recentes
- **Cronograma**: Visualização de gráfico de Gantt interativo com marcos e prazos do projeto
- **Gestão de Documentos**: Upload e visualização de documentos estratégicos organizados por categorias
- **Galeria de Fotos**: Registro visual do progresso da obra com organização por data e categoria
- **Relatórios Financeiros**: Acompanhamento de investimentos, orçamentos e projeções financeiras
- **Módulo Administrativo**: Gerenciamento de usuários e permissões (gestor/colaborador)

## Tecnologias Utilizadas

- **Frontend**: Next.js 15, React, TypeScript, Material UI
- **Backend**: API Routes do Next.js
- **Autenticação**: NextAuth.js
- **Estilização**: Material UI, Emotion
- **Gráficos**: Chart.js, React-Chartjs-2
- **Gerenciamento de Estado**: React Context API

## Requisitos

- Node.js 18.0.0 ou superior
- npm 8.0.0 ou superior

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/sua-organizacao/engecare-portal.git
cd engecare-portal
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Edite o arquivo `.env.local` com suas configurações:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_aqui
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse o portal em [http://localhost:3000](http://localhost:3000)

## Credenciais de Acesso

Para acessar o portal em ambiente de desenvolvimento, utilize:

- **E-mail**: cliente@engecare.com
- **Senha**: senha123

## Estrutura do Projeto

```
engecare-portal/
├── public/             # Arquivos estáticos
├── src/                # Código-fonte
│   ├── app/            # Rotas e páginas (App Router)
│   │   ├── (auth)/     # Rotas de autenticação
│   │   ├── (portal)/   # Rotas protegidas do portal
│   │   ├── api/        # Rotas da API
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos React
│   ├── data/           # Dados mockados e constantes
│   ├── lib/            # Utilitários e configurações
│   ├── types/          # Definições de tipos TypeScript
├── .env.example        # Exemplo de variáveis de ambiente
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
```

## Funcionalidades Detalhadas

### Dashboard Principal

O dashboard apresenta uma visão geral do projeto com:

- Progresso geral do projeto (percentual)
- Fase atual do projeto
- Investimento realizado até o momento
- Dias restantes estimados para conclusão
- Gráfico de progresso por fase com código de cores
- Lista de próximos marcos importantes
- Atividades recentes categorizadas por tipo

### Cronograma

O cronograma oferece uma visualização detalhada do planejamento do projeto:

- Gráfico de Gantt interativo com marcos do projeto
- Visualização alternativa em formato de lista
- Indicador visual da data atual
- Código de cores por fase do projeto
- Integração direta com o dashboard

### Gestão de Documentos

O módulo de documentos permite:

- Upload de arquivos em diferentes formatos
- Organização por categorias (contratos, plantas, relatórios)
- Visualização online de documentos
- Controle de versões

### Módulo Administrativo

O módulo administrativo permite:

- Gerenciamento de usuários
- Definição de permissões (gestor/colaborador)
- Associação de usuários aos projetos

## Build de Produção

Para gerar uma build de produção:

```bash
npm run build
```

Para iniciar o servidor em modo de produção:

```bash
npm start
```

## Suporte

Para suporte técnico, entre em contato com nossa equipe através do e-mail suporte@engecare.com.br

## Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados à Engecare.
