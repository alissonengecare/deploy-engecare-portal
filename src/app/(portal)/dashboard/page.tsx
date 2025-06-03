"use client";

import React from 'react';
import { Box, Typography, Paper, Card, CardContent, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { PhaseProgressChartWrapper } from '@/components/dashboard/PhaseProgressChartWrapper';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard do Projeto
      </Typography>

      <Grid container spacing={3}>
        {/* Cards de resumo */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Progresso Geral
            </Typography>
            <Typography component="p" variant="h4">
              42%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={42} sx={{ height: 8, borderRadius: 5 }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Fase Atual
            </Typography>
            <Typography component="p" variant="h4">
              3
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Construção
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Investimento Realizado
            </Typography>
            <Typography component="p" variant="h4">
              R$ 1.850.000,00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              De R$ 4.500.000,00 previstos
            </Typography>
          </Paper>
        </Grid>

        {/* Gráfico de progresso por fase */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Progresso por Fase
            </Typography>
            <Box sx={{ height: 350, width: '100%' }}>
              <PhaseProgressChartWrapper />
            </Box>
          </Paper>
        </Grid>

        {/* Próximos marcos */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Próximos Marcos
            </Typography>
            <Box sx={{ overflow: 'auto', flex: 1 }}>
              <Box sx={{ p: 1, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2">15/06/2025</Typography>
                <Typography variant="body2">Conclusão da estrutura principal</Typography>
              </Box>
              <Box sx={{ p: 1, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2">30/06/2025</Typography>
                <Typography variant="body2">Início das instalações hidráulicas especiais</Typography>
              </Box>
              <Box sx={{ p: 1, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2">10/07/2025</Typography>
                <Typography variant="body2">Vistoria intermediária da Vigilância Sanitária</Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2">25/07/2025</Typography>
                <Typography variant="body2">Finalização do reboco externo</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Atividades recentes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Atividade Recente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">Concretagem do 3º andar</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      28/05/2025
                    </Typography>
                    <Typography variant="body2">
                      Finalizada a concretagem do 3º andar com 100% de aproveitamento do material.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Por: Eng. Carlos Silva
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">Instalação elétrica - Fase 1</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      25/05/2025
                    </Typography>
                    <Typography variant="body2">
                      Concluída a primeira fase da instalação elétrica nos andares 1 e 2.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Por: Téc. Roberto Almeida
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">Aprovação da planta hidráulica</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      20/05/2025
                    </Typography>
                    <Typography variant="body2">
                      Planta hidráulica aprovada pela Vigilância Sanitária sem ressalvas.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Por: Arq. Mariana Costa
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
