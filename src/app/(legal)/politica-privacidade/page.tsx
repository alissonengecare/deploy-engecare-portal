
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Portal Engecare',
  description: 'Detalhes sobre como a Engecare trata seus dados no Portal do Cliente.',
};

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Política de Privacidade
        </Typography>
        <Typography variant="body1" paragraph>
          Bem-vindo à Política de Privacidade do Portal do Cliente Engecare. Sua privacidade é importante para nós.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          1. Coleta de Informações
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Descrever quais informações são coletadas, como dados de login, informações do projeto, arquivos carregados, etc.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          2. Uso das Informações
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Explicar como as informações coletadas são usadas para operar o portal, fornecer atualizações, melhorar o serviço, etc.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          3. Compartilhamento de Informações
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Detalhar se e com quem as informações são compartilhadas (ex: equipe interna, subcontratados essenciais), e sob quais condições.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          4. Segurança dos Dados
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Descrever as medidas de segurança implementadas para proteger os dados dos usuários (ex: criptografia, controle de acesso, etc.).]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          5. Seus Direitos
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Informar sobre os direitos dos usuários em relação aos seus dados (acesso, correção, exclusão) e como exercê-los.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          6. Contato
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Fornecer informações de contato para dúvidas sobre a política de privacidade.]
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 4, color: 'text.secondary' }}>
          Última atualização: [Data da Última Atualização]
        </Typography>
      </Paper>
    </Container>
  );
}

