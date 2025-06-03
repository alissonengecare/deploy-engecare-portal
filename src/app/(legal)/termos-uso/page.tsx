
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso - Portal Engecare',
  description: 'Termos e condições para utilização do Portal do Cliente Engecare.',
};

export default function TermsOfUsePage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Termos de Uso
        </Typography>
        <Typography variant="body1" paragraph>
          Bem-vindo aos Termos de Uso do Portal do Cliente Engecare. Ao acessar ou usar este portal, você concorda em cumprir estes termos.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          1. Uso do Portal
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Descrever o propósito do portal e as condições de uso permitidas. Ex: Acesso para acompanhamento de projetos, comunicação, visualização de documentos.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          2. Contas de Usuário
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Explicar a responsabilidade do usuário pela segurança da conta, confidencialidade da senha, etc.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          3. Propriedade Intelectual
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Afirmar que o conteúdo do portal (excluindo dados do cliente) pertence à Engecare ou seus licenciadores.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          4. Limitação de Responsabilidade
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Descrever as limitações de responsabilidade da Engecare em relação ao uso do portal, precisão das informações (sujeitas a atualizações), etc.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          5. Modificações nos Termos
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Reservar o direito de modificar os termos e como os usuários serão notificados.]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          6. Lei Aplicável
        </Typography>
        <Typography variant="body1" paragraph>
          [Texto placeholder: Indicar a legislação que rege os termos.]
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 4, color: 'text.secondary' }}>
          Última atualização: [Data da Última Atualização]
        </Typography>
      </Paper>
    </Container>
  );
}

