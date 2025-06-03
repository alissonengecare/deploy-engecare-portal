'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Tooltip } from '@mui/material';
import { format, parseISO, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Milestone } from '@/types';

interface GanttChartProps {
  milestones: Milestone[];
  startDate?: string;
  endDate?: string;
  currentPhase?: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`gantt-tabpanel-${index}`}
      aria-labelledby={`gantt-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 2, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Cores para as fases do projeto
const phaseColors = [
  '#023d54', // Fase 1 - Azul escuro (cor primária)
  '#035e83', // Fase 2 - Azul médio
  '#0288d1', // Fase 3 - Azul claro
  '#4fc3f7', // Fase 4 - Azul muito claro
  '#00BF9A', // Fase 5 - Verde (cor secundária)
  '#4caf50', // Fase 6 - Verde médio
  '#8bc34a'  // Fase 7 - Verde claro
];

const GanttChart: React.FC<GanttChartProps> = ({ milestones, startDate, endDate, currentPhase = 0 }) => {
  const [value, setValue] = useState(0);
  const [chartStartDate, setChartStartDate] = useState<Date>(new Date());
  const [chartEndDate, setChartEndDate] = useState<Date>(addDays(new Date(), 90));
  const [sortedMilestones, setSortedMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    // Definir datas de início e fim do gráfico
    if (startDate) {
      setChartStartDate(parseISO(startDate));
    } else if (milestones.length > 0) {
      // Usar a data do primeiro marco como início, ou data atual se não houver marcos
      const dates = milestones.map(m => parseISO(m.date));
      const earliestDate = new Date(Math.min(...dates.map(d => d.getTime())));
      setChartStartDate(earliestDate);
    }

    if (endDate) {
      setChartEndDate(parseISO(endDate));
    } else if (milestones.length > 0) {
      // Usar a data do último marco como fim, ou data atual + 90 dias se não houver marcos
      const dates = milestones.map(m => parseISO(m.date));
      const latestDate = new Date(Math.max(...dates.map(d => d.getTime())));
      // Adicionar 30 dias ao último marco para melhor visualização
      setChartEndDate(addDays(latestDate, 30));
    }

    // Ordenar marcos por data
    const sorted = [...milestones].sort((a, b) => 
      parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );
    setSortedMilestones(sorted);
  }, [milestones, startDate, endDate]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Calcular a duração total em dias
  const totalDays = Math.ceil((chartEndDate.getTime() - chartStartDate.getTime()) / (1000 * 60 * 60 * 24));

  // Gerar meses para o cabeçalho
  const months: Date[] = [];
  let currentDate = new Date(chartStartDate);
  while (currentDate <= chartEndDate) {
    months.push(new Date(currentDate));
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  // Calcular posição relativa de um marco no gráfico
  const calculatePosition = (date: string) => {
    const milestoneDate = parseISO(date);
    const daysDiff = Math.ceil((milestoneDate.getTime() - chartStartDate.getTime()) / (1000 * 60 * 60 * 24));
    return (daysDiff / totalDays) * 100;
  };

  // Determinar a cor do marco com base na fase
  const getMilestoneColor = (index: number) => {
    // Usar a fase atual para determinar a cor, ou usar um índice baseado na posição do marco
    const phase = currentPhase > 0 ? currentPhase : Math.floor(index / 2) + 1;
    return phaseColors[(phase - 1) % phaseColors.length];
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="gantt chart views">
          <Tab label="Cronograma" id="gantt-tab-0" aria-controls="gantt-tabpanel-0" />
          <Tab label="Lista de Marcos" id="gantt-tab-1" aria-controls="gantt-tabpanel-1" />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Box sx={{ width: '100%', height: '100%', overflowX: 'auto', overflowY: 'auto' }}>
          {/* Cabeçalho com meses */}
          <Box sx={{ display: 'flex', borderBottom: '1px solid #ddd', pb: 1, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
            {months.map((month, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flexGrow: 1, 
                  textAlign: 'center',
                  fontWeight: 'bold',
                  borderRight: index < months.length - 1 ? '1px dashed #ddd' : 'none',
                  minWidth: '100px'
                }}
              >
                {format(month, 'MMM yyyy', { locale: ptBR })}
              </Box>
            ))}
          </Box>
          
          {/* Área do gráfico */}
          <Box sx={{ position: 'relative', mt: 2, height: 'calc(100% - 50px)' }}>
            {/* Linha do tempo */}
            <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', bgcolor: '#ddd', zIndex: 0 }} />
            
            {/* Hoje */}
            <Box 
              sx={{ 
                position: 'absolute',
                left: `${calculatePosition(new Date().toISOString())}%`,
                top: 0,
                bottom: 0,
                width: '2px',
                bgcolor: 'error.main',
                zIndex: 1
              }}
            >
              <Tooltip title="Hoje" placement="top">
                <Box sx={{ 
                  position: 'absolute', 
                  top: -10, 
                  left: -4, 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  bgcolor: 'error.main' 
                }} />
              </Tooltip>
            </Box>
            
            {/* Marcos */}
            {sortedMilestones.map((milestone, index) => (
              <Box 
                key={milestone.id}
                sx={{ 
                  position: 'absolute',
                  left: `${calculatePosition(milestone.date)}%`,
                  top: index % 2 === 0 ? '30%' : '60%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }}
              >
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: getMilestoneColor(index),
                    border: '2px solid white',
                    boxShadow: '0 0 0 1px #023d54',
                    mb: 1
                  }} 
                />
                <Box 
                  sx={{ 
                    p: 1, 
                    bgcolor: 'background.paper', 
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    boxShadow: 1,
                    maxWidth: 150,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <Typography variant="caption" display="block" fontWeight="bold">
                    {format(parseISO(milestone.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </Typography>
                  <Typography variant="body2" noWrap title={milestone.description}>
                    {milestone.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          {sortedMilestones.length > 0 ? (
            <Box component="ul" sx={{ pl: 2 }}>
              {sortedMilestones.map((milestone, index) => (
                <Box component="li" key={milestone.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        bgcolor: getMilestoneColor(index)
                      }} 
                    />
                    <Typography variant="body1" fontWeight="bold">
                      {format(parseISO(milestone.date), 'dd/MM/yyyy', { locale: ptBR })}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ ml: 3 }}>{milestone.description}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
              Nenhum marco cadastrado.
            </Typography>
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default GanttChart;
