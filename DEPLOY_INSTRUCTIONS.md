# Instruções para Deploy na Vercel

## Pré-requisitos

- Conta na Vercel (gratuita): https://vercel.com/signup
- Conta em um serviço Git (GitHub, GitLab ou Bitbucket)

## Passos para Deploy

1. Crie um novo repositório no GitHub/GitLab/Bitbucket
2. Faça upload dos arquivos deste ZIP para o repositório
3. Acesse vercel.com e faça login
4. Clique em 'Add New' > 'Project'
5. Conecte sua conta Git e selecione o repositório
6. Na tela de configuração, adicione as seguintes variáveis de ambiente:
   - NEXTAUTH_URL: https://seu-dominio-vercel.vercel.app (será atualizado automaticamente após o deploy)
   - NEXTAUTH_SECRET: zGKipMo+JBHezg/zzvQJpqzwbd0eGDRM4aDqKeOXEAs= (ou gere um novo segredo)
7. Clique em 'Deploy'

Após o deploy, a Vercel fornecerá uma URL para acesso ao Portal Engecare.

## Credenciais de Acesso

- **Cliente:** cliente@engecare.com / senha123
- **Administrador:** admin@engecare.com / admin123

## Personalização do Domínio

Para usar um domínio personalizado:
1. Acesse as configurações do projeto na Vercel
2. Vá para a seção 'Domains'
3. Adicione seu domínio e siga as instruções para configurar os registros DNS
