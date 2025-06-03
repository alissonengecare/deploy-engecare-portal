'use client';

import React, { Suspense } from 'react';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import GanttChart from '@/components/charts/GanttChart';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Função para buscar dados do cronograma
async function getTimelineData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    // Usando os dados do dashboard por enquanto, já que contém os marcos
    const res = await fetch(`${baseUrl}/api/dashboard`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch timeline data');
    }
    const data = await res.json();
    return {
      milestones: data.nextMilestones || [],
      startDate: data.projectSummary?.startDate,
      estimatedEndDate: data.projectSummary?.estimatedEndDate,
      progress: data.projectSummary?.progress || 0,
      currentPhase: data.projectSummary?.currentPhase || 0
    };
  } catch (error) {
    console.error(error);
    // Retornar estado vazio em caso de erro
    return {
      milestones: [],
      startDate: undefined,
      estimatedEndDate: undefined,
      progress: 0,
      currentPhase: 0
    };
  }
}

// Componente cliente que usa Suspense para dados
export default function TimelinePage() {
  // Usando hook useState para armazenar dados
  const [timelineData, setTimelineData] = React.useState({
    milestones: [],
    startDate: undefined,
    estimatedEndDate: undefined,
    progress: 0,
    currentPhase: 0
  });

  // Efeito para buscar dados ao montar o componente
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getTimelineData();
      setTimelineData(data);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Cronograma do Projeto
        </Typography>
        <Button 
          component={Link} 
          href="/dashboard" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="primary"
        >
          Voltar ao Dashboard
        </Button>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, flex: '1 1 200px' }}>
          <Typography variant="body2" color="text.secondary">Progresso Geral</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00BF9A' }}>
            {timelineData.progress}%
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, flex: '1 1 200px' }}>
          <Typography variant="body2" color="text.secondary">Fase Atual</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {timelineData.currentPhase}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, flex: '1 1 200px' }}>
          <Typography variant="body2" color="text.secondary">Total de Marcos</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {timelineData.milestones.length}
          </Typography>
        </Paper>
      </Box>

      <Paper sx={{ p: 3, height: '65vh', borderRadius: 2, boxShadow: 3 }}>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        }>
          {timelineData.milestones.length > 0 ? (
            <GanttChart 
              milestones={timelineData.milestones} 
              startDate={timelineData.startDate} 
              endDate={timelineData.estimatedEndDate} 
              currentPhase={timelineData.currentPhase}
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Nenhum marco de projeto cadastrado.
              </Typography>
            </Box>
          )}
        </Suspense>
      </Paper>
    </Box>
  );
}
