"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { PhaseProgressChartWrapper } from '@/components/dashboard/PhaseProgressChartWrapper';

interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  user: string;
  type: string;
}

interface DashboardData {
  overallProgress: number;
  currentPhase: number;
  investment: number;
  daysRemaining: number;
  phaseProgress: {
    phase: number;
    name: string;
    progress: number;
  }[];
  recentActivities: Activity[];
}

export default function ProgressoObraPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard');
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const dashboardData = await response.json();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        setError('Não foi possível carregar os dados do progresso da obra. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Progresso da Obra
        </Typography>
        <Box sx={{ width: '100%', mt: 4 }}>
          <LinearProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Progresso da Obra
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#fff4f4', color: '#d32f2f', mt: 2 }}>
          <Typography>{error}</Typography>
        </Paper>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Progresso da Obra
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#f5f5f5', mt: 2 }}>
          <Typography>Nenhum dado disponível.</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <BuildIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Progresso da Obra
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Progresso por Fase
            </Typography>
            <Box sx={{ height: 400 }}>
              <PhaseProgressChartWrapper />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumo do Progresso
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Progresso Geral
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={data.overallProgress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {`${Math.round(data.overallProgress)}%`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Fase Atual: {data.currentPhase}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Dias Restantes: {data.daysRemaining}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Atividade Recente
            </Typography>
            <Grid container spacing={2}>
              {data.recentActivities && data.recentActivities.length > 0 ? (
                data.recentActivities.map((activity) => (
                  <Grid item xs={12} sm={6} md={4} key={activity.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" component="div">
                          {activity.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {new Date(activity.date).toLocaleDateString('pt-BR')}
                        </Typography>
                        <Typography variant="body2">
                          {activity.description}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          Por: {activity.user}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary">
                    Nenhuma atividade recente registrada.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
